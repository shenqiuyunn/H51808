<?php
	require "conn.php";  
	if(isset($_POST['username'])){
		$username=$_POST['username'];
		$query="select * from user where username='$username'";
		$result=mysql_query($query);
		if(mysql_fetch_array($result)){ 
			echo 'false'; 
		}else{
			echo 'true'; 
		}
	} 
	 
	if(isset($_POST['submit']) && $_POST['submit']=="注册"){
		$user=$_POST['username']; 
		$pass=md5($_POST['password']);
		$email=$_POST['email']; 
		$query="insert user values(null,'$user','$pass','$email',NOW())";
		mysql_query($query);
		header('location:../src/login.html'); 
	}
?>