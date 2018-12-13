<?php
	require "conn.php";
	$result = mysql_query("select * from goods where recommend=1 order by rand() limit 3");  
	$value = array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$value[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}
	echo json_encode($value);
?>