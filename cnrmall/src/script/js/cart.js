define(['config'],function(){
	require(['jquery'],function(){ 
		require(['cookie'],function(){ 
	 		//如果购物车为空
	 		function nodata(){
	 			if($('.catr-goods-list ul li').size()==1){
		 			$('.catr-goods-list .no-data').show();
		 			$('.float-bar').hide();
		 		}else{
		 			$('.catr-goods-list .no-data').hide();
		 			$('.float-bar').show();
		 		}
	 		}  
	 		nodata();
	 		function goodslist(id,count){ 
	 			$.ajax({
		 			type:"get",
		 			url:"http://10.31.155.114/1808-5/shenqiuyun/cnrmall/php/get_cart_data.php",
		 			async:true,
		 			dataType:'json'
		 		}).done(function(data){ 
		 			$.each(data, function(index,value) {   
		 				if(id==value.id){
							var $clonebox=$('.li-itme:hidden').clone(true,true); 
							$clonebox.find('a').attr('href','details.html?id='+value.id)
							$clonebox.find('.cart-list-img').find('img').attr('src',value.imgsrc);
							$clonebox.find('.cart-list-img').find('img').attr('sid',value.sid);
							$clonebox.find('.cart-list-title').find('a').html(value.title);
							$clonebox.find('.cart-list-title').find('p').html(value.description); 
							$clonebox.find('#mnBuyNumInput').val(count);
							$clonebox.find('.original-price').html(value.original_price);
							$clonebox.find('.limit_buy').html(value.limit_buy); 
							$clonebox.find('.b-prc').html(value.price);
							$clonebox.find('.price').html((value.price*count).toFixed(2)); 
							$clonebox.css('display','block'); 
							$('.cart-ul-list').append($clonebox); 
		 				} 
		 				nodata()
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
					goodslist(s[i],n[i]);
				})
			}  
			
			//增加
	 		$('.amount .plus').on('click', function() {
				var $parentli = $(this).parents('li');
				var $mnBuyNumInput = $parentli.find('#mnBuyNumInput').val();
				var $limit_buy = $parentli.find('.limit_buy').text();
				var $price = $parentli.find('.b-prc').text();
				$(this).siblings('.minus').removeClass('crisis');
				$mnBuyNumInput++; 
				if($mnBuyNumInput >= $limit_buy) { 
					$(this).addClass('crisis');
					$mnBuyNumInput = $limit_buy; 
				}
				$parentli.find('#mnBuyNumInput').val($mnBuyNumInput);
				$parentli.find('.price').text(($mnBuyNumInput * $price).toFixed(2));
				amountmoney();
				setcookie($(this));
			})
			//减少
			$('.amount .minus').on('click', function() {
				var $parentli = $(this).parents('li');
				var $mnBuyNumInput = $parentli.find('#mnBuyNumInput').val(); 
				var $price = $parentli.find('.b-prc').text();
				$(this).siblings('.plus').removeClass('crisis');
				$mnBuyNumInput--; 
				if($mnBuyNumInput < 1) {
					$(this).addClass('crisis');
					$mnBuyNumInput = 1; 
				}
				$parentli.find('#mnBuyNumInput').val($mnBuyNumInput);
				$parentli.find('.price').text(($mnBuyNumInput * $price).toFixed(2));
				amountmoney();
				setcookie($(this));
			}) 
			//输入商品
			$('#mnBuyNumInput').on('input', function() {
				var $parentli = $(this).parents('li');
				var $limit_buy = $parentli.find('.limit_buy').text();
				var $price = $parentli.find('.b-prc').text();
				var $reg = /^\d+$/g; //只能输入数字
	    		var $value = parseInt($(this).val());
				if ($reg.test($value)) {
			        if ($value >= $limit_buy) {//限定范围
			            $(this).val($limit_buy);
			        } else if ($value <= 0) {
			            $(this).val(1);
			        } else {
			            $(this).val($value);
			        }
			    } else {
			        $(this).val(1);
			    }
				$parentli.find('.price').text(($(this).val() * $price).toFixed(2));
				amountmoney();
				setcookie($(this));
			})
			 
	 		//总金额
	 		function amountmoney(){   
				var $num=0;
				var $count=0;
				$.each($('.catr-goods-list ul li:visible'), function(index,element) {
					if($(element).find('.cart-list-checkbox input').prop('checked')){
						$num+= parseInt($(element).find('.price').text()) ;
						$count+= parseInt($(element).find('#mnBuyNumInput').val());
					}
				});
				$('.float-bar-right').find('b').text($num.toFixed(2));
				$('.float-bar-right').find('i').text($count);
			}
	 		
	 		//全选
	 		$('.checkedall').on('change',function(){
	 			$('.checkedall').prop('checked',$(this).prop('checked'));
	 			$('.catr-goods-list ul li:visible').find('.cart-list-checkbox input').prop('checked',$(this).prop('checked')); 
	 			amountmoney();
	 			buttonactive();
	 		});
	 		//单选
	 		var $inputs=$('.catr-goods-list ul li:visible').find(':checkbox');
	 		$('.catr-goods-list ul').on('change',$inputs,function(){
	 			if($('.catr-goods-list ul li:visible').find('input:checkbox').length==$('.catr-goods-list ul').find('input:checked').size()){
					$('.checkedall').prop('checked',true);
				}else{
					$('.checkedall').prop('checked',false);
				}
				amountmoney();
				buttonactive();
	 		}) 
	 		
	 		var arrsid=[];
			var arrnum=[];
			function cookietoarray(){
				if($.cookie('cookiesid') && $.cookie('cookienum')){
					arrsid=$.cookie('cookiesid').split(','); 
					arrnum=$.cookie('cookienum').split(','); 
				}
			}
			function setcookie(obj) {
				cookietoarray();
			    var $index = obj.parents('.li-item').find('img').attr('sid');//通过id找数量的位置
			    arrnum[$.inArray($index,arrsid)] = obj.parents('.li-item').find('#mnBuyNumInput').val();
			    $.cookie('cookienum', arrnum.toString(),{expires:7});
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
	 		$('.delete-btn').on('click',function(){ 
	 			cookietoarray()
		 		if(confirm("你确认要删除吗？")){  
		 			$(this).parents('li').remove(); 
					nodata();
				}
		 		delgoodslist($(this).first().parents('.li-itme').find('img').attr('sid'), arrsid);
		 		amountmoney();
		 	}); 
	 		
	 		//删除全部商品
	 		$('.del-check').on('click',function(){
	 			cookietoarray();
	 			if($('.catr-goods-list ul').find('input:checked').size()==0){
	 				alert("请选择要删除的商品！");
	 			}else{
	 				if(confirm("你确认要删除吗？")){   
		 				$('.catr-goods-list ul li').each(function(){ 
					        if ($(this).find('input:checkbox').is(':checked')){ 
					            $(this).remove();  
					            delgoodslist($(this).find('img').attr('sid'), arrsid);
					        }
					   }); 
					    amountmoney();
					    nodata();
					    buttonactive();
		 			}; 
	 			}
	 		})
	 		
	 		//设置结算按钮
	 		function buttonactive(){ 
	 			if($('.float-bar-right').find('i').html()>0){
		 			$('.float-bar-right').find('button').addClass('active');
		 		}else{
		 			$('.float-bar-right').find('button').removeClass('active');
		 		}
	 		} 
	 	})
	})
})
