<?php 
$erro = $_REQUEST['erro'];
?><!DOCTYPE html>
<html lang="pt-br">
<head><title>Erro</title></head>
<body>
    <h1>Erro <?= $erro['codigo'] ?></h1>
    <h4>Motivos:</h4>
    <?php foreach ($erro['motivo'] as $motivo) : ?>
    <p><?= $motivo ?></p>
    <?php endforeach; ?>
</body>
</html>