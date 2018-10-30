"use strict";
/*Variáveis Globais*/
var Pagina, thisUser = false, Perguntas = [
    ["Qual a ordem das camadas em uma tecnologia em camadas?",
        ["Processos - Métodos - Ferramentas - Foco na Qualidade",
            "Métodos - Processos - Ferramentas - Foco na Qualidade",
            "Foco na Qualidade - Métodos - Processos - Ferramentas"], "Foco na Qualidade - Processos - Métodos - Ferramentas"],
    ["“Declaração de serviços que o sistema deve fornecer, como o sistema deve reagir a entradas específicas e como o sistema deve se comportar em determinadas situações”. A informação acima está descrevendo que tipo de requisito?",
        ["Requisito não funcional",
            "Requisito de usuário",
            "Requisito de sistema"], "Requisito funcional"],
    ["“Um documento estruturado estabelecendo descrições detalhadas das funções, serviços e restrições operacionais do sistema. Define o que deve ser implementado e assim, pode ser parte de um contrato entre o cliente e o desenvolvedor”. A informação acima está descrevendo que tipo de requisito?",
        ["Requisito funcional",
            "Requisito de usuário",
            "Requisito de sistema"], "Requisito não funcional"]
];

/*Atribuições Globais*/
function sortFun(a, b) { return a > b ? true : false; };
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

    switch (Pagina.replace(".html", "")) {
        case "painel": appTitulo.innerHTML = "Bem vindo(a) " + thisUser.nome + "!"; break;
    }
    
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
function getRadioChecked(formId, name) {
    var rads = $('#' + formId + ' input[name="' + name + '"]');
    for (var i = 0; i < rads.length; i++) {
        if (rads[i].checked) {
            return rads[i];
        }
    }
    return null;
};
function includeHTML(retorno) {
    var z, i = 0, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    var varrerTags = function (elmnt) {
        if (i < z.length) {
            file = elmnt.getAttribute("include-html");
            if (file) {
                lerArquivo(file, function (res) {
                    elmnt.innerHTML = res;
                    i++;
                    varrerTags(z[i]);
                });
                elmnt.removeAttribute("include-html");
            }
            else {
                i++;
                varrerTags(z[i]);
            }
        }
        else {
            retorno();
        }
    };
    varrerTags(z[i]);
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
        thisUser = JSON.parse(vg.obterLocal());
        return thisUser;
    }
    else {
        return false;
    }
};
function lerArquivo(arquivo, retorno) {
    var res = "";
    if (arquivo) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) { res = this.responseText; }
                if (this.status == 404) { res = "Arquivo não encontrado"; }
                retorno(res);
            }
        }
        xhttp.open("GET", arquivo, true);
        xhttp.send();
        return;
    }
};
function setLogin(data) {
    var vg = new VarGlobal('thisUser');
    vg.salvarLocal(JSON.stringify(data));
    thisUser = data;
    return data;
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
function logOut() {
    var vg = new VarGlobal('thisUser');
    vg.salvarLocal(null);
    thisUser = null;
    location.href = "index.html";
    return null;
}
/*Classes*/
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
    var voltar = function () {
        if (Pagina == 'index.html' || Pagina == 'painel.html') {
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
        else {
            history.go(-1);
        }
    };
    voltar();
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