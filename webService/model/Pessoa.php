<?php
require_once 'Banco.php';
class Pessoa extends Banco{
	protected function Pessoa(){
		parent::Banco();
	}
	public function getPessoas($where = null, $itens = "*", $order = "nome"){
		return $this->select($itens, "pessoas", $where, $order);
	}
}
?>