<?php
global $App;
$App->incluir('model/Pessoa');

class Usuario extends Pessoa{	
	function __construct(){
		parent::__construct();
	}
	public function getUsuarios($where = null, $itens = "*", $order = "nome"){
		return $this->select($itens, "usuarios", $where, $order);
	}
	public function setUsuarios($dados){
		foreach ($dados as $usuario){
			array_push($usuario, array('chave'=>'ip_atualizado', 'valor'=>$this->getUserIP()));
			array_push($usuario, array('chave'=>'dt_atualizado', 'valor'=>$this->getCurrentTimeStamp()));
			$this->insert("usuarios", $usuario);
		}
	}
}
?>