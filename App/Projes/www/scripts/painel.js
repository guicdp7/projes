"use strict";
(function () {

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        if (thisUser) {
            includeHTML(function () {
                // Manipular eventos de pausa e retomada do Cordova
                document.addEventListener('pause', onPause.bind(this), false);
                document.addEventListener('resume', onResume.bind(this), false);
                document.addEventListener("backbutton", onBackButtonClick, false);

                btNovo.addEventListener('click', btNovoClick, false);
                btPlacar.addEventListener('click', btPlacarClick, false);
                btSair.addEventListener('click', btSairClick, false);

                tbNomeUser.innerHTML = thisUser.nome;
                if (!thisUser.recorde) {
                    thisUser.recorde = 0;
                }
                if (thisUser.recorde == 0) {
                    pRecorde.style.display = "none";
                }

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
    /*Eventos*/
    function btNovoClick() {
        location.href = "perguntas.html";
    };
    function btPlacarClick() {

    };
    function btSairClick() {
        logOut();
    };
} )();