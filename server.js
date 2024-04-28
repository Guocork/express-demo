// 原生使用node的http模块进行启动服务器 
// const http = require('http');


// const server = http.createServer((req,res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/html');
//     res.end("hello world");
// });

// server.listen(3000, () => {
//     console.log("the server is started........");
// });


// express 启动服务器
const express = require('express');

const app = express();

// ------- 字符串路由路径 ----------
// app.get("/",(req, res) => {
//     res.send("hello world!");
// });

// app.all('/about',(req, res) => {  // 支持所有的请求方式 get post delete
//     res.send({
//         name:"cork",
//         age: 20
//     });
// });

// ------- 字符模式路由路径 ----------
// app.get('/ab?cd', (req, res) => { // b可有可无
//     res.send("ad?cd");        
// });

// app.get('/qw+er',(req, res) => { // 至少需要有一个w 可以有多个w
//     res.send("qw+er");
// });

// app.get('/as*df',(req, res) => { // 在asdf 的s 之后可以匹配到任意的字符 通配符
//     res.send("as*df");
// });

// // ------- 正则路由路径 ----------
// app.get(/a/,(req, res) => { // 只要请求带a 都能匹配到 
//     res.send('/a/');
// });

// app.get(/.*fly$/, (req, res) => { // 匹配任何以fly 结尾的路径
//     res.send("/.*fly$/");
// });

//-------- 路由拆分 ---------
// const user = express.Router();

// user.get("/list",(req,res,next) => {
//     res.send('/list');
// });

// user.get("/detail",(req,res,next) => {
//     res.send('/detail');
// });


// app.use('/user',user);  // 注册user路由

// ----------- 中间件 ------------
// function middleware(req,res,next) {
//     console.log("这是一个全局中间件");  
//     next();  // 通过next 去调用下一个中间件 
// }

// function logger(req,res,next) {
//     const time = new Date();
//     console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
//     next();
// }

// app.use(middleware).use(logger);  // 注册中间件 注册全局中间件 所有的路由都会经过这里 

// app.get('/user',(req, res, next) => {
//     console.log('这是一个路由中间件');
//     next(); // 这里加next 确保请求向下执行 否则会卡在这里
// },(req,res) => {
//     res.send('user')
// });

// app.get('/about',(req,res) => {
//     res.send('about');
// });

// ------------- 模板引擎 ------------
app.use(express.static('public')); // 静态资源中间件
// 指定模板存放目录
app.set('/views','views');

// 指定模板引擎 为Handlebars
app.set('view engine','hbs');

app.get('/',(req, res) => {
    res.render('index');
});

app.get('/about',(req, res) => {
    throw new Error();
    res.render('about',{
        name:"cork",
        age: 18
    });
});

app.use('*',(req, res) => {  // 放到所有路由后面 依次按照顺序匹配
    res.status(404).render('404',{ url: req.originalUrl });
});

app.use((err, req, res, next) => { // 需要放到后面
    res.status(500).render('500');
});

app.listen(3000,() => {
    console.log("the server is started.....");
});
