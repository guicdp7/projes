<?php
global $App;

class Controller{
	public $app;

	function __construct(){
		global $App;

		$this->app = $App;	
	}
	public function view($classe, $dados){
		if ($this->app->tipoRetorno == "json"){
			echo json_encode(array($classe=>$dados));
			exit;
		}
		else{
			$_REQUEST[$classe] = $dados;
			$this->app->incluir("view/$classe");
		}
	}
}
?>