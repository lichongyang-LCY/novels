/**
 * Created by 雨果 on 2017/8/14. QQ:182808000
 */
const fs=require('fs');
const zlib = require('zlib');
let cheerio = require('cheerio');
let http=require('./httpHelper');
const rootUrl='http://www.kushubao.com/';
let novelList;

module.exports={
    async init(){
        this.readList();
        for(var i=0;i<83203;i++){
            try{
                await this.getNovel(`${rootUrl}${i}/`);
            }catch(e){
                continue;
            }
        }
        this.init();
    },
    async readList(){ //读取配置文件，如果不存在则自动创建
        if(!fs.existsSync('./novels')){
            fs.mkdirSync(`./novels`);
        }
        if(fs.existsSync('./novels/list.json')){
            novelList=JSON.parse(fs.readFileSync('./novels/list.json'));
        }else{
            novelList={
                novels:[]
            }
            await this.saveList();
        }
    },
    async saveList(){
        fs.writeFileSync('./novels/list.json',JSON.stringify(novelList));
    },
    async getNovel(url){ //获取单个小说的信息，包括章节
        const source=await http.getLocal(url,"gbk");
        if(source.indexOf('<title>出现错误！</title>')>=0){
            return;
        }
        const $ = cheerio.load(source,{decodeEntities: false});
        let novel=novelList.novels.find((value,index,arr)=>{return value.sourceUrl===url});
        if(!novel){
            novel={};
            novel.index=novelList.novels.length;
            novelList.novels.push(novel);

        }
        novel.name=$('.entry-single').text();
        novel.sourceUrl=url;
        novel.author=$('title').text().split('-')[3].trim();
        let sectionsSource=$('#xslist li');
        if(sectionsSource.length<300){ //300章以内的垃圾书籍不收录
            return;
        }
        novel.lastSectionName=$(sectionsSource[sectionsSource.length-1]).find('a').text();

        //开始处理章节列表
        let sections=[];
        sectionsSource.each(function () {
            let section={};
            section.url=$(this).find('a').attr('href');
            section.name=$(this).find('a').text();
            sections.push(section);
        });
        //检测章节文件夹是否存在
        if(!fs.existsSync(`./novels/${novel.index}`)){
            fs.mkdirSync(`./novels/${novel.index}`);
        }
        //写入列表文件
        if(novel.name!=null && novel.author!=null&&novel.name!=''&&novel.author!=''){
            fs.writeFileSync(`./novels/${novel.index}/list.json`,JSON.stringify(sections));
            console.log(`获取小说《${novel.name}》`);
            //写入章节
            for(var i=0;i<sections.length;i++){
                try{
                    await this.getSection(url+'/'+sections[i].url,`./novels/${novel.index}/${sections[i].url}.txt`);
                    console.log(`获取小说《${novel.name}》 ID《${novel.index}》  章节《${sections[i].name}》`);
                }catch(e){
                    continue;
                }
            }
            this.saveList();
        }
    },
    async getSection(url,path){ //获取小说章节并存储
        if(!fs.existsSync(path)){
            const source=await http.getLocal(url,"gbk");
            const $ = cheerio.load(source,{decodeEntities: false});
            const content=$('#booktext').html().replace(/[ \r\n]/g,'').replace(/(<div.*?>.*?<\/div>)|<a.*?>|<\/a>|(<font.*?>.*?<\/font>)|<\/center><\/div>|－－－－－－－－－－－－－/ig, '');
            zlib.deflate(content, (err, buffer) => { //小说章节内容压缩保存
                if (!err) {
                    fs.writeFileSync(path,buffer.toString('base64'));
                } else {
                }
            });
        }
    }
}
