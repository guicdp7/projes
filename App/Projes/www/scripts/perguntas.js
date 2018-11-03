"use strict";
(function () {
    /*Variáveis Locais*/
    var pergs = [], pergAtual = 0, userResps = [];

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
                formPergunta.addEventListener('submit', formPerguntaSubmit, false);

                $(".form-check-input").change(radChange);

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
                window.scroll(0, 0);
                if (pergAtual < 10) {
                    btVerifica.style.display = "none";
                    tbPergunta.innerHTML = (pergAtual + 1) + "/10 " + pergs[pergAtual][0];
                    var pCerta = Math.floor(Math.random() * 4 + 1), resps = [], ltrs = ["a", "b", "c", "d"];

                    for (var i = 0; i < 4; i++) {
                        var nAleat = Math.floor(Math.random() * 4 + 0);
                        if (resps.indexOf(nAleat) == -1) {
                            resps.push(nAleat);
                            var dds = pergs[pergAtual][1][resps[i]], certa = 0;
                            if (resps[i] == 3) {
                                dds = pergs[pergAtual][2];
                                certa = 1;
                            }
                            var lbr = document.getElementById("lbr" + (i + 1)),
                                resposta = document.getElementById("resposta-" + (i + 1));
                            lbr.innerHTML = ltrs[i] + ") " + dds;
                            resposta.value = certa;
                            resposta.checked = false;
                            resposta.setAttribute("data-alter", resps[i]);
                        }
                        else {
                            i--;
                        }
                    }
                    $(formPergunta).fadeIn("slow");
                    pergAtual++;
                }
                else {
                    var totalPtos = 0;
                    for (var i = 0; i < userResps.length; i++) {
                        var tr = CriaObj("tr"), tdNum = CriaObj("td", { conteudo: i + 1 }),
                            tdSt = CriaObj('td', { conteudo: userResps[i].st == 0 ? "Errou" : "Acertou" }),
                            tdPtos = CriaObj('td', { conteudo: userResps[i].pt });

                        totalPtos += Number(userResps[i].pt);

                        tr.appendChild(tdNum);
                        tr.appendChild(tdSt);
                        tr.appendChild(tdPtos);
                        tabResus.appendChild(tr);
                    }
                    totalPtos = Number(totalPtos).toFixed(2);
                    spPontos.innerHTML = totalPtos;
                    if (thisUser.recorde < Number(totalPtos)) {
                        thisUser.recorde = totalPtos;
                        setLogin(thisUser);
                        h3Desc.innerHTML = "Parabêns, você possui um novo recorde!";
                    }
                    var vg = new VarGlobal("lideres"), hj = new Date();
                    if (vg.obterLocal()) {
                        lideres = JSON.parse(vg.obterLocal());
                    }
                    var data = { "pt": totalPtos, "nm": thisUser.nome, "dt": hj.getDate() + "/" + (hj.getMonth() + 1) + "/" + hj.getFullYear() };
                    if (lideres.length == 0) {
                        lideres.push(data);
                    }
                    else {
                        var add = false;
                        for (var i = 0; i < lideres.length; i++) {
                            if (Number(lideres[i].pt) < Number(totalPtos)) {
                                add = true;
                                lideres.splice(i, 0, data);
                                break;
                            }
                        }
                        if (add == false) {
                            lideres.push(data);
                        }
                    }
                    vg.salvarLocal(JSON.stringify(lideres));
                    $(divResultados).fadeIn("slow");
                }
            });
    };
    /*Eventos*/
    function formPerguntaSubmit(e) {
        e.preventDefault();
        var ck = getRadioChecked(this.id, "resposta");
        if (pergAtual < 10) {
            var alt = ck.getAttribute("data-alter");

            var nChar = pergs[pergAtual][0].length;
            var nPtos = ck.value == 0 ? ((pergs[pergAtual][1][alt].length / nChar) / 4) : (pergs[pergAtual][2].length / nChar);

            userResps.push({
                "st": ck.value,
                "at": alt,
                'pt': Number(nPtos).toFixed(2)
            });
        }
        proxPergunta();
    };
    function radChange() {
        $("#btVerifica").fadeIn("slow");
        btVerifica.focus();
    };
    function btNovoClick() {
        location.href = "perguntas.html";
    };
    function btVoltarClick() {
        location.href = "painel.html";
    };
} )();