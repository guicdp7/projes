<?php
$classe = $_GET['c'];
$metodo = $_GET['a'];
if (empty($metodo)){
	$metodo = "index";
}
  
$classe .= 'Controller';
  
require_once 'controller/'.$classe.'.php';
  
$obj = new $classe();
$obj->$metodo();
?>