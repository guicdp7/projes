"use strict";
/*Variáveis Globais*/
var Servidor = "http://projes.esy.es/", Pagina, AjaxErros = [], ArquivoErros = [], thisUser = false;

/*Atribuições Globais*/
AjaxErros[0] = "Sem conexão com o servidor (Erro 0).";
AjaxErros[404] = "Página não encontrada (Erro 404).";
AjaxErros[500] = "Erro interno do Servidor (Erro 500).";
AjaxErros['parsererror'] = "A análise da requisição JSON falhou.";
AjaxErros['timeout'] = "Tempo limite excedido.";
AjaxErros['abort'] = "A requisição foi abortada.";
ArquivoErros[1] = "Arquivo não encontrado (erro 1)";
ArquivoErros[2] = "Segurança violada (erro 2)";
ArquivoErros[3] = "Operção abortada (erro 3)";
ArquivoErros[4] = "Arquivo ilegível (erro 4)";
ArquivoErros[5] = "Erro de codificação (erro 5)";
ArquivoErros[6] = "Modificações não permitidas (erro 6)";
ArquivoErros[7] = "Status inválido (erro 7)";
ArquivoErros[8] = "Erro de Sintaxe (erro 8)";
ArquivoErros[9] = "Modificação inválida (erro 9)";
ArquivoErros[10] = "Quota excedida (erro 10)";
ArquivoErros[11] = "Tipo incompatível (erro 11)";
ArquivoErros[12] = "Endereço duplicado (erro 12)";

$(document).ready(function () {
    thisUser = isLogado();
});
/*Funções*/
function _AoIniciar() {
    /*Bloqueia Drag Drop*/
    $('a, img').on('dragstart', function (event) { event.preventDefault(); });

    /*Remove Is Invalid*/
    $('input').on('blur', onInputBlur);
    $('select').on('blur', onInputBlur);
    $('input[type="radio"]').on('click', onInputBlur);
    $('input[type="checkbox"]').on('click', onInputBlur);

    Pagina = location.href.split('/');
    Pagina = Pagina[Pagina.length - 1];
    
    $('body').fadeIn('slow');
};
function CriaObj(tag, dd) {
    var dds = dd ? dd : {};
    var obj = document.createElement(tag);
    if (dds.classe) { obj.className = dds.classe; }
    if (dds.conteudo) { obj.innerHTML = dds.conteudo; }
    if (dds.value) { obj.value = dds.value; }
    if (dds.titulo) { obj.title = dds.titulo; }
    if (dds.id) { obj.id = dds.id; }
    if (dds.src) { obj.src = dds.src; }
    if (dds.tipo) { obj.type = dds.tipo; }
    if (dds.for) { obj.setAttribute("for", dds.for); }
    if (dds.fBorda) { obj.setAttribute("frameBorder", dds.fBorda); }
    if (dds.nome) { obj.name = dds.nome; }
    if (dds.inputComent) { obj.placeholder = dds.inputComent; }
    return obj;
};
function Erro(dados, msgBts, retorno) {
    var erro = dados.error;
    var msg = new Mensagem();
    msg.setTitulo("Algo deu errado!");
    if (erro == 'net') {
        msg.setTexto('Você precisa estar conectado à internet para continuar.');
    }
    else {
        msg.setTexto(erro);
    }
    if (msgBts) {
        if (msgBts.length > 1) {
            msg.setTipo('confirma');
        }
        msg.setBotoes(msgBts);
    }
    msg.mostrar(retorno);
};
function fechaApp() {
    if (isPlatform("windows")) {
        window.close();
    }
    else {
        navigator.app.exitApp();
    }
};
function getUrlParameter(nome, link) {
    var res = null, tmp = [], url = location.href;
    if (link) { url = link; }
    url.substr(url.indexOf("?") + 1).split("&").forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === nome) { res = decodeURIComponent(tmp[1]); }
    });
    return res;
};
function includeHTML(retorno) {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Arquivo não encontrado"; }
                    elmnt.removeAttribute("include-html");
                    includeHTML(retorno);
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
    retorno();
};
function IsConectado() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Desconhecido';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI] = 'WiFi';
    states[Connection.CELL_2G] = 'Cell 2G';
    states[Connection.CELL_3G] = 'Cell 3G';
    states[Connection.CELL_4G] = 'Cell 4G';
    states[Connection.CELL] = 'Cell generic';
    states[Connection.NONE] = false;

    return states[networkState];
};
function isLogado() {
    var vg = new VarGlobal('thisUser');
    if (vg.obterLocal()) {
        return JSON.parse(vg.obterLocal());
    }
    else {
        return false;
    }
};
function setValByClass(classe, valor) {
    var objs = document.getElementsByClassName(classe);
    for (var i = 0; i < objs.length; i++) {
        objs[i].value = valor;
    }
};
function isPlatform(nome) {
    if (device.platform.toLowerCase() == nome.toLowerCase()) {
        return true;
    }
    return false;
};
function limpaObj(obj, exceto) {
    var filhos = obj.children.length;
    while (obj.lastChild) {
        if (exceto == filhos) {
            break;
        }
        obj.removeChild(obj.lastChild);
        filhos--;
    }
};
/*Classes*/
function Api(url, dados, isLoader) {
    var self = this, IsLoader = true;
    /*Variáveis Públicas*/
    self.url = url;
    self.dados = dados ? dados : {};
    self.isTemporario = true;

    self.dados.retorno = 'json';
    if (thisUser) {
        self.dados.serralheiro_id = thisUser[0].pessoa_id;
    }
    if (isLoader === false) {
        IsLoader = false;
    }
    /*Funções Internas*/
    var criaArquivo = function (nome, retorno, falha) {
        var tipos = [window.TEMPORARY, window.PERSISTENT], tipo = 0;
        var flEr = function (cod) { falha(ArquivoErros[cod.code]); console.log(cod); };
        if (self.isTemporario == false) { tipo = 1; }
        window.requestFileSystem(tipos[tipo], 5 * 1024 * 1024, function (fs) {
            fs.root.getFile(nome, { create: true, exclusive: false }, retorno, flEr);
        }, flEr);
    };
    function isFile(path, retorno) {
        window.resolveLocalFileSystemURL(path, function () { retorno(true); }, function () { retorno(false); });
    };

    /*Funções Externas*/
    self.send = function (retorno) {
        if (IsConectado()) {
            if (IsLoader) {
                Loader.mostrar();
            }
            var ajaxObj = $.ajax({
                cache: false,
                method: "POST",
                url: Servidor + self.url,
                data: self.dados,
                dataType: "json",
                success: function (res) {
                    retorno(res);
                    if (IsLoader) {
                        Loader.remover();
                    }
                },
                error: function (Xhr, Exception) {
                    var msg = new Mensagem(Xhr.responseText, true);
                    var msg = AjaxErros[Xhr.status];
                    if (!msg) { msg = AjaxErros[Exception]; }
                    if (!msg) { msg = Xhr.responseText; }
                    retorno({ 'error': msg + "Motivo " + Xhr.responseText + " url " + Servidor + self.url + " data " + JSON.stringify(self.dados) }); /* -- Remover detalhes do erro*/
                    if (IsLoader) {
                        Loader.remover();
                    }
                }
            });
            if (IsLoader) {
                Loader.onCancelar(function () {
                    ajaxObj.abort();
                });
            }
        }
        else {
            retorno({ 'error': 'net' });
        }
    };
    self.download = function (retorno, loader) {
        var nomeArquivo = getUrlParameter('name', self.url),
            vg = new VarGlobal(self.url),
            baixar = function () {
                if (IsConectado()) {
                    var ReAjax = new XMLHttpRequest();
                    ReAjax.responseType = "blob";
                    ReAjax.onprogress = function (pe) {
                        if (pe.lengthComputable && loader) {
                            loader.value = (pe.loaded / pe.total);
                        }
                    };
                    ReAjax.onerror = function (error) {
                        retorno({ 'error': error.message });
                        console.log(error.message);
                    };
                    ReAjax.onabort = function () {
                        retorno({ 'error': 'Download Abortado' });
                        console.log("Download abortado");
                    };
                    ReAjax.onload = function (r) {
                        criaArquivo(nomeArquivo, function (file) {
                            var obj = r.srcElement.response;
                            var fullPath = file.nativeURL;
                            file.createWriter(function (fileWriter) {
                                var written = 0;
                                var BLOCK_SIZE = 1 * 1024 * 1024;
                                var filesize = obj.size;
                                fileWriter.onwrite = function (evt) {
                                    if (written < filesize) {
                                        fileWriter.doWrite();
                                    } else {
                                        vg.salvarLocal(fullPath);
                                        retorno(fullPath);
                                    }
                                };
                                fileWriter.doWrite = function () {
                                    var sz = Math.min(BLOCK_SIZE, filesize - written);
                                    var sub = obj.slice(written, written + sz);
                                    written += sz;
                                    fileWriter.write(sub);
                                };
                                fileWriter.doWrite();
                            });
                        }, function (erro) { retorno({ 'error': erro }); console.log(erro); });
                    };
                    ReAjax.open("POST", Servidor + self.url, true);
                    ReAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    ReAjax.send('retorno=json');
                }
                else {
                    retorno({ 'error': 'net' });
                }
            };
        if (vg.obterLocal()) {
            isFile(vg.obterLocal(), function (res) {
                if (res) {
                    retorno(vg.obterLocal());
                }
                else {
                    baixar();
                }
            });
        }
        else {
            baixar();
        }
    };
};
function Mensagem(texto, auto) {
    var self = this, Tipo = "alerta", Titulo = "Atenção:", Texto = texto, Botoes = ["ok", "cancelar"];
    /*Funções externas*/
    self.setTipo = function (texto) { Tipo = texto; };
    self.setTexto = function (texto) { Texto = texto; };
    self.setTitulo = function (texto) { Titulo = texto; };
    self.setBotoes = function (array) { Botoes = array; };
    self.mostrar = function (Retorno) {
        switch (Tipo) {
            case "confirma": navigator.notification.confirm(Texto, Retorno, Titulo, Botoes);
                break;
            case "texto": navigator.notification.prompt(Texto, Retorno, Titulo, Botoes);
                break;
            case "alerta":
            default: navigator.notification.alert(Texto, Retorno, Titulo, Botoes);
                break;
        }
    };
    /*Construtor*/
    if (auto) { self.mostrar(); }
};
function VarGlobal(chave) {
    var self = this, Chave = chave;
    /*Funções externas*/
    self.setChave = function (valor) { Chave = valor; };
    self.getChave = function () { return Chave; };
    self.obterSessao = function () {
        return window.sessionStorage.getItem(Chave);
    };
    self.obterLocal = function () {
        return window.localStorage.getItem(Chave);
    };
    self.salvarSessao = function (valor) {
        if (valor) {
            window.sessionStorage.setItem(Chave, valor);
        }
        else {
            window.sessionStorage.removeItem(Chave);
        }
        return valor;
    };
    self.salvarLocal = function (valor) {
        if (valor) {
            window.localStorage.setItem(Chave, valor);
        }
        else {
            window.localStorage.removeItem(Chave);
        }
        return valor;
    };
};
/*Eventos Globais*/
function onBackButtonClick() {
    var menuNav = document.getElementById("menuNav");
    var voltar = function () {
        if (Pagina == 'index.html' || Pagina == 'inicio.html') {
            var msg = new Mensagem("Fechar Projes?");
            msg.setTitulo("Você deseja sair?");
            msg.setBotoes(["Sim", "Não"]);
            msg.setTipo("confirma");
            msg.mostrar(function (res) {
                if (res == 1) {
                    fechaApp();
                }
            });
        }
    };
    if (menuNav) {
        if ($(menuNav).hasClass('ativo')) {
            onMenuButtonClick();
        }
        else {
            voltar();
        }
    }
    else {
        voltar();
    }
};
function onInputBlur() {
    if (this) {
        if ($(this).hasClass('is-invalid')) {
            $(this).removeClass('is-invalid');
        }
        else if ($(this.parentNode).hasClass('is-invalid')) {
            $(this.parentNode).removeClass('is-invalid');
        }
        else if ($(this.parentNode.parentNode).hasClass('is-invalid')) {
            $(this.parentNode.parentNode).removeClass('is-invalid');
        }
    }
};