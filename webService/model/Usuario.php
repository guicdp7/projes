<?php
global $App;
$App->incluir('model/Pessoa');
$App->incluir('model/Email');

class Usuario extends Pessoa{	
	function __construct(){
		parent::__construct();
	}
	public function getUsuarios($where = null, $itens = null, $order = "nome", $addTabs = array()){
		$join = array();

		if (empty($itens)){
			$itens = array(
				'usuarios.id',
				'usuarios.login',
				'usuarios.acesso',
				'usuarios.status',
				'usuarios.dt_atualizado'
			);
		}

		if (in_array('pessoas', $addTabs)){
			array_push($join, array(
				'tipo' => 'LEFT',
				'tabela' => 'pessoas',
				'condicao' => 'pessoas.id = usuarios.pessoa_id'
			));
			array_push($itens, 
				'pessoas.id as pessoa_id',
				'pessoas.nome',
				'pessoas.sobrenome',
				'pessoas.dt_cadastro'
			);
		}
		if (in_array('emails', $addTabs)){
			array_push($join, array(
				'tipo' => 'LEFT',
				'tabela' => 'emails',
				'condicao' => 'emails.pessoa_id = usuarios.pessoa_id'
			));
			array_push($itens,
				'emails.id as email_id',
				'emails.email',
				'emails.dt_atualizado as email_dt_att'
			);
		}
		$res = $this->select($itens, "usuarios", $where, $order, $join);
		return $res;
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