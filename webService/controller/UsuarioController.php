<?php
require_once '../model/Controller.php';
require_once '../model/Usuario.php';
class UsuarioController extends Controller{
	protected $usuarios;
	
	private function UsuarioController(){
		parent:Controller();
		
		$this->usuarios = new Usuario();
	}
	public function index(){
		$_REQUEST['usuarios'] = $this->usuarios->getPessoas();
		
		require_once '../view/usuario.php';
	}
}
?>