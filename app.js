const express=require('express');
const app = express();
const fs = require('fs');
const http = require('http');
// const https = require('https');
const path = require('path');
const compression = require('compression')
const bodyParser = require('body-parser');
const novelAI=require('./lib/novelAI');
// const privateKey  = fs.readFileSync('./csr/214068310540336.key', 'utf8');
// const certificate = fs.readFileSync('./csr/214068310540336.pem', 'utf8');
// const credentials = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);
const PORT = 80;
// const SSLPORT = 443;


httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
// httpsServer.listen(SSLPORT, function() {
//     console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
// });

app.use(compression());
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", "3.2.1");
    //res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, 'public'))); //设置静态文件目录
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views',path.join(__dirname , 'views') );
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
novelAI.init();
global.novelList=JSON.parse(fs.readFileSync('./novels/list.json'));
//每隔10分钟循环重新读取小说列表
setInterval(()=>{
    global.novelList=JSON.parse(fs.readFileSync('./novels/list.json'));
},600000);


// Welcome
app.get('/', function(req, res) {
    res.render('index',global.novelList);
});
app.use('/novel', require('./router/novel'));


app.use(function(err, req, res, next) {
    res.status(500);
    res.json({code:500,msg: err.message });
});




