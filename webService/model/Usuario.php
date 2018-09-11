<?php
require_once 'Pessoa.php';
class Usuario extends Pessoa{	
	protected function Usuario(){
		parent::Pessoa();
	}
	public function getUsuarios($where = null, $itens = "*", $order = "nome"){
		return $this->select($itens, "usuarios", $where, $order);
	}
}
?>