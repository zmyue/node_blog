/**
 * Created by MingYue.Zhang on 2018/3/27.
 */
var express = require('express');
var swig = require('swig');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');


//设置静态文件托管
//当用户访问以/public开始，那么直接返回对应__dirname+'/public'下的文件
app.use('/public',express.static(__dirname+'/public'));

app.use('/',require('./routers/main'));
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));

app.use(bodyparser.urlencoded({extended:true}));


//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views','./views');
//注册所使用的模板，第一个参数必须是views engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine','html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});

app.get('/main.css',function (req,res,next) {
    res.setHeader('content-type','text/css')
    res.send('body {background:red}');
})

// app.get('/',function (req,res,next) {
//     res.render('index')
// })

mongoose.connect('mongodb://localhost:27018/blog',{useMongoClient: true},function (err) {
    if(err){
        console.log('数据库连接失败')
    }else{
        console.log('数据库连接成功');
        app.listen(8080);
    }
});
//app.listen(8081);
