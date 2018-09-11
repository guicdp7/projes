<?php 
$usuarios = $_REQUEST['usuarios'];
?><!DOCTYPE html>
<html lang="pt-br">
<head><title>Usuarios</title></head>
<body><?php foreach($usuarios as $usuario) { echo $usuario['nome']; } ?></body>
</html>