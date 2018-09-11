<?php
require_once 'Biblioteca.php';
class Ajuda extends Biblioteca{
	public function Erro($motivo = null, $codigo = null){
		if (gettype($motivo) == "string"){
			$motivo = array($motivo);
		}
		else if (empty($motivo) || gettype($motivo) != "array"){
			$motivo = "Desconhecido";
		}
		if (empty($codigo)){
			$codigo = "0x".md5($motivo);
		}
		$this->redireciona("Erro", array(array('motivo'=>$motivo, 'codigo'=>$codigo)));
	}
}
?>