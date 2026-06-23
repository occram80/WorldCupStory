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
let giocatoriFuoriLive = [];

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

    // POPOLA TITOLARI E PANCHINA REALI DAL DRAFT
    renderizzaGiocatoriInPartita();
}

// ==========================================
// NUOVA FUNZIONE: DISEGNA LA TUA ROSA A SCHERMO (AGGIORNATA)
// ==========================================
function renderizzaGiocatoriInPartita() {
    const boxTitolari = document.getElementById('live-lista-titolari');
    const boxPanchina = document.getElementById('live-lista-panchina');
    
    if (!boxTitolari || !boxPanchina) return;
    
    boxTitolari.innerHTML = "";
    boxPanchina.innerHTML = "";

    // Recuperiamo gli oggetti controllando anche l'oggetto window per via dell'HTML in fondo
    let mieiGiocatori = [];
    if (typeof rosaGiocatoreOggetti !== 'undefined') {
        mieiGiocatori = rosaGiocatoreOggetti;
    } else if (typeof window.rosaGiocatoreOggetti !== 'undefined') {
        mieiGiocatori = window.rosaGiocatoreOggetti;
    }

   

    // Se la rosa esiste, la stampiamo graficamente nei riquadri dedicati
    if (mieiGiocatori && mieiGiocatori.length > 0) {
        mieiGiocatori.forEach((giocatore, index) => {
            
            // Estrae la stringa del ruolo (se è un array tipo ["DIF", "TER"] prende il primo)
            let ruoloVisivo = Array.isArray(giocatore.ruolo) ? giocatore.ruolo[0] : giocatore.ruolo;

            let htmlGiocatore = `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #111125; padding: 8px 10px; border-radius: 5px; font-size: 0.85rem; border: 1px solid #1f1f3d; box-shadow: inset 0 0 5px rgba(0,0,0,0.5);">
                    <span style="color: #00f2ff; font-weight: bold; font-family: monospace; width: 35px;">${ruoloVisivo}</span>
                    <span style="flex: 1; color: white; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-left: 5px;">${giocatore.nome}</span>
                    <span style="color: #ffcc00; font-weight: bold; font-family: monospace; font-size: 0.8rem; background: #000; padding: 2px 6px; border-radius: 3px;">⚡100</span>
                </div>
            `;

            if (index < 11) {
                // I primi 11 vanno negli 11 in campo
                boxTitolari.innerHTML += htmlGiocatore;
            } else {
                // I restanti 7 vanno in panchina
                boxPanchina.innerHTML += htmlGiocatore;
            }
        });
    } else {
        // Fallback di cortesia se carichi la schermata senza draft
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

    // Fai partire il ciclo temporizzato (1.3 secondi reali = 1 minuto di gioco)
    clearInterval(timerPartitaId);
    timerPartitaId = setInterval(cicloMinutoPartita, 1300);
}

// ==========================================
// 3. IL TIMER: COSA SUCCEDE OGNI 1.3 SECONDI
// ==========================================
function cicloMinutoPartita() {
    if (!partitaAttiva) return;

    minutoAttuale++;

    // Aggiorna l'orologio visivo del tabellone
    let secondiFinti = Math.floor((minutoAttuale * 1.3) % 60).toString().padStart(2, '0');
    let minutesFinti = Math.floor((minutoAttuale * 1.3) / 60).toString().padStart(2, '0');
    document.getElementById('live-cronometro').innerText = `${minutesFinti}:${secondiFinti} (${minutoAttuale}')`;

    // TODO: Qui nei prossimi step calcoleremo il calo di energia e chiederemo i gol all'engine...

    // FISCHIO FINALE AL 90° MINUTO
    if (minutoAttuale >= 90) {
        clearInterval(timerPartitaId);
        partitaAttiva = false;
        
        // Nascondiamo il bottone della partita in corso perché il match è finito
        const btnInizio = document.getElementById('btn-inizio-partita');
        if (btnInizio) btnInizio.style.display = "none";
        
        const boxCronaca = document.getElementById('live-box-cronaca');
        boxCronaca.innerHTML += `<div style="color: #ffcc00; font-weight: bold; margin-top: 10px; border-top: 1px solid #333; padding-top: 5px;">🔴 TRIPLICE FISCHIO! Partita terminata. Risultato finale: ${squadraCasaNome} ${punteggioCasa} - ${punteggioFuori} ${squadraFuoriNome}</div>`;
        boxCronaca.scrollTop = boxCronaca.scrollHeight; // Auto-scroll in fondo alla telecronaca
        
        alert(`Partita Conclusa! ${squadraCasaNome} ${punteggioCasa} - ${punteggioFuori} ${squadraFuoriNome}`);
    }
}