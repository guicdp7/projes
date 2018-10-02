<?php
global $App;

class Ajuda{
	public $app;

	function __construct(){
		global $App;

		$this->app = $App;
	}
	public function Erro($motivo = null, $codigo = null){
		if (empty($motivo) || gettype($motivo) != "array"){
			switch($codigo){
				case "0x0000000001": $motivo = "Nenhum dado recebido"; break;
				case "0x0000000002": $motivo = "Credenciais inválidas"; break;
				default: $motivo = "Desconhecido"; 
					if (empty($codigo)){
						$codigo = "0x".md5($motivo);
					}
					break;
			}			
		}
		if (gettype($motivo) == "string"){
			$motivo = array($motivo);
		}
		$motivo = json_encode($motivo);
		$this->app->redireciona("Erro", array(array('chave'=>'motivo','valor'=>$motivo),array('chave'=>'codigo','valor'=>$codigo)));
	}
}
?>