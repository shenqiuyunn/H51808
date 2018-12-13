<?php
	require "conn.php";
	$result = mysql_query("select * from goods where sold_out=0 order by rand() limit 5");  
	$value = array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$value[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}
	echo json_encode($value); 
?>