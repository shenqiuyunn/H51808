<?php
	require "conn.php";
	$imgsrc=$_GET['imgsrc'];
	$title=$_GET['title'];
	$description=$_GET['description'];
	$price=$_GET['price'];
	$original_price=$_GET['original_price'];
	$limit_buy=$_GET['limit_buy']; 
	$goods_num=$_GET['goods_num'];
	$goods_id=$_GET['id'];  
 	$query="insert cart values(null,'$imgsrc','$title','$description','$price','$original_price','$limit_buy','$goods_num','$goods_id')";
 	mysql_query($query);
?>