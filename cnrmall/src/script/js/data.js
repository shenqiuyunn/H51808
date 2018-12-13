define(['config'],function(){
	require(['jquery'],function(){  
		var $phpurl = 'http://10.31.155.114/1808-5/shenqiuyun/cnrmall/php/'; 
		//=============楼层数据==============  
		var $category=[];
		var $classify=[];
		$('.J-floor').not('.vip-box').each(function(){ 
			var $data_category = $(this).find('.goods-show-right').data('category');
			var $data_classify = $(this).find('.goods-show-right').data('classify');
			$(this).find('.goods-show-right').not('.recommend').each(function(){ 
				$classify.push($(this).data('classify')); 
			}); 
			$category.push($data_category); 
		});  
		$.each($category,function(i,v){ 
			floorCategory(v,i);
		}); 
		$.each($classify,function(i,v){ 
			floorClassify(v,i);
		});  
		function floorCategory(category,i){
			$.ajax({
		        type: "POST",
		        async:true,
		        url: $phpurl+"get_category.php", 
		        data:{category:category},
		        dataType:"json",
		    }).done(function(data){ 
		        var li=0;
				$.each(data,function(index,value){
					li++ 
					if(value.category==category){
						var $strhtml='<li class="li_'+li+'">'+
								'<a href="details.html?id='+value.id+'" target="_blank"><img referrer="no-referrer|origin|unsafe-url"  data-original="'+value.advertising+'" class="lazy" alt="" title=""></a>'+
						'</li>'; 
						$('.J-floor').eq(i).find('.recommend .ul-goods-box').append($strhtml);
					} 
				});
		    }).fail(function(){
		        console.log("响应失败");
		    }); 
		}  
		function floorClassify(classify,i){
			$.ajax({
		        type: "POST",
		        async:true,
		        url: $phpurl+"get_classify.php", 
		        data:{classify:classify},
		        dataType:"json",
		    }).done(function(data){
		        var li=0;
				$.each(data,function(index,value){
					if(value.classify==classify){
						var $strhtml='<li>'+
							'<a href="details.html?id='+value.id+'" target="_blank"><img referrer="no-referrer|origin|unsafe-url" src="'+value.imgsrc+'" alt="" title="'+value.title+'"/></a>'+
							'<a href="details.html?id='+value.id+'" target="_blank"" class="a-title" title="'+value.title+'">'+value.title+'</a>'+ 
							'<p>￥'+value.price+'</p>'+
						'</li>';
						$('.J-floor').find('.goods-aligned').eq(i).append($strhtml);
					}  
				}); 
		    }).fail(function(){
		        console.log("响应失败");
		    }); 
		} 
		//=============楼层数据==============  
	  
		//会员专享 
		$.ajax({
			type:'post',
			async:true,
			url:$phpurl+'get_vip_data.php', 
			dataType:'json'
		}).done(function(data){ 
			$.each(data,function(index,value){  
				var $strhtml='<li>'+
						'<a href="details.html?id='+value.id+'" target="_blank"><img referrer="no-referrer|origin|unsafe-url" src="'+value.imgsrc+'" alt="" title=""/></a>'+
						'<h6>'+value.title+'</h6>'+
					'</li>';
				$('.vip-box ul').append($strhtml);
			});
		}).fail(function(){
			console.log('响应失败!');
		});  
	});  
});
