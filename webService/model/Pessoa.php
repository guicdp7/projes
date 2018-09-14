<?php
global $App;
$App->incluir('model/Banco');

class Pessoa extends Banco{
	function __construct(){
		parent::__construct();
	}
	public function getPessoas($where = null, $itens = "*", $order = "nome"){
		return $this->select($itens, "pessoas", $where, $order);
	}
	public function setPessoas($dados){
		foreach ($dados as $pessoa){
			array_push($pessoa, array('chave'=>'ip_cadastro', 'valor'=>$this->getUserIP()));
			$this->insert("pessoas", $pessoa);
		}
	}
}
?>