<?php
	require "conn.php";
	$id=$_GET['id'];
	echo $id;
	$query="delete from cart where id='$id'";
	mysql_query($query);
?>