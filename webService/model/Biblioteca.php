<?php
class Biblioteca{
	public $appLink;

	function __construct(){
		$this->appLink = "http://projes.esy.es/";
	}	
	public function getLink($classe, $acao = 'index', $parametros = array()){
		$link = $this->appLink."?c=$classe";
		if (!empty($acao)){
			$link .= "&a=$acao";
		}
		if (count($parametros)){
			foreach($parametros as $parametro){
				$link .= "&".$parametro['chave']."=".$parametro['valor'];
			}
		}
		return $link;
	}
	public function incluir($classe){
		require_once $_SERVER['DOCUMENT_ROOT'].'/'.$classe.".php";
	}
	public function redireciona($para, $parametros = array()){
		$classe; $acao = null;
		if (gettype($para) == "string"){
			$classe = $para;
		}
		else if (gettype($para) == "array"){
			$classe = $para['c'];
			$acao = $para['a'];
		}
		header('location: '.$this->getLink($classe, $acao, $parametros));
		exit;
	}
	public function view($classe, $dados){
		$_REQUEST[$classe] = $dados;
		$this->incluir("view/$classe");
	}
}
?>