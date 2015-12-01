var mysql = require("mysql");
var connection = mysql.createConnection({
	host : "192.168.1.252",
	port : 3306,
	database : "test" ,
	user : "vg" ,
	password : "ac.123456"
});

var operate = {
	getConnect : function(){
		connection.getConnection(function(err,connect){
			if(err){
				console.log("连接数据库异常："+err);
				return null;
			}
			console.log("数据库成功连接..."+connect);
			return connect;
		});
	},
	getAll : function(){
		/*var conn = operate.getConnect();
				console.log("==================="+this)
		if(conn){
			conn.query("select * from movie","",function(err,result){
				if(err){
					return {
						"err" : err
					}
				}else{
					return result;
				}
			});
		}*/
		var data = null;
		connection.connect(function(err){
			if(err){
				console.log("err"+err)
				return {
					"dddddddddddddddddddderr" : err
				}
			}else{
				connection.query("select * from movie","",function(err,result){
					console.log("==========1======");
					if(err){
						console.log("err"+err)
						return {
							"err" : err
						}
					}else{
						data= result;
						console.log("==========2======");
						return data;
					}
				});
			}
		});
		console.log("==========3======");
		
		/*connection.getConnection(function(err,connect){
			if(err){
				console.log("连接数据库异常："+err);
				return null;
			}
			console.log("数据库成功连接..."+connect);
			
		});*/
	}
};

module.exports = operate;
