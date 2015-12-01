var mysql = require("mysql");
var http = require("http");
var express = require("express");
var port = process.env.PORT || 9999;

var operate= require("./mysqlOperate.js");

var app = express();
app.listen(port,"127.0.0.1",function(){
	console.log("start listening...");
});
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/",function(req,res){
	/*var result = operate.getAll();
	console.log("++++++++++++++++"+result);*/
	/*res.render("index",{}) 返回页面*/
	/* res.send({status:'json'}); 正常返回值*/  
	var result = {
		"id" : 001,
		"name" : "zhangsan",
		"age" : 15
	};
	var result = "JSON_CALLBACK({id:'001',name:'zhangsan',age:15})"
	res.jsonp(result); //跨域返回值 
});
