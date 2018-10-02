<?php
global $App;
$App->incluir('model/Controller');
$App->incluir('model/Usuario');

class UsuarioController extends Controller{
	public $usuarios;
	
	function __construct(){
		parent::__construct();
		
		$this->usuarios = new Usuario();
	}
	public function index(){
		$usuario = $this->app->_request('usuario');
		$senha = $this->app->_request('senha');

		if (!empty($usuario) && !empty($senha)){
			$senha = md5($senha);

			$res = $this->usuarios->getUsuarios("(email = '$usuario' or login = '$usuario') and senha = '$senha'", null, "nome", array('pessoas', 'emails'));

			if (count($res)){
				$this->view('usuario', $res);
			}
			else{
				$this->usuarios->Erro(null, "0x0000000002");
			}
		}
		else{
			$this->usuarios->Erro(null, "0x0000000001");
		}
	}
	public function addPessoa(){
		$dados = $this->app->_get('pessoa');
		if (!empty($dados)){
			$dados = array(json_decode($dados, true));

			$this->usuarios->setPessoas($dados);

			$this->app->redireciona("usuario");
		}
		else{
			$this->usuarios->Erro(null, "0x0000000001");
		}
	}
	public function addUsuario(){
		$dados = $this->app->_get('usuario');
		if (!empty($dados)){
			$dados = array(json_decode($dados, true));
			$this->usuarios->setUsuarios($dados);
		}
		else{
			$this->usuarios->Erro(null, "0x0000000001");
		}
	}
}
?>