<?php
	require "conn.php";
	if(isset($_POST['username']) && isset($_POST['password'])){
		$user = $_POST['username'];
		$pass = md5($_POST['password']); 
		$result = mysql_query("select * from user where username='$user' and password='$pass'");
		if(mysql_fetch_array($result)){
			echo true;
		}else{
			echo false;
		}
	} 
?>