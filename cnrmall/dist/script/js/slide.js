!function(o){o.fn.slide=function(i){var t=o.extend({slideClassName:"active",slideUl:"ul",slideLi:"ul li",slideBtns:".hd-i i",slideLeft:".btn-left",slideRight:".btn-right",slideEtype:"click"},i),f=0,a=!0,c=null;o(this).each(function(){var i=o(this),e=i.find(t.slideLi).first().clone(),s=i.find(t.slideLi).last().clone(),l=i.find(t.slideLi).eq(0).outerWidth();i.find(t.slideUl).append(e),i.find(t.slideUl).prepend(s),o(this).hover(function(){i.find(t.slideLeft).animate({opacity:1}),i.find(t.slideRight).animate({opacity:1}),clearInterval(c)},function(){i.find(t.slideLeft).animate({opacity:0}),i.find(t.slideRight).animate({opacity:0}),c=setInterval(function(){i.find(t.slideRight).click()},4e3)});var n=i.find(t.slideLi).size();function d(){i.find(t.slideBtns).eq(f).addClass(t.slideClassName).siblings().removeClass(t.slideClassName),i.find(t.slideUl).animate({left:-l*(f+1)},400,function(){parseInt(i.find(t.slideUl).css("left"))==-l*(i.find(t.slideBtns).size()+1)&&(i.find(t.slideUl).css("left",-l+"px"),f=0),0==parseInt(i.find(t.slideUl).css("left"))&&(i.find(t.slideUl).css("left",-l*i.find(t.slideBtns).size()+"px"),f=i.find(t.slideBtns).size()-1),a=!0})}i.find(t.slideUl).css({width:l*n,left:-l}),i.find(t.slideBtns).on(t.slideEtype,function(){f=o(this).index(),d()}),i.find(t.slideLeft).on("click",function(){f--,d()}),i.find(t.slideRight).on("click",function(){a&&(a=!1,++f>i.find(t.slideBtns).size()-1&&i.find(t.slideBtns).eq(0).addClass(t.slideClassName).siblings().removeClass(t.slideClassName),d())}),c=setInterval(function(){i.find(t.slideRight).click()},4e3)})}}(jQuery);