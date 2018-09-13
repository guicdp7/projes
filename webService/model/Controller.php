<?php
global $App;

class Controller{
	public $app;

	function __construct(){
		global $App;

		$this->app = $App;
	}
	public function _get($chave){
		if (isset($_GET[$chave])){
			return $_GET[$chave];
		}
		else{
			return "";
		}
	}
	public function _post($chave){
		if (isset($_POST[$chave])){
			return $_POST[$chave];
		}
		else{
			return "";
		}
	}
}
?>