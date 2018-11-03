"use strict";
(function () {
    /*Variáveis Locais*/

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        if (thisUser) {
            includeHTML(function () {
                // Manipular eventos de pausa e retomada do Cordova
                document.addEventListener('pause', onPause.bind(this), false);
                document.addEventListener('resume', onResume.bind(this), false);
                document.addEventListener("backbutton", onBackButtonClick, false);

                btNovo.addEventListener("click", btNovoClick, false);
                btVoltar.addEventListener("click", btVoltarClick, false);
                
                _AoIniciar();
                calcPlacares();
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
    function calcPlacares() {
        var vg = new VarGlobal("lideres"), hj = new Date();
        if (vg.obterLocal()) {
            lideres = JSON.parse(vg.obterLocal());
        }
        if (lideres.length > 0) {
            for (var key in lideres) {
                var tr = CriaObj("tr"), tdNum = CriaObj("td", { conteudo: (Number(key) + 1) + "º"
            }),
                    tdNm = CriaObj('td', { conteudo: lideres[key].nm }),
                    tdPtos = CriaObj('td', { conteudo: lideres[key].pt }),
                    tdDt = CriaObj('td', { conteudo: lideres[key].dt });

                tr.appendChild(tdNum);
                tr.appendChild(tdNm);
                tr.appendChild(tdPtos);
                tr.appendChild(tdDt);
                tabResus.appendChild(tr);
            }
        }
        else {
            tabResus.innerHTML = "<tr><td colspan='4' class='text-center'>Nenhuma Pontuação Encontrada :/</td></tr>";
        }
        $(divResultados).fadeIn("slow");
    };
    /*Eventos*/
    function btNovoClick() {
        location.href = "perguntas.html";
    };
    function btVoltarClick() {
        location.href = "painel.html";
    };
} )();