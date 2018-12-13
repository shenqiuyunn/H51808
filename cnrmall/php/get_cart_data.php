<?php
	require "conn.php";
	$result = mysql_query("select * from goods");  
	$value = array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$value[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}
	echo json_encode($value); 
?>