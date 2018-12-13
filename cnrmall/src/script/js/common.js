define(['config'],function(){
	require(['jquery'],function(){ 
		require(['cookie'],function(){ 
			//头部底部 
			$('#header').load('header.html',function(){ 
				//判断登录
				if($.cookie('username')){
					console.log($.cookie('username')); 
					$('.login').html('<a target="_blank" href="cart.html" style="color:#555">'+$.cookie('username')+' </a> 欢迎光临<a href="index.html" title="首页">央广购物</a><span> [<a href="login.html" style="margin-left:0" class="exit">退出</a>]</span>');
					$('.user-box').find('a').remove();
					$('.user-box').append('<div class="user-base"><h3>'+$.cookie('username')+'<span title="会员等级">注册会员</span></h3><p>上次登录：<time>2018-12-11 19:46:06</time></p></div>');
				}
				//退出
				$('.exit').on('click',function(){
					$.cookie('username',0,{ expires: -1 });
				 	$.cookie('password',0,{ expires: -1 }); 
				});
				$('.head-search-tab').hover(function(){ 
					$(this).children('.hide').show();  
				},function(){
					$(this).children('.hide').hide(); 
				})
				$('.head-search-tab span').on('click',function(){
					var str = $('.head-search-tab .active').html();
					$('.head-search-tab .active').html($(this).html());
					if(!$(this).hasClass('active')){
						$(this).hide().html(str);
					} 
				})
				$('.search-input').on('click',function(){
					$('.search-history').show();
				})
				$('.search-history').hover(function(){
					$(this).show(); 
				},function(){
					$(this).hide(); 
				})  
				//显示菜单 
		    	$('.subnav li').hover(function(){ 
		    		$(this).children('.sub-class').show();
		    	},function(){
		    		$(this).children('.sub-class').hide();
		    	})
		    	
		    	function hadecart(id,count){ 
		    		$.ajax({
			    		type:"get",
			 			url:"http://10.31.155.114/1808-5/shenqiuyun/cnrmall/php/get_cart_data.php",
			 			async:true,
			 			dataType:'json'
			    	}).done(function(data){
			    		 $.each(data, function(index,value) { 
			    		 	if(id==value.id){  
			    		 		var $str = '<li class="head-cart-itme">'+
									'<a class="mini-cart-img fl" href="details.html?id='+value.id+'" target="_blank">'+
										'<img src="'+value.imgsrc+'" alt="" title="" sid="'+value.id+'"/></a>'+
									'<div class="mini-cart-tit fl">'+
										'<a href="details.html?id='+value.id+'" target="_blank">'+value.title+'</a><p>'+value.description+'</p>'+
										'<h3><i>￥</i><b>'+value.price+'</b><span>x <em>'+count+'</em></span></h3></div>'+
									'<div class="mini-cart-btn fl"><span class="btn del-goods">删除</span></div></li>'; 
								$('.cart-goods-list').append($str); 
			 				}
							headcart();
			    		 });
			    	}).fail(function(){
			    		console.log('响应失败');
			    	});
		    	} 
		    	//取cookie
		 		if($.cookie('cookiesid') && $.cookie('cookienum')){
					var s=$.cookie('cookiesid').split(',');
					var n=$.cookie('cookienum').split(',');
					$.each(s,function(i,v){
						hadecart(s[i],n[i]);
					})
				}
				var arrsid=[];
				var arrnum=[];
				function cookietoarray(){
					if($.cookie('cookiesid') && $.cookie('cookienum')){
						arrsid=$.cookie('cookiesid').split(','); 
						arrnum=$.cookie('cookienum').split(','); 
					}
				}
				//删除cookie
				function delgoodslist(sid, arrsid) { 
				    var $index = -1;
				    $.each(arrsid,function(index,value){ 
				    	if(sid==value){
				    		$index=index; 
				    	}
				    });
				    arrsid.splice($index, 1); 
				    arrnum.splice($index, 1); 
				    $.cookie('cookiesid', arrsid.toString(),{expires:7}); 
				    $.cookie('cookienum', arrnum.toString(),{expires:7}); 
				}   
		 		//删除单个商品
		 		$('.cart-goods-list').on('click','.del-goods',function(){ 
		 			cookietoarray()
			 		if(confirm("你确认要删除吗？")){  
			 			$(this).parents('li').remove(); 
			 			location.reload(true);
						headcart();
					}
			 		delgoodslist($(this).first().parents('.head-cart-itme').find('img').attr('sid'), arrsid); 
			 	}); 
			 	//如果没有商品
		    	headcart(); 
		    	function headcart(){ 
		    		if($('.cart-goods-list li').size()==0){
			    		$('.cart-goods-list p').show();
			    		$('.go-cart h2 i').text('0');
			    	}else if($('.cart-goods-list li').size()>4){ 
			    		$('.go-cart h2').html("购物车里面还有<i>"+($('.cart-goods-list li').size()-4)+"</i>件宝贝");
			    	}else{
			    		$('.cart-goods-list p').hide();
			    		$('.go-cart h2').html("购物车里面有<i>"+$(".cart-goods-list li").size()+"</i>件宝贝");
			    	}
		    	} 
			});
			if($('#footer').hasClass('no-f-top')){
				$('#footer').load('footer.html .footer-bottom');
			}else{
				$('#footer').load('footer.html');
			}
			 
			//tap切换
			$('.tap-switch span').on('mousemove',function(){
				$(this).addClass('active').siblings('span').removeClass('active');
				$(this).parents('.J-floor').find('.goods-show-right').eq($(this).index()).show().siblings('.goods-show-right').hide();
			})
			
			//楼梯
			$(window).on('scroll',function(){
	    		var $top = $(window).scrollTop(); 
	    		if($top>800){
	    			$('#stairs').show();
	    		}else{
	    			$('#stairs').hide();
	    		}
	    		//滚动条显示对应楼层
	    		$(".J-floor").each(function(index,element){
	    			var $sTop=$(element).offset().top+400;  
	    			if($sTop>$top){ 
	    				$('.side-ul li').removeClass('active');
	    				$('.side-ul li').eq(index).addClass('active');
	    				return false;
	    			}
	    		})
	    	})
	    	//点击楼梯显示对应内容
	    	$('.side-ul li').on('click',function(){
	    		$(this).addClass('active').siblings('li').removeClass('active');
	    		var $top = $('.J-floor').eq($(this).index()).offset().top;
	    		 
	    		$('body,html').animate({
	    			scrollTop:$top
	    		});
	    	})
	    	//返回顶部
	    	$('.line-gotop,.back-top').on('click',function(){
	    		$('body,html').animate({
	    			scrollTop:0
	    		});
	    	})  
	    	
	    	//右侧菜单hover
	    	$('.right-menu li').hover(function(){
	    		$(this).find('span').stop(true).animate({
	    			left:-56
	    		}).css('background','#F15C18'); 
	    	},function(){
	    		$(this).find('span').stop(true).animate({
	    			left:0, 
	    		}).css('background','#727272'); 
	    	});  
		    //结算栏  滚动
	    	$(window).scroll(function(){ 
	    		var wh = $(window).height();
		    	var dh = $(document).height();  
		    	var bottomh = $('.footer-bottom').innerHeight()+20;
		    	var sh = $(document).height()-$(window).height()-bottomh;
	    		var $top=$(window).scrollTop();
	    		if(dh>1200 && dh>wh){
	    			if($top<sh){
	    				$('.float-bar').addClass('fixed');
	    			}else{
	    				$('.float-bar').removeClass('fixed');
	    			}
	    		} 
	    	}); 
	    	//购物车左侧菜单
			$('.cart-left li').find('h4').on('click',function(){
				$(this).toggleClass('shrink');
				$(this).next('.sub-menu').slideToggle();
			}); 
			
			//图片链式运动
			exercise();
			function exercise(){
				$('.live-special').eq(0).find('img').animate({
					width:160,
					height:160,
					left:-70 
				},1900,function(){
					$(this).animate({
						top:-101
					},1900,function(){
						$(this).animate({
							left:0 
						},1900,function(){
							$(this).animate({
								top:0
							},1900,function(){
								$(this).animate({
									width:90,
									height:59
								},1900,function(){
									setTimeout(exercise(),9500);
								});
							});
						});
					});
				});
			};
		
		})
	})  
})
