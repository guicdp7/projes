<?php
class Biblioteca{
	public $appLink;
	public $tipoRetorno;

	function __construct(){
		$this->appLink = "http://projes.esy.es/";
		$this->tipoRetorno = $this->_request('retorno', 'html');	
	}
	public function _get($chave, $padrao = ""){
		if (isset($_GET[$chave])){
			return $_GET[$chave];
		}
		return $padrao;
	}
	public function _post($chave, $padrao = ""){
		if (isset($_POST[$chave])){
			return $_POST[$chave];
		}
		return $padrao;
	}
	public function _request($chave, $padrao = ""){
		$res = $this->_get($chave);
		if (empty($res)){
			$res = $this->_post($chave);
		}
		if (empty($res)){
			return $padrao;
		}
		return $res;
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
		if ($this->tipoRetorno != "html"){
			$link.="&retorno=".$this->tipoRetorno;
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
}
?>