<?php
require_once 'model/Biblioteca.php';
$App = new Biblioteca();

$App->incluir('configs/App');
$configs = new App();

$classe = $configs->classePadrao;
$metodo = $configs->metodoPadrao;
if (isset($_GET['c'])){
	$classe = ucfirst(strtolower($_GET['c']));
}
if (isset($_GET['a'])){
	$metodo = strtolower($_GET['a']);
}
  
$classe .= 'Controller';
  
require_once 'controller/'.$classe.'.php';
  
$obj = new $classe();
$obj->$metodo();
?>