<?php
global $App;
$App->incluir('model/Banco');

class Email extends Banco{
	function __construct(){
		parent::__construct();
	}
	public function getEmails($where = null, $itens = "*", $order = "email"){
		return $this->select($itens, "emails", $where, $order);
	}
	public function setEmails($dados){
		foreach ($dados as $email){
			array_push($email, array('chave'=>'ip_atualizado', 'valor'=>$this->getUserIP()));
			$this->insert("emails", $email);
		}
	}
}
?>