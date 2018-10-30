"use strict";
(function () {
    /*Variáveis Locais*/
    var pergs = [], pergAtual = 0;

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        if (thisUser) {
            includeHTML(function () {
                // Manipular eventos de pausa e retomada do Cordova
                document.addEventListener('pause', onPause.bind(this), false);
                document.addEventListener('resume', onResume.bind(this), false);
                document.addEventListener("backbutton", onBackButtonClick, false);

                formPergunta.addEventListener('submit', formPerguntaSubmit, false);

                pergs = Perguntas;
                pergs.sort(sortFun);

                proxPergunta();
                _AoIniciar();
            });
        }
        else {
            location.href = "index.html";
        }
    };

    function onPause() {
        // TODO: este aplicativo foi suspenso. Salve o estado do aplicativo aqui.
    };

    function onResume() {
        // TODO: este aplicativo foi reativado. Restaure o estado do aplicativo aqui.
    };

    function proxPergunta() {
        $(formPergunta).fadeOut("slow",
            function () {
                tbPergunta.innerHTML = pergs[pergAtual][0];
                var pCerta = Math.floor(Math.random() * 4 + 1), resps = [0,1,2,3];
                resps.sort(sortFun);
                for (var i = 0; i < resps.length; i++) {
                    var dds = pergs[pergAtual][1][i], certa = 0;
                    if (resps[i] == 3) {
                        dds = pergs[pergAtual][2];
                        certa = 1;
                    }
                    document.getElementById("lbr" + (i + 1)).innerHTML = dds;
                    document.getElementById("resposta-" + (i + 1)).value = certa;
                }
                $(formPergunta).fadeIn("slow");
                pergAtual++;
            });
    };
    /*Eventos*/
    function formPerguntaSubmit(e) {
        e.preventDefault();
        var ck = getRadioChecked(this.id, "resposta");
        if (ck.value == "1") {
            proxPergunta();
        }
        else {
            var msg = new Mensagem("Resposta Errada !", true);
        }
    };
} )();