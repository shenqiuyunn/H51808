<?php
	require "conn.php";
	$classify=$_POST['classify']; 
	$result = mysql_query("select * from goods where classify='$classify'");  
	$value = array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$value[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}
	echo json_encode($value);
?>