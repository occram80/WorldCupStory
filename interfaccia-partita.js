// ==========================================
// INTERFACCIA PARTITA - REGISTA DEL MATCH LIVE
// ==========================================

// STATO DELLA PARTITA IN CORSO
let partitaAttiva = false;
let timerPartitaId = null;
let minutoAttuale = 0;

let punteggioCasa = 0;
let punteggioFuori = 0;


// DATI DINAMICI DEI GIOCATORI IN PARTITA (CON ENERGIA)
let giocatoriCasaLive = []; 
// Se non è ancora definito altrove, lo inizializziamo in sicurezza senza bloccare il browser
if (typeof giocatoriFuoriLive === 'undefined') {
    window.giocatoriFuoriLive = [];
}

// GESTIONE CAMBI CORRENTI
let giocatoreDaSostituireIndex = null;

// ==========================================
// 1. FASE PRE-MATCH: ENTRA NELLO STADIO
// ==========================================
function preparaMatchLive(nomeCasa, nomeFuori) {
    squadraCasaNome = nomeCasa;
    squadraFuoriNome = nomeFuori;
    minutoAttuale = 1;
    punteggioCasa = 0;
    punteggioFuori = 0;
    partitaAttiva = false; // Ferma finché non si clicca su Inizia Partita
    giocatoreDaSostituireIndex = null;

    // Reset grafico completo del tabellone
    document.getElementById('live-casa-nome').innerText = squadraCasaNome;
    document.getElementById('live-fuori-nome').innerText = squadraFuoriNome;
    document.getElementById('live-risultato').innerText = "0 - 0";
    document.getElementById('live-cronometro').innerText = "00:00 (1')";
    document.getElementById('live-marcatori-casa').innerHTML = "";
    document.getElementById('live-marcatori-fuori').innerHTML = "";
    
    // Ripristina e mostra il bottone verde di inizio partita
    const btnInizio = document.getElementById('btn-inizio-partita');
    if (btnInizio) {
        btnInizio.style.display = "inline-block";
        btnInizio.disabled = false;
        btnInizio.innerText = "▶️ INIZIA PARTITA";
        btnInizio.style.background = "#28a745";
    }

    // Messaggio di benvenuto negli spogliatoi
    document.getElementById('live-box-cronaca').innerHTML = `
        <div style="color: #aaa; font-style: italic;">Siamo negli spogliatoi. Le squadre stanno ultimando il riscaldamento sul terreno di gioco...</div>
        <div style="color: #ffcc00; margin-top: 8px; font-weight: bold;">⚠️ Controlla la tua formazione e la panchina, poi clicca "INIZIA PARTITA" per il fischio d'inizio!</div>
    `;

    // Transizione: Nascondi il girone e mostra la partita live
    document.getElementById('schermata-mio-girone').style.display = 'none';
    document.getElementById('schermata-partita-live').style.display = 'block';

    // 🤖 CHIAMATA ALL'ENGINE: Carica e prepara la CPU dal database prima di renderizzare
    if (typeof preparaMatchLiveEngine === 'function') {
        preparaMatchLiveEngine(nomeCasa, nomeFuori);
    }

    // POPOLA TITOLARI E PANCHINA REALI DAL DRAFT
    renderizzaGiocatoriInPartita();
}
// ==========================================
// NUOVA FUNZIONE: DISEGNA LA ROSA SEGUENDO L'ORDINE VISIVO DEL MODULO E REPARTO PANCHINA
// ==========================================
function renderizzaGiocatoriInPartita() {
    const boxTitolari = document.getElementById('live-lista-titolari');
    const boxPanchina = document.getElementById('live-lista-panchina');
    
    if (!boxTitolari || !boxPanchina) return;
    
    boxTitolari.innerHTML = "";
    boxPanchina.innerHTML = "";

    let mieiGiocatori = [];
    if (typeof rosaGiocatoreOggetti !== 'undefined') {
        mieiGiocatori = rosaGiocatoreOggetti;
    } else if (typeof window.rosaGiocatoreOggetti !== 'undefined') {
        mieiGiocatori = window.rosaGiocatoreOggetti;
    }

    if (mieiGiocatori && mieiGiocatori.length > 0) {
        
        // 1. SEPARAZIONE TRA CAMPO E PANCHINA
        let titolariReali = mieiGiocatori.filter(g => g.schieramento === "campo");
        let panchinaReale = mieiGiocatori.filter(g => g.schieramento === "panchina");

        // 🔥 RECUPERA L'ORDINE DEGLI SLOT DAL CAMPO DA GIOCO REALE
        const nodiSlotCampo = Array.from(document.querySelectorAll('.omino-giocatore'));
        const ordineIdSlot = nodiSlotCampo.map(slot => slot.id || slot.dataset.id);

        // 🎯 ORDINA I TITOLARI IN BASE A COME APPAIONO GLI SLOT NEL CAMPO
        titolariReali.sort((a, b) => {
            let indiceA = ordineIdSlot.indexOf(a.idSlot);
            let indiceB = ordineIdSlot.indexOf(b.idSlot);
            
            if (indiceA === -1) indiceA = 99;
            if (indiceB === -1) indiceB = 99;
            
            return indiceA - indiceB;
        });

        // 🎯 ORDINA LA PANCHINA PER MACRO-REPARTI (POR -> DIF -> CEN -> ATT)
        const prioritaReparti = { 
            "POR": 1, 
            "DIF": 2, "TER": 2, 
            "MED": 3, "CEN": 3, "EST": 3, "COC": 3, 
            "ALA": 4, "ATT": 4 
        };
        
        panchinaReale.sort((a, b) => {
            let ruoloA = Array.isArray(a.ruolo) ? a.ruolo[0] : a.ruolo;
            let ruoloB = Array.isArray(b.ruolo) ? b.ruolo[0] : b.ruolo;
            
            let pesoA = prioritaReparti[ruoloA] || 99;
            let pesoB = prioritaReparti[ruoloB] || 99;

            if (pesoA !== pesoB) {
                return pesoA - pesoB;
            }
            return 0; // Se stesso reparto, mantiene l'ordine cronologico di scelta
        });

        // 2. STAMPA DEI TITOLARI ORDINATI (CON ENERGIA REALE / RESISTENZA DI PARTENZA)
        titolariReali.forEach((giocatore) => {
            // 🔥 Se energiaAttuale non esiste o non è ancora impostata, usa la resistenza nativa (es. 88, 92, ecc.)
            if (typeof giocatore.energiaAttuale === 'undefined' || giocatore.energiaAttuale === null) {
                giocatore.energiaAttuale = giocatore.res || 100;
            }
            
            let energiaNum = Math.round(giocatore.energiaAttuale);
            
            // Calcola il modificatore dinamico tattico (+3, +2, -1...) basato sull'energia corrente
            let testoModificatore = "";
            if (typeof calcolaModificatoreEnergia === 'function') {
                let mod = calcolaModificatoreEnergia(energiaNum);
                testoModificatore = mod >= 0 ? `(+${mod})` : `(${mod})`;
            }

            let htmlGiocatore = `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #111125; padding: 8px 10px; border-radius: 5px; font-size: 0.85rem; border: 1px solid #1f1f3d; box-shadow: inset 0 0 5px rgba(0,0,0,0.5);">
                    <span style="color: #00f2ff; font-weight: bold; font-family: monospace; width: 35px;">${giocatore.ruoloDinamico}</span>
                    <span style="flex: 1; color: white; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-left: 5px;">${giocatore.nome}</span>
                    <span style="color: #ffcc00; font-weight: bold; font-family: monospace; font-size: 0.8rem; background: #000; padding: 2px 6px; border-radius: 3px;">⚡${energiaNum} <span style="font-size: 0.7rem; color: #aaa; margin-left: 2px;">${testoModificatore}</span></span>
                </div>
            `;
            boxTitolari.innerHTML += htmlGiocatore;
        });

        // 3. STAMPA DELLA PANCHINA ORDINATA PER REPARTO
        panchinaReale.forEach((giocatore) => {
            let ruoloNativo = Array.isArray(giocatore.ruolo) ? giocatore.ruolo[0] : giocatore.ruolo;
            
            if (typeof giocatore.energiaAttuale === 'undefined' || giocatore.energiaAttuale === null) {
                giocatore.energiaAttuale = giocatore.res || 100;
            }
            let energiaNum = Math.round(giocatore.energiaAttuale);

            let htmlGiocatore = `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #111125; padding: 8px 10px; border-radius: 5px; font-size: 0.85rem; border: 1px solid #1f1f3d; box-shadow: inset 0 0 5px rgba(0,0,0,0.5);">
                    <span style="color: #aaa; font-weight: bold; font-family: monospace; width: 35px;">${ruoloNativo}</span>
                    <span style="flex: 1; color: #aaa; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-left: 5px;">${giocatore.nome}</span>
                    <span style="color: #ffcc00; font-weight: bold; font-family: monospace; font-size: 0.8rem; background: #000; padding: 2px 6px; border-radius: 3px;">⚡${energiaNum}</span>
                </div>
            `;
            boxPanchina.innerHTML += htmlGiocatore;
        });

    } else {
        boxTitolari.innerHTML = `<div style="color:#555; text-align:center; font-style:italic; font-size:0.85rem; padding-top:10px;">Nessun titolare - Fai il Draft</div>`;
        boxPanchina.innerHTML = `<div style="color:#555; text-align:center; font-style:italic; font-size:0.85rem; padding-top:10px;">Panchina vuota</div>`;
    }
}

// ==========================================
// 2. FASE MATCH LIVE: IL GIOCATORE CLICCA PLAY
// ==========================================
function startCronometroPartita() {
    const btnInizio = document.getElementById('btn-inizio-partita');
    if (btnInizio) {
        btnInizio.disabled = true;
        btnInizio.style.background = "#444";
        btnInizio.innerText = "⌛ MATCH IN CORSO...";
    }

    partitaAttiva = true;
    
    const boxCronaca = document.getElementById('live-box-cronaca');
    boxCronaca.innerHTML = `<div style="color: #00f2ff; font-weight: bold;">🏁 L'arbitro controlla il cronometro... Fischia l'inizio! SI PARTE!</div>`;

    // --- AGGIUNTA: RESET GRAFICO DEI MARCATORI ---
    // Svuota la lista dei gol della partita precedente all'avvio del nuovo match
    document.getElementById('live-marcatori-casa').innerHTML = "";
    document.getElementById('live-marcatori-fuori').innerHTML = "";

    // Fai partire il ciclo temporizzato (1.3 secondi reali = 1 minuto di gioco)
    clearInterval(timerPartitaId);
    timerPartitaId = setInterval(cicloMinutoPartita, 1300);
}

// ==========================================
// 3. IL TIMER: COSA SUCCEDE OGNI 1.3 SECONDI (AGGIORNATO CON ENGINE REALE)
// ==========================================
function cicloMinutoPartita() {
    if (!partitaAttiva) return;

    minutoAttuale++;

    // 🔋 FUNZIONE INTERNA: Calcola il consumo in base al ruolo dinamico sul campo
    const calcolaConsumoRuolo = (ruolo) => {
        switch (ruolo) {
            case "POR": return 0.1;  // Il portiere non si stanca quasi mai
            case "DIF":
            case "TER": return 0.55; // Difesa di posizione
            case "ALA":
            case "ATT": return 0.7;  // Scatti e fiammate offensive
            case "CEN":
            case "MED":
            case "EST":
            case "COC": return 0.85; // I motori del centrocampo (consumo massimo)
            default: return 0.7;     // Fallback standard
        }
    };

    // 🔋 CALO ENERGIA DEI GIOCATORI IN CAMPO (UTENTE)
    if (typeof rosaGiocatoreOggetti !== 'undefined' && rosaGiocatoreOggetti.length > 0) {
        rosaGiocatoreOggetti.forEach(g => {
            if (g.schieramento === "campo" && typeof g.energiaAttuale !== 'undefined') {
                let consumo = calcolaConsumoRuolo(g.ruoloDinamico);
                g.energiaAttuale = Math.max(0, g.energiaAttuale - consumo);
            }
        });
    }
    
    // 🔋 CALO ENERGIA DEI GIOCATORI IN CAMPO (CPU)
    if (typeof giocatoriFuoriLive !== 'undefined' && giocatoriFuoriLive.length > 0) {
        giocatoriFuoriLive.forEach(g => {
            if (g.schieramento === "campo" && typeof g.energiaAttuale !== 'undefined') {
                let consumo = calcolaConsumoRuolo(g.ruoloDinamico);
                g.energiaAttuale = Math.max(0, g.energiaAttuale - consumo);
            }
        });
    }

    // 🔄 Aggiorna l'interfaccia grafica per mostrare l'energia che cala sui tuoi omini
    if (typeof renderizzaGiocatoriInPartita === 'function') {
        renderizzaGiocatoriInPartita();
    }

    // Aggiorna l'orologio visivo del tabellone
    let secondiFinti = Math.floor((minutoAttuale * 1.3) % 60).toString().padStart(2, '0');
    let minutesFinti = Math.floor((minutoAttuale * 1.3) / 60).toString().padStart(2, '0');
    document.getElementById('live-cronometro').innerText = `${minutesFinti}:${secondiFinti} (${minutoAttuale}')`;

    // 🎯 CHIAMATA ALL'ENGINE REALE: Calcola si c'è un'azione in questo minuto
    if (typeof eseguiCalcoloMinutoPartita === 'function') {
        let azioneReale = eseguiCalcoloMinutoPartita(minutoAttuale);
        
        if (azioneReale) {
            const box = document.getElementById('live-box-cronaca');
            
            if (azioneReale.isGol) {
                // Aggiorna i gol reali del tabellone usando le tue variabili globali
                if (azioneReale.squadra === squadraCasaNome) {
                    golCasa++;
                    
                    // --- AGGIUNTA: STAMPA MARCATORE CASA ---
                    const marcatore = azioneReale.marcatore || azioneReale.autore || "Gol";
                    const divCasa = document.getElementById('live-marcatori-casa');
                    divCasa.innerHTML += `<div>${marcatore} (${minutoAttuale}')</div>`;
                } else {
                    golFuori++;
                    
                    // --- AGGIUNTA: STAMPA MARCATORE FUORI ---
                    const marcatore = azioneReale.marcatore || azioneReale.autore || "Gol";
                    const divFuori = document.getElementById('live-marcatori-fuori');
                    divFuori.innerHTML += `<div>${marcatore} (${minutoAttuale}')</div>`;
                }
                document.getElementById('live-risultato').innerText = `${golCasa} - ${golFuori}`;
                box.innerHTML += `<div style="color: #ffcc00; font-weight: bold; margin-bottom: 4px;">[${minutoAttuale}'] ${azioneReale.cronaca}</div>`;
            } else {
                box.innerHTML += `<div style="color: white; margin-bottom: 4px;">[${minutoAttuale}'] ${azioneReale.cronaca}</div>`;
            }
            box.scrollTop = box.scrollHeight;
        }
    }

    // FISCHIO FINALE AL 90° MINUTO
    if (minutoAttuale >= 90) {
        clearInterval(timerPartitaId);
        partitaAttiva = false;
        
        // Nascondiamo il bottone della partita in corso perché il match è finito
        const btnInizio = document.getElementById('btn-inizio-partita');
        if (btnInizio) btnInizio.style.display = "none";
        
        const boxCronaca = document.getElementById('live-box-cronaca');
        boxCronaca.innerHTML += `<div style="color: #ffcc00; font-weight: bold; margin-top: 10px; border-top: 1px solid #333; padding-top: 5px;">🔴 TRIPLICE FISCHIO! Partita terminata. Risultato finale: ${squadraCasaNome} ${golCasa} - ${golFuori} ${squadraFuoriNome}</div>`;
        boxCronaca.scrollTop = boxCronaca.scrollHeight; // Auto-scroll in fondo alla telecronaca
        
        alert(`Partita Conclusa! ${squadraCasaNome} ${golCasa} - ${golFuori} ${squadraFuoriNome}`);

        // --- ATTIVAZIONE TASTO REGISTRAZIONE E RIENTRO (AGGIUNTO) ---
        const boxFine = document.getElementById('box-fine-partita');
        if (boxFine) {
            boxFine.style.display = "block";
        }
    }
}
// ==========================================
// CALCOLO MODIFICATORE ENERGIA (BONUS/MALUS TATTICO)
// ==========================================
function calcolaModificatoreEnergia(energia) {
    if (energia >= 75) {
        return 3;   // Da 100 a 75: +3 (Al massimo)
    } else if (energia >= 60) {
        return 2;   // Da 74 a 60: +2 (Lucido)
    } else if (energia >= 50) {
        return 1;   // Da 59 a 50: +1 (Inizio stanchezza)
    } else if (energia >= 35) {
        return -1;  // Da 49 a 35: -1 (Affannato)
    } else if (energia >= 25) {
        return -2;  // Da 34 a 25: -2 (Stanco)
    } else {
        return -3;  // Da 24 a 0: -3 (Sfinito / Da sostituire)
    }
}// ==========================================
// CONTA GLI ATTACCANTI IN CAMPO PER IL BONUS
// ==========================================
function ottieniBonusModuloAttaccoUtente() {
    // Filtra quanti giocatori in campo hanno un ruolo offensivo nello schema
    let numeroAttaccanti = rosaGiocatoreOggetti.filter(g => 
        g.schieramento === "campo" && (g.ruoloDinamico === "ATT" || g.ruoloDinamico === "ALA")
    ).length;

    if (numeroAttaccanti === 1) return -1;
    if (numeroAttaccanti === 2) return 0;
    if (numeroAttaccanti === 3) return 1;
    if (numeroAttaccanti >= 4) return 2;
    return 0; // Fallback di sicurezza
}

// ==========================================
// CONTA I DIFENSORI IN CAMPO PER IL BONUS
// ==========================================
function ottieniBonusModuloDifesaUtente() {
    // Filtra quanti giocatori in campo hanno un ruolo difensivo nello schema
    let numeroDifensori = rosaGiocatoreOggetti.filter(g => 
        g.schieramento === "campo" && (g.ruoloDinamico === "DIF" || g.ruoloDinamico === "TER")
    ).length;

    if (numeroDifensori < 3) return -1;
    if (numeroDifensori === 3 || numeroDifensori === 4) return 0;
    if (numeroDifensori >= 5) return 1;
    return 0; // Fallback di sicurezza
}

// ==========================================
// REGISTRA IL RISULTATO DEL MATCH E TORNA AL GIRONE (AGGIORNATA CON SIMULAZIONE CPU)
// ==========================================
function salvaPartitaETornaAlGirone() {
    const casa = squadraCasaNome;
    const fuori = squadraFuoriNome;

    // 1. AGGIORNA IL CALENDARIO GLOBAL (Partita Utente)
    let partitaTrovata = false;
    for (let g of calendario) {
        for (let p of g.partite) {
            if (p.casa === casa && p.fuori === fuori && !p.giocata) {
                p.golCasa = golCasa;
                p.golFuori = golFuori;
                p.giocata = true;
                partitaTrovata = true;
                break;
            }
        }
        if (partitaTrovata) break;
    }

    // 2. AGGIORNA LA CLASSIFICA GLOBAL (Partita Utente)
    if (classifica[casa] && classifica[fuori]) {
        classifica[casa].giocate += 1;
        classifica[fuori].giocate += 1;
        classifica[casa].golFatti += golCasa;
        classifica[casa].golSubiti += golFuori;
        classifica[fuori].golFatti += golFuori;
        classifica[fuori].golSubiti += golCasa;

        if (golCasa > golFuori) {
            classifica[casa].punti += 3;
        } else if (golFuori > golCasa) {
            classifica[fuori].punti += 3;
        } else {
            classifica[casa].punti += 1;
            classifica[fuori].punti += 1;
        }
    }

    // --- AGGIUNTA: SIMULA LE ALTRE MATCH DELLA GIORNATA ---
    if (typeof simulaPartiteCPU === 'function') {
        simulaPartiteCPU();
    }

    // --- AGGIUNTA: AVANZA LA GIORNATA DEL TORNEO ---
    giornataCorrente += 1; 

    // 4. CAMBIO INTERFACCIA GRAFICA
    const schermataLive = document.getElementById('schermata-partita-live');
    const schermataGirone = document.getElementById('schermata-mio-girone');
    
    if (schermataLive) schermataLive.style.display = 'none';
    if (schermataGirone) schermataGirone.style.display = 'block';

    const boxFine = document.getElementById('box-fine-partita');
    const btnInizio = document.getElementById('btn-inizio-partita');
    if (boxFine) boxFine.style.display = 'none';
    if (btnInizio) {
        btnInizio.style.display = 'inline-block';
        btnInizio.disabled = false;
        btnInizio.style.background = "#28a745";
        btnInizio.innerText = "▶️ INIZIA PARTITA";
    }

    // 5. REFRESH GRAFICO DEL GIRONE (Ora mostrerà tutto aggiornato!)
    renderizzaClassifica();
    renderizzaCalendario();
}