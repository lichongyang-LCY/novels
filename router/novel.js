const router = require('express').Router();
const fs = require('fs');
const zlib = require('zlib');
router.get('/:novelid', function(req, res) {
    let novel=global.novelList.novels.find((value,index,arr)=>{return value.index==req.params.novelid});
    if(!novel){
        return res.send('没有这个小说');
    }
    let sections=JSON.parse(fs.readFileSync(`./novels/${novel.index}/list.json`));
    res.render('novel',{novel:novel,sections:sections});
});

router.get('/:novelid/:sectionid', function(req, res) {
    let novel=global.novelList.novels.find((value,index,arr)=>{return value.index==req.params.novelid});
    if(!novel){
        return res.send('没有这个小说');
    }
    let sectionUrl=`./novels/${novel.index}/${req.params.sectionid}.txt`;
    if(!fs.existsSync(sectionUrl)){
        return res.send('没有这个章节');
    }
    let sections=JSON.parse(fs.readFileSync(`./novels/${novel.index}/list.json`));

    let buffer = Buffer.from(fs.readFileSync(sectionUrl), 'base64');
    buffer = Buffer.from(buffer.toString(), 'base64');
    zlib.unzip(buffer, (err, buff) => {
        if (!err) {
            let sectionIndex=sections.findIndex((value,index,arr)=>{return value.url==req.params.sectionid});
            console.log(sectionIndex);
            res.render('section',{novel:novel,preurl:!!sections[sectionIndex-1]?sections[sectionIndex-1].url:null,nexturl:!!sections[sectionIndex+1]?sections[sectionIndex+1].url:null,section:buff.toString()});
        } else {
            return res.send('解码错误:'+JSON.stringify(err));
        }
    });

});

module.exports=router;
