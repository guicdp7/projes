<?php
global $App;
$App->incluir('model/Ajuda');

class Banco extends Ajuda{
	private $host = "localhost";
	private $nomeDeUsuario = "u791442174_bd";
	private $senha = "oknWwiewR494";
	private $nomeDoBanco = "u791442174_bd";
	public $lastInsertId = null;
	
	function __construct(){
		parent::__construct();
	}	
    public function getCurrentTimeStamp(){
		$res = $this->query("select CURRENT_TIMESTAMP() as time");
		$data = $res->fetch_assoc();
        return $data['time'];
    }
    public function getUserIP() {
        $ipaddress = null;
        if (isset($_SERVER['HTTP_CLIENT_IP'])){
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        }
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])){
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        else if(isset($_SERVER['HTTP_X_FORWARDED'])){
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        }
        else if(isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP'])){
            $ipaddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
        }
        else if(isset($_SERVER['HTTP_FORWARDED_FOR'])){
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        }
        else if(isset($_SERVER['HTTP_FORWARDED'])){
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        }
        else if(isset($_SERVER['REMOTE_ADDR'])){
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        }
        else{
            $ipaddress = null;
        }
        if ($ipaddress){
			$res = $this->select("id", "ips", 'ip = "'.$ipaddress.'"');

            if (count($res)){
                $this->update('ips', array(array('chave'=>'ultimo_acesso','valor'=>$this->getCurrentTimeStamp())), 'id = '.$res['id']);
                return $res['id'];
            }
            else{
                $res = $this->insert('ips', array(array('chave'=>'ip','valor'=>$ipaddress)));
                return $this->lastInsertId;
            }
        }
        else{
            return null;
        }
    }
	public function insert($tabela, $itens){
		$sql = "insert into $tabela (";
		$chaves = ""; $valores = "";
		for ($i = 0; $i < count($itens) - 1; $i++){
			$chaves .= $itens[$i]['chave'].",";
			if (gettype($itens[$i]['valor']) == "string"){
				$valores .= "'".$itens[$i]['valor']."',";
			}
			else{
				$valores .= $itens[$i]['valor'].",";
			}
		}
		$chaves .= $itens[$i]['chave'];
		if (gettype($itens[$i]['valor']) == "string"){
			$valores .= "'".$itens[$i]['valor']."'";
		}
		else{
			$valores .= $itens[$i]['valor'];
		}
		$sql .= "$chaves) values ($valores)";
		return $this->query($sql);
	}
	public function query($sql){		
		$conexao = new mysqli($this->host, $this->nomeDeUsuario, $this->senha, $this->nomeDoBanco);
		if ($conexao->connect_error){
			$this->Erro(array("Erro ao conectar ao banco de dados:", $conexao->connect_error));
		}
		else{
			$res = $conexao->query($sql);
			if ($conexao->error){
				$this->Erro(array('Erro ao realizar a operação no banco de dados', $conexao->error));
			}
			else{
				$this->lastInsertId = $conexao->insert_id;
				$conexao->close();
				return $res;
			}
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
		$sql .= $itens[$i]." from ".$from." ";
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
		$res = $this->query($sql);
		if (!$res || $res->num_rows == 0){
			return array();
		}
		else {
			return $res->fetch_assoc();
		}
	}
	public function update($tabela, $itens, $where = null){
		$sql = "update $tabela set ";
		$valores = "";
		for ($i = 0; $i < count($itens) - 1; $i++){
			$valores .= $itens[$i]['chave']."=";
			if (gettype($itens[$i]['valor']) == "string"){
				$valores .= "'".$itens[$i]['valor']."',";
			}
			else{
				$valores .= $itens[$i]['valor'].",";
			}
		}
		$valores .= $itens[$i]['chave']."=";
		if (gettype($itens[$i]['valor']) == "string"){
			$valores .= "'".$itens[$i]['valor']."'";
		}
		else{
			$valores .= $itens[$i]['valor'];
		}
		$sql .= $valores;
		if (!empty($where)){
			$sql .= " where ";
			if (gettype($where) == "string"){
				$sql .= $where;
			}
			else{
				for($j = 0; $j < count($where); $j++){
					$sql .= $where[$i]['chave']."=".$where[$i]['valor']." and ";
				}
				$sql .= $where[$i]['chave']."=".$where[$i]['valor'];
			}
		}
		return $this->query($sql);
	}
}
?>