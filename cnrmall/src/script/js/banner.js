define(['config'], function() {
	//banner轮播
	require(['jquery'], function() { 
		var $banner_box = $('.banner-box');
		var $btns = $('.banner-box .hd-i i');
		var $pics = $('.banner-box ul li');
		var $left = $('.switch-btn .btn-left')
		var $right = $('.switch-btn .btn-right')
		var $num = 0;
		var $timer = null;
		$banner_box.hover(function() {
			$('.switch-btn .btn-left,.switch-btn .btn-right').stop(true).animate({
				opacity: 0.2
			});
			clearInterval($timer);
		}, function() {
			$('.switch-btn .btn-left,.switch-btn .btn-right').stop(true).animate({
				opacity: 0
			});
			$timer = setInterval(function() {
				$right.click();
			}, 4000);
		});
		$btns.on('click', function() {
			$num = $(this).index();
			tabswitch();
		});

		function tabswitch() {
			$btns.eq($num).addClass('active').siblings('i').removeClass('active');
			$pics.eq($num).stop(true).animate({
				opacity: 1
			}).siblings('li').stop(true).animate({
				opacity: 0
			})
		}
		$right.on('click', function() {
			$num++;
			if($num > $btns.length - 1) {
				$num = 0;
			}
			tabswitch();
		});
		$left.on('click', function() {
			$num--;
			if($num < 0) {
				$num = $btns.length - 1;
			}
			tabswitch();
		});
		$timer = setInterval(function() {
			$right.click();
		}, 4000);
	});
	
	//放大镜
	require(['jquery'],function(){ 
	    var $scale=$('.scale'); 
		var $bpic=$('.bpic') 
		var $spic = $('.spic');
		var $sf = $('.sf');
		var $bf = $('.bf'); 
		var $spicimg=$('.spic img');
		var $btnleft=$('.btn-left');
		var $btnright=$('.btn-right');
		var $speclist=$('.spec-list'); 
		var $num=5; 
		 
		//小放尺寸
		var w = $spic.width()*$bf.width()/$bpic.width();
		var h = $spic.height()*$bf.height()/$bpic.height(); 
		$sf.width(w);
		$sf.height(h);
		//计算比例
		var $bili=$bf.width()/$sf.width(); 
			
		$spic.on('mouseover',function(){ 
			$sf.css('visibility','visible');
			$bf.css('visibility','visible');
			$(this).mousemove(function(ev){
				var ev=ev||window.event;
				move(ev) 
			});
		});
		$spic.on('mouseout',function(){
			$sf.css('visibility','hidden');
			$bf.css('visibility','hidden');
		});
		function move(ev){
			var x = ev.clientX-$scale.offset().left-$sf.width()/2;
			var y = ev.clientY-$scale.offset().top-$sf.height()/2; 
			//判断边界
			if(x<=0){
				x=0;
			}else if(x>=$spic.width()-$sf.width()){
				x=$spic.width()-$sf.width();
			}
			if(y<=0){
				y=0;
			}else if(y>=$spic.height()-$sf.height()){
				y=$spic.height()-$sf.height()-2;
			}
			$sf.css('left',x+'px').css('top',y+'px'); 
			//大放位置
			$bpic.css('left',-x*$bili+'px').css('top',-y*$bili+'px') 
		}
		$('.imgbox').on('mousemove','img',function(){
			$(this).addClass('active').siblings().removeClass('active');
			$spicimg.attr('src',$(this).attr('src')); 
			$('.bpic').attr('src',$(this).attr('src'));
		});   
		//往左
		$('.btn-left').on('click',function(){
			$('.btn-right').removeClass('no-click'); 
			var $imgL = $('.imgbox').find('img');  
			$('.imgbox').css('width',$imgL.size()*($imgL.eq(0).innerWidth()+7)+'px'); 
			if($num>5){
				$num--; 
				if($num<=5){
					$(this).addClass('no-click');
				} 
				$('.imgbox').animate({left:-($num-5)*($imgL.eq(0).innerWidth()+7)});
			} 
		}); 
		//往右 
		$('.btn-right').on('click',function(){
			$('.btn-left').removeClass('no-click'); 
			var $imgL = $('.imgbox').find('img');  
			$('.imgbox').css('width',$imgL.size()*($imgL.eq(0).innerWidth()+7)+'px'); 
			if($num<$imgL.size()){
				$num++; 
				if($num==$imgL.size()){
					$(this).addClass('no-click');
				} 
				$('.imgbox').animate({left:-($num-5)*($imgL.eq(0).innerWidth()+7)});
			} 
		}); 
	}); 
	
	//商品幻灯片
	require(['jquery', 'slide'], function() { 
		$('.slide-switch').slide({
			slideEtype:'mouseover'
		});
		 
	});  
	//图片懒加载
	require(['jquery'], function() { 
		require(['lazyload'], function() { 
			$("img.lazy").lazyload({
				effect: "fadeIn"
			}); 
		}) 
	}); 
});