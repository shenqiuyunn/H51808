define(['config'],function(){
	require(['jquery'],function(){
		require(['cookie'],function(){
			var $phpurl = 'http://10.31.155.114/1808-5/shenqiuyun/cnrmall/php/';
			//详情
			var $get_id = location.search.substring(1).split('=')[1] 
			$.ajax({
				type:'post',
				async:true,
				url:$phpurl+'details.php',
				data:{id:$get_id}, 
				dataType:'json'
			}).done(function(data){ 
				$.each(data,function(index,value){  
					if($get_id){
						$('title').text(value.title);
					}
					//放大镜图片
					var $urls = value.urls.split('&');
					$.each($urls,function(i,v){
						var $imgs = '<img src="'+v+'" alt="" title=""/>';
						$('.imgbox').append($imgs);
						$('.imgbox').children('img').eq(0).addClass('active');
					});
					$('.spic,.bf').children('img').attr("src",$urls[0]); 
					$('.spic img').attr("sid",value.id);
					$('.location span').text(value.title); 
					//商品详情
					$('.enshrine-num').text(value.enshrine);
					$('.limit-buy').text(value.limit_buy);
					var $str='<div class="goods-title"><h2>'+value.title+'</h2>'+
							'<p>'+value.description+'</p></div><dl class="goods-price-box"><dt>央广价</dt>'+
							'<dd>￥<b>'+value.price+'</b> <em class="original-price">原价：￥<i>'+value.original_price+'</i></em><em>赠送购物金: '+value.give_buy_money+'</em></dd></dl>'+
							'<dl class="logistics"><dt>物流</dt><dd>配送至<div class="delivery-address"><span>浙江杭州市江干区</span><i></i></div>'+
							'<strong class="repertory"><b></b><i></i></strong></dd></dl>';
					$('.goods-details').prepend($str); 
					if(value.repertory==0){
						$('.repertory').find('b').text('无货')
					}else{
						$('.repertory').find('b').text('有货')
					} 
					if(value.postage==0){
						$('.repertory').find('i').text('免运费')
					}else{
						$('.repertory').find('i').html('运费：￥'+value.postage);
					}
					if(value.sold_out==0){
						$('.sold-out').show();
					}else{
						$('.buy-number').show();
					} 
					//加购数量
					var $goodnum = 0;
					var $mnBuyNumInput = $('#mnBuyNumInput').val();
					//增加
					$('.amount .plus').on('click',function(){
						$('.amount .minus').removeClass('crisis');
						$mnBuyNumInput++;
						if($mnBuyNumInput>value.limit_buy){
							$(this).addClass('crisis');
							$mnBuyNumInput=value.limit_buy; 
						}
						$('#mnBuyNumInput').val($mnBuyNumInput); 
					})
					//减少
					$('.amount .minus').on('click',function(){
						$('.amount .plus').removeClass('crisis'); 
						$mnBuyNumInput--;
						if($mnBuyNumInput<=1){
							$(this).addClass('crisis');
							$mnBuyNumInput=1;  
						} 
						$('#mnBuyNumInput').val($mnBuyNumInput);
					}) 
					//如果图片<=5,隐藏按钮
					if($('.imgbox').find('img').size()<=5){ 
						$('.spec-list').find('span').hide();
					}else{
						$('.spec-list').find('span').show();
					} 
				}) 
			}).fail(function(){
				//console.log('响应失败!');
			});
	 		
	 		//加入购物车
	 		var arrsid=[];
			var arrnum=[];
			function cookietoarray(){
				if($.cookie('cookiesid') && $.cookie('cookienum')){
					arrsid=$.cookie('cookiesid').split(','); 
					arrnum=$.cookie('cookienum').split(','); 
				}
			}  
			$('.addcart').on('click',function(){ 
				var $sid = $('.spic').find('img').attr('sid'); 
				cookietoarray();
				if($.inArray($sid,arrsid)!=-1){
					var num= parseInt(arrnum[$.inArray($sid,arrsid)]) + parseInt($('#mnBuyNumInput').val());
					arrnum[$.inArray($sid,arrsid)]=num;
					$.cookie('cookienum',arrnum.toString(),{expires:10});  
				}else{ 
					arrsid.push($sid); 
					$.cookie('cookiesid',arrsid.toString(),{expires:10}); 
					arrnum.push($('#mnBuyNumInput').val());
					$.cookie('cookienum',arrnum.toString(),{expires:10});
				}
				//弹出提示
				var str='<div class="pop-up"><p><i></i>成功加入购物车!</p></div>';  
				$('body').append(str);
				setTimeout(function(){
					$('.pop-up').remove();
					location.reload(true);
				},800);
		 	}); 
	 		
	 		//橱窗
	 		function showcase(){
	 			$.ajax({
		 			type:"get",
		 			url:$phpurl+'get_showcase.php',
		 			dataType:'json'
		 		}).done(function(data){
		 			$.each(data, function(index,value) {
		 				var $urls = value.urls.split('&');
		 				var $str = '<li><a href="details.html?&id='+value.id+'" target="_blank">'+
							'<img src="'+$urls[0]+'" alt="" title="" referrer="no-referrer|origin|unsafe-url"/><p>￥ '+value.price+'</p></a></li>';
						$('.showcase ul').append($str);
		 			});
		 		}).fail(function(){
		 			console.log('响应失败')
		 		});
	 		}
	 		showcase();
	 		//换一批
	 		$('.change').on('click',function(){
	 			$('.showcase ul').html('');
	 			showcase();
	 		}); 
	 	})
	})
})
