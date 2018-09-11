<?php
require_once 'Ajuda.php';
class Banco extends Ajuda{
	private $host = "localhost";
	private $nomeDeUsuario = "u791442174_bd";
	private $senha = "oknWwiewR494";
	private $nomeDoBanco = "u791442174_bd";
	protected $conexao;
	
	protected function Banco(){
		$this->conexao = new mysqli($host, $nomeDeUsuario, $senha, $nomeDoBanco);
		
		if ($this->conexao->connect_error){
			$this->Erro(array("Erro ao conectar ao banco de dados:", $this->conexao->connect_error));
		}
	}
	public function select($itens = array(), $from, $where = null, $order = null){
		$sql = "select ";
		if (gettype($itens) == "string"){
			$itens = array($itens);
		}
		else if (empty($itens) || gettype($itens) != "array"){
			$itens = array("*");
		}
		for($i = 0; $i < count($itens) - 1; $i++){
			$sql .= $itens[$i].", ";
		}
		$sql .= $itens[$i]." ".$from." ";
		if (!empty($where)){
			$sql .= "where ";
			if (gettype($where) == "string"){
				$sql .= $where." ";
			}
			else{
				for($j = 0; $j < count($where); $j++){
					$sql .= $where[$i]['chave']."=".$where[$i]['valor']." and ";
				}
				$sql .= $where[$i]['chave']."=".$where[$i]['valor']." ";
			}
		}
		if (!empty($order)){
			$sql .= "order by $order";
		}
		$res = $this->conexao->query($sql);
		if ($res->num_rows){
			return $res->fetch_assoc();
		}
		else{
			return false;
		}
	}
}
?>