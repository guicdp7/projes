﻿"use strict";
(function () {

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        if (!thisUser) {
            includeHTML(function () {
                // Manipular eventos de pausa e retomada do Cordova
                document.addEventListener('pause', onPause.bind(this), false);
                document.addEventListener('resume', onResume.bind(this), false);
                document.addEventListener("backbutton", onBackButtonClick, false);

                formJogar.addEventListener('submit', formJogarSubmit, false);

                _AoIniciar();
            });
        }
        else {
            location.href = "painel.html";
        }
    };

    function onPause() {
        // TODO: este aplicativo foi suspenso. Salve o estado do aplicativo aqui.
    };

    function onResume() {
        // TODO: este aplicativo foi reativado. Restaure o estado do aplicativo aqui.
    };
    /*Eventos*/
    function formJogarSubmit(e) {
        e.preventDefault();
        thisUser = { nome: formJogar.nome.value };
        setLogin(thisUser);
        location.href = "painel.html";
    };
} )();