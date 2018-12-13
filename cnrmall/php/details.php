<?php
	require "conn.php";
	$id=$_POST['id']; 
	$result = mysql_query("select * from goods where id='$id'");  
	$value = array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$value[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}
	echo json_encode($value);
?>