<?php
global $App;
$App->incluir('model/Controller');

class ErroController extends Controller{
    function __construct(){
		parent::__construct();
		
    }
    public function index(){
        $motivo = $this->app->_get("motivo");
        $codigo = $this->app->_get("codigo");

        if (empty($motivo)){
            $motivo = array("Desconhecido!");
        }
        else{
            $motivo = json_decode($motivo);
        }
        if (empty($codigo)){
            $codigo = "0x0000000000";
        }
        $this->view("erro", array('motivo'=>$motivo, 'codigo'=>$codigo));
	}
}