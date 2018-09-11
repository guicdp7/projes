<?php
class Biblioteca{
	public appLink = "projex.esy.es";
	
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
	}
}
?>