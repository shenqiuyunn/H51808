;!(function($){
	$.fn.slide=function(options){
		var defaults={
			slideClassName:'active',
			slideUl:'ul',
			slideLi:'ul li',
 			slideBtns:'.hd-i i',
 			slideLeft:'.btn-left',
 			slideRight:'.btn-right', 
 			slideEtype:'click' 
		} 
		var endOptions=$.extend(defaults,options);
		var $num=0;
		var $bstop=true;
		var $timer=null;
		$(this).each(function(){
			var _this = $(this); 
			var $firstpic=_this.find(endOptions.slideLi).first().clone();
			var $lastpic=_this.find(endOptions.slideLi).last().clone();
			var $liwidth=_this.find(endOptions.slideLi).eq(0).outerWidth(); 
			//克隆
			_this.find(endOptions.slideUl).append($firstpic);
			_this.find(endOptions.slideUl).prepend($lastpic);  
			$(this).hover(function(){
				_this.find(endOptions.slideLeft).animate({opacity:1});
				_this.find(endOptions.slideRight).animate({opacity:1});
				clearInterval($timer);
			},function(){
				_this.find(endOptions.slideLeft).animate({opacity:0});
				_this.find(endOptions.slideRight).animate({opacity:0}); 
				$timer = setInterval(function() {
					_this.find(endOptions.slideRight).click();
				}, 4000);
			})
			//ul初始位置
			var $lisize=_this.find(endOptions.slideLi).size();
			_this.find(endOptions.slideUl).css({
				width:$liwidth*$lisize,
				left:-$liwidth
			});  
			
			//点击焦点
			_this.find(endOptions.slideBtns).on(endOptions.slideEtype,function(){ 
				$num=$(this).index(); 
				tabswitch()
			});
			
			//点击左按钮
			_this.find(endOptions.slideLeft).on('click',function(){
				$num--;
				tabswitch();
			});
			
			//点击右键
			_this.find(endOptions.slideRight).on('click',function(){
				if($bstop){
					$bstop=false;
					$num++;
					if($num>_this.find(endOptions.slideBtns).size()-1){
						_this.find(endOptions.slideBtns).eq(0).addClass(endOptions.slideClassName).siblings().removeClass(endOptions.slideClassName);
					}
					tabswitch();
				}
			});
			
			$timer = setInterval(function() {
				_this.find(endOptions.slideRight).click();
			}, 4000);
			
			function tabswitch(){
				_this.find(endOptions.slideBtns).eq($num).addClass(endOptions.slideClassName).siblings().removeClass(endOptions.slideClassName);
				_this.find(endOptions.slideUl).animate({
					left:-$liwidth*($num+1)
				},400,function(){ 
				if(parseInt(_this.find(endOptions.slideUl).css('left'))==-$liwidth*(_this.find(endOptions.slideBtns).size()+1)){
					_this.find(endOptions.slideUl).css('left',-$liwidth+'px');
					$num=0;
				}
				if(parseInt(_this.find(endOptions.slideUl).css('left'))==0){
					_this.find(endOptions.slideUl).css('left',-$liwidth*_this.find(endOptions.slideBtns).size()+'px');
						$num=_this.find(endOptions.slideBtns).size()-1;
					}
					$bstop=true;
				});
			}
		}) 
	}
})(jQuery)
