(function($,b){
	b.module("layer",["ui.bootstrap","/tips/style1","dd","layerConfirm","layerPromot","layerPage"]);
	b.module("layer").service("layerService",["$rootScope","$modal","$http",function(a,c,f){
		var p={};
		p.analysList = function(items){
			if(typeof items == "String"){
				try{
					items = JSON.parseJSON(items);
				}catch(e){
					console.log("转换传递参数出现异常："+e);
					items=null;
				}
			}
			return items;
		},
		p.getPage = function(items,body){
			var page = '<div class="confirm">';
			if(items["title"]==true){
				page +='<div class="cof_header '+items["color"]+'">{{data.title}}</div>';
			};
			if(items["closeBtn"]==true){
				if(items["style"]=="icon1"){
					page += "<div class='cof_closeBtnPar'><i class='cof_closeBtn' ng-click='cancelClick()' ></i></div>";
				}else if(items["style"]=="icon2"){
					page += "<div class=''><i class='closeBtn' style='top: -36px;right: -2px;' ng-click='cancelClick()' ></i></div>";
				}
			}
			page += '<div class="cof_body">'+body+'</div><div class="cof_foot">';
			if(items["btn"]==true){
				for(var i=0;i<items["btnList"].length;i++){
					if(items["btnList"][i]=="confirmBtn"){
						page += '<a href="javascript:void(0)" class="cof_btn '+items["color"]+'" ng-click="confirmClick()">{{data.btn.confirmBtn.text}}</a>';
					};
					if(items["btnList"][i]=="cancelBtn"){
						page += '<a href="javascript:void(0)" class="cof_btn '+items["color"]+'" ng-click="cancelClick()">{{data.btn.cancelBtn.text}}</a>';
					}
				}
			}
			page += '</div></div>';
			return page;
		},p.getDefaultItems = function(items){
			var list = {
				title : true,
				closeBtn : true,
				btnList : ["confirmBtn","cancelBtn"],
				btn : true ,
				color : "layer_color1" ,
				style : "icon1"
			};
			list = $.extend(true, list, items);
			return list;
		},p.getDefaultData = function(data){
			var value = {
				title : "提示信息",
				content : "确认弹框提示信息",
				btn : {
					confirmBtn : {
						text : "确定",
						callback : function(){
						}
					},
					cancelBtn : {
						text : "取消" ,
						callback : function(){
						}
					}
				}
			};
			value = $.extend(true, value, data);
			return value;
		},p.openConfirm = function(data , items){
			items = p.analysList(items);
			var list =  p.getDefaultItems(items);
			var template= p.getPage(list,'<p>{{data.content}}</p>');
			var value = p.getDefaultData(data);
			var modal = c.open({
				template : template,
				controller : "layerConfirmCtrl",
				resolve : {
					returnValue : function(){
						value.modal = modal;
						return value;
					}
				}
			});
		},p.openPromot = function(data,items){
			items = p.analysList(items);
			var list =  p.getDefaultItems(items);
			var template= p.getPage(list,'<p><input  ng-model="pro_data" type="text" /></p>');
			var value = p.getDefaultData(data);
			var modal = c.open({
				template : template,
				controller : "layerPromotCtrl",
				resolve : {
					returnValue : function(){
						value.modal = modal;
						return value;
					}
				}
			});
		},p.openPage = function(data,items){
			items = p.analysList(items);
			var list =  p.getDefaultItems(items);
			var value = p.getDefaultData(data);
			f({
				method : "GET",
				url : data["content"]
			}).then(function(su){
				var template = p.getPage(list,su.data);
				var modal = c.open({
				template : template,
				controller : "layerPageCtrl",
				resolve : {
					returnValue : function(){
						value.modal = modal;
						return value;
					}
				}
			});
			},function(reason){
				console.log(reason);
			});
		};
		return p;
	}]);
	b.module("layerConfirm",["ui.bootstrap"]).controller("layerConfirmCtrl",["$modalInstance","returnValue","$scope",function(a,c,d){
		d.data = c;
		d.cancelClick = function(){
			c.btn.cancelBtn.callback();
			a.close(c.modal);
		},d.confirmClick = function(){
			c.btn.confirmBtn.callback();
			a.close(c.modal);
		}
	}]);
	b.module("layerPromot",["ui.bootstrap"]).controller("layerPromotCtrl",["$modalInstance","returnValue","$scope","$modal",function(a,c,d,e){
		d.data = c;
		d.cancelClick = function(){
			c.btn.cancelBtn.callback();
			a.close(c.modal);
		},d.confirmClick = function(){
			var data = d.pro_data;
			c.btn.confirmBtn.callback();
			a.close(c.modal);
			d.demo(data);
		},d.demo = function(value){
			e.open({
				templateUrl : "/tips/style1.html",
				controller : "tipStyle1Ctrl",
				size : "sm",
				resolve : {
					returnValue: function(){
						return value;
					}
				}
			});
		}
	}]);
	b.module("layerPage",["ui.bootstrap"]).controller("layerPageCtrl",["$modalInstance","returnValue","$scope","$modal",function(a,c,d,e){
		d.data = c;
		d.cancelClick = function(){
			c.btn.cancelBtn.callback();
			a.close(c.modal);
		},d.confirmClick = function(){
			c.btn.confirmBtn.callback();
			a.close(c.modal);
		}
	}]);
	b.module("layer").controller("layerCtrl",["$scope","$http","$modal","layerService","$compile",function(a,b,c,d,e){
		a.showAlertWindow = function(data,items){
			d.openConfirm(data,items);
		},a.promotWindow = function(data,items){
			d.openPromot(data,items);
		},a.pageWindow = function(data,items){
			d.openPage(data,items);
		},a.getTipOne = function(data,items){
			var className = "tips_style1 ";
			if(items){
				if(typeof items != "object"){
					items = d.analysList(items);
				};
				className+=items["style"] ? items["style"] : "";
			}
			c.open({
				templateUrl : "/tips/style1.html",
				windowClass : className,
				controller : "tipStyle1Ctrl",
				size : "sm",
				keyboard : true,
				backdrop : true,
				resolve : {
					returnValue: function(){
						return data;
					}
				}
			});
		},a.getTipTwo=function(data,items){
			var className = "tips_style1 ";
			if(items){
				if(typeof items != "object"){
					items = d.analysList(items);
				};
				className+=items["style"] ? items["style"] : "";
			}
			var add= e('<tips></tips>')(a); 
			var modal = c.open({
				template :add,
				windowClass : className,
				controller : "tipStyle1Ctrl",
				size : "sm",
				keyboard : true,
				backdrop : true,
				resolve : {
					returnValue: function(){
						return {
							data : data,
							modal : modal
						}
					}
				}
			});
		},a.getTipThree = function(data,items){
			var className = "tips_style1 ";
			if(items){
				if(typeof items != "object"){
					items = d.analysList(items);
				};
				className+=items["style"] ? items["style"] : "";
			}
			c.open({
				templateUrl : "/tips/style3.html",
				windowClass : className,
				controller : "tipStyle1Ctrl",
				size : "sm",
				keyboard : true,
				backdrop : true,
				resolve : {
					returnValue: function(){
						return data;
					}
				}
			});
		}
	}]);
	b.module("/tips/style1",[]).run(["$templateCache","$compile",function(a,b,c){
		a.put("/tips/style1.html","<div class='tips_style1'>{{data}}</div>");
		a.put("/tips/style2.html","<div><i class='closeBtn' ng-click='btnClose()'></i>{{data.data}}</div>");
		a.put("/tips/style3.html","<div class='tips_style1'><i class='trangle'></i>{{data}}</div>");
	}]);
	b.module("/tips/style1").controller("tipStyle1Ctrl",["$scope","returnValue","$modalInstance",function(a,b,c){
		a.data = b;
		a.btnClose= function(modal){
			c.close(1);
		}
	}]);
	
	b.module("dd",["/tips/style1"]).directive("tips",function($compile){
		return {
			templateUrl : "/tips/style2.html",
			link : function(scope,element, attributes){
				$compile(element.contents())(scope);
			}
		}
	});
	b.module("dd").controller(["$modalInstance",function(a){
		
	}])
})(jQuery,window.angular)
