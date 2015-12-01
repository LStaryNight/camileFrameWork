(function($,b,c){
	b.module("app",["ngRoute","layer","ui.bootstrap"]);
	b.module("app").config(["$routeProvider",function(a){
		a.when("/home",{
			templateUrl : "/ll_Framework/page/index.html",
			controller : "appCtrl"
		}).when("/layer",{
			templateUrl : "/ll_Framework/page/layer.html",
			controller : "layerCtrl"
		}).otherwise({
			redirectTo : "/home"
		})
	}]);
	b.module("app").service("appService",["$http","$rootScope",function(a,c){
		var operate = {
			getAllData : function(){
				/*a.jsonp({
					method : "POST",
					url : "http://127.0.0.1:9999?callback=JSON_CALLBACK",
					dataType : "jsonp"
				}).then(function(data){
					console.log("longli"+data);
				}),function(reason){
					console.log(reason);
				}*/
				a.jsonp("http://127.0.0.1:9999?callback=JSON_CALLBACK")
			    .success(function(data, status, header, config){
		            c.list = data;
		        })
			    .error(function(data){
		        });
			}
		};
		c.operate = operate;
	}]);
	b.module("app").controller("appCtrl",["$http","appService","$rootScope","$scope",function(a,c,d,e){
		/*d.operate.getAllData();
		var data = d.list;
		e.data = data;*/
	}]);
})(jQuery,window.angular,window);
