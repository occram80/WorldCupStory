// ==========================================
// ENGINE PARTITE - VERSIONE LIVE LIGHT (AGGIORNATO)
// ==========================================
let timerPartita = null;
let minutoCorrente = 0;
let golCasa = 0;
let golFuori = 0;
let squadraCasaNome = "";
let squadraFuoriNome = "";

// 🔥 Array globali per gestire i calciatori durante i 90 minuti
let giocatoriFuoriLive = []; // Ospiterà i 18 giocatori della CPU in questa partita

// Azioni preconfezionate per il test
const frasiCronaca = [
    { min: 10, testo: "Fischio d'inizio! Comincia la partita in un clima infuocato!", tipo: "evento" },
    { min: 28, testo: "Grandissima azione corale sulla fascia, cross al centro pericoloso!", tipo: "evento" },
    { min: 45, testo: "Duplice fischio dell'arbitro. Squadre negli spogliatoi sul punteggio di parità.", tipo: "evento" },
    { min: 62, testo: "⚠️ RETE!! Gol pazzesco con un tiro al volo da fuori area sotto l'incrocio!", tipo: "gol" },
    { min: 81, testo: "Il portiere compie un vero e proprio miracolo salvando il risultato sulla linea!", tipo: "evento" },
    { min: 90, testo: "Triplice fischio! Finisce qui un match intensissimo!", tipo: "evento" }
];

// 1. PREPARA LA PARTITA LIVE E CAMBIA SCHERMATA
// Rinominata in preparaMatchLiveEngine per essere richiamata dall'interfaccia
function preparaMatchLiveEngine(casa, fuori) {
    squadraCasaNome = casa;
    squadraFuoriNome = fuori;
    minutoCorrente = 0;
    golCasa = 0;
    golFuori = 0;

    // 🎯 IDENTIFICA LA CPU AUTOMATICAMENTE
    let nomeSquadraCpu = fuori; 
    if (databaseSquadre[casa]) {
        nomeSquadraCpu = casa; 
    }

    // 🤖 GENERA LA SQUADRA DELLA CPU DAL DATABASE SQUADRE
    // Reset sicuro senza rideclarare la variabile con 'let' o 'const'
    if (typeof giocatoriFuoriLive !== 'undefined') {
        giocatoriFuoriLive = [];
    } else {
        window.giocatoriFuoriLive = [];
    }
    
    const datiCpu = databaseSquadre[nomeSquadraCpu];
    
    if (datiCpu) {
        let listaCalciatori = Array.isArray(datiCpu) ? datiCpu : datiCpu.rosa;
        // Accediamo alla variabile globale senza rideclararla
        giocatoriFuoriLive.moduloCpuAttuale = datiCpu.modulo || "4-4-2";

        listaCalciatori.forEach((giocatore, index) => {
            giocatoriFuoriLive.push({
                nome: giocatore.nome,
                ruolo: [...giocatore.ruolo],
                att: giocatore.att,
                dif: giocatore.dif,
                res: giocatore.res,
                energiaAttuale: giocatore.res, 
                ruoloDinamico: giocatore.ruolo[0], 
                schieramento: index < 11 ? "campo" : "panchina" 
            });
        });
        console.log(`🤖 Engine: Inizializzata CPU (${nomeSquadraCpu}) con modulo ${giocatoriFuoriLive.moduloCpuAttuale}.`);
    } else {
        console.error(`⚠️ Errore Engine: Impossibile trovare la squadra "${nomeSquadraCpu}" nel database.`);
    }

    // Aggiorna l'HTML del tabellone iniziale
    document.getElementById('live-casa-nome').innerText = squadraCasaNome.toUpperCase();
    document.getElementById('live-fuori-nome').innerText = squadraFuoriNome.toUpperCase();
    document.getElementById('live-risultato').innerText = "0 - 0";
    document.getElementById('live-cronometro').innerText = "00:00 (1')";
    document.getElementById('live-box-cronaca').innerHTML = `<div style="color: #666;">In attesa del fischio d'inizio...</div>`;
    
    // Ripristina il bottone iniziale
    const btnInizio = document.getElementById('btn-inizio-partita');
    if (btnInizio) {
        btnInizio.style.display = "block";
        btnInizio.innerText = "▶️ INIZIA PARTITA";
        btnInizio.disabled = false;
    }

    // 🔥 ORA CHIAMA CORRETTAMENTE LA GRAFICA DALL'ALTRO FILE!
    if (typeof renderizzaGiocatoriInPartita === 'function') {
        renderizzaGiocatoriInPartita();
    }

    // Switch di schermata
    document.getElementById('schermata-mio-girone').style.display = 'none';
    document.getElementById('schermata-partita-live').style.display = 'block';
}

// ==========================================
// FUNZIONE: CALCOLA IL BONUS MODULO IN ATTACCO DELLA CPU
// ==========================================
function ottieniBonusModuloAttaccoCpu() {
    const modulo = giocatoriFuoriLive.moduloCpuAttuale;
    
    // Assegna il bonus fisso in base al modulo scritto nel database
    if (modulo === "4-2-4") return 2;
    if (modulo === "4-3-3" || modulo === "3-4-3") return 1;
    if (modulo === "4-4-2") return 0;
    
    return 0; // Fallback di sicurezza
}

// ==========================================
// FUNZIONE: CALCOLA IL BONUS MODULO IN DIFESA DELLA CPU
// ==========================================
function ottieniBonusModuloDifesaCpu() {
    const modulo = giocatoriFuoriLive.moduloCpuAttuale;
    
    // Assegna il bonus fisso in base al modulo scritto nel database
    if (modulo === "3-4-3") return 0; // 3 difensori = neutro
    if (modulo === "4-4-2" || modulo === "4-3-3" || modulo === "4-2-4") return 0; // 4 difensori = neutro
    
    return 0; // Fallback di sicurezza
}
// ==========================================
// ENGINE: CALCOLO FORZA ATTACCO TEAM
// ==========================================
function calcolaForzaAttacco(rosaSquadra, bonusModulo) {
    let sommaAttacco = 0;

    // Consideriamo solo i giocatori attualmente in CAMPO
    rosaSquadra.forEach(g => {
        if (g.schieramento === "campo") {
            // 🔥 L'energia attuale incide come percentuale sulla statistica nativa!
            // Es: att 90 con 50% di energia = 45 di forza attacco reale
            let moltiplicatoreEnergia = g.energiaAttuale / 100;
            sommaAttacco += g.att * moltiplicatoreEnergia;
        }
    });

    // Aggiungiamo il bonus del modulo tattico
    return sommaAttacco + (bonusModulo * 10); 
}

// ==========================================
// ENGINE: CALCOLO FORZA DIFESA TEAM
// ==========================================
function calcolaForzaDifesa(rosaSquadra, bonusModulo) {
    let sommaDifesa = 0;

    rosaSquadra.forEach(g => {
        if (g.schieramento === "campo") {
            let moltiplicatoreEnergia = g.energiaAttuale / 100;
            sommaDifesa += g.dif * moltiplicatoreEnergia;
        }
    });

    return sommaDifesa + (bonusModulo * 10);
}
// ==========================================
// ENGINE PROVA BASE: CALCOLO AZIONE E GOL (STRUTTURATO PER MARCATORI E RUOLI)
// ==========================================
function eseguiCalcoloMinutoPartita(minuto) {
    // 1. PROBABILITÀ BASE: C'è un'azione pericolosa in questo minuto? (12% di chance)
    if (Math.random() > 0.12) return null; 

    // 2. IDENTIFICA CHI ATTACCA (50% Utente, 50% CPU)
    const attaccaUtente = Math.random() < 0.5;
    
    let attaccanti = [];
    let difensori = [];
    let bonusModuloAttacco = 0;
    let bonusModuloDifesa = 0;
    let squadraInAttacco = "";

    // Capiamo se l'utente gioca in casa o fuori guardando il database
    const utenteInCasa = !databaseSquadre[squadraCasaNome]; 

    if (attaccaUtente) {
        // Attacca l'utente (rosaGiocatoreOggetti)
        squadraInAttacco = utenteInCasa ? squadraCasaNome : squadraFuoriNome;
        attaccanti = rosaGiocatoreOggetti.filter(g => g.schieramento === "campo");
        difensori = giocatoriFuoriLive.filter(g => g.schieramento === "campo");
        
        bonusModuloAttacco = typeof ottieniBonusModuloAttaccoUtente === 'function' ? ottieniBonusModuloAttaccoUtente() : 0;
        bonusModuloDifesa = typeof ottieniBonusModuloDifesaCpu === 'function' ? ottieniBonusModuloDifesaCpu() : 0;
    } else {
        // Attacca la CPU (giocatoriFuoriLive)
        squadraInAttacco = utenteInCasa ? squadraFuoriNome : squadraCasaNome;
        attaccanti = giocatoriFuoriLive.filter(g => g.schieramento === "campo");
        difensori = rosaGiocatoreOggetti.filter(g => g.schieramento === "campo");
        
        bonusModuloAttacco = typeof ottieniBonusModuloAttaccoCpu === 'function' ? ottieniBonusModuloAttaccoCpu() : 0;
        bonusModuloDifesa = typeof ottieniBonusModuloDifesaUtente === 'function' ? ottieniBonusModuloDifesaUtente() : 0;
    }

    if (attaccanti.length === 0 || difensori.length === 0) return null;

    // ==========================================
    // 3. SELEZIONE PESATA DEI PROTAGONISTI (LOGICA LOTTERIA)
    // ==========================================
    
    // Assegna i biglietti per la probabilità di tirare in porta (AGGIORNATO COC)
    const ottieniPesoAttacco = (ruolo) => {
        switch (ruolo) {
            case "ATT":
            case "ALA": return 70;  // Tirano spessissimo
            case "COC": return 50;  // Il trequartista si inserisce molto più spesso di un CC!
            case "CEN":
            case "EST": return 25;  // Si inseriscono ogni tanto
            case "MED": return 10;  // Il mediano tira raramente da fuori
            case "DIF":
            case "TER": return 5;   // Solo sui calci piazzati
            case "POR": return 0;   // Il portiere non va mai a tirare
            default: return 10;
        }
    };

    // Assegna i biglietti per la probabilità di contrastare l'azione (AGGIORNATO MED)
    const ottieniPesoDifesa = (ruolo) => {
        switch (ruolo) {
            case "DIF":
            case "TER": return 65;  // Fanno il muro difensivo
            case "MED": return 50;  // Il mediano fa un filtro d'acciaio a centrocampo!
            case "CEN": return 30;  // Aiutano in mezzo al campo
            case "ALA":
            case "ATT":
            case "COC":
            case "EST": return 5;   // Ripiegano raramente
            case "POR": return 0;   // Il portiere gestisce il tiro dopo
            default: return 10;
        }
    };

    // Estrazione del Tiratore
    let poolAttacco = [];
    attaccanti.forEach(g => {
        let biglietti = ottieniPesoAttacco(g.ruoloDinamico);
        for (let i = 0; i < biglietti; i++) {
            poolAttacco.push(g);
        }
    });
    const tiratore = poolAttacco.length > 0 ? poolAttacco[Math.floor(Math.random() * poolAttacco.length)] : attaccanti[0];

    // Estrazione del Difensore che contrasta
    let poolDifesa = [];
    difensori.forEach(g => {
        let biglietti = ottieniPesoDifesa(g.ruoloDinamico);
        for (let i = 0; i < biglietti; i++) {
            poolDifesa.push(g);
        }
    });
    const difensore = poolDifesa.length > 0 ? poolDifesa[Math.floor(Math.random() * poolDifesa.length)] : difensori[0];

    // ==========================================
    // 4. RECUPERO MODIFICATORI ENERGIA
    // ==========================================
    const modEnergiaAtt = typeof calcolaModificatoreEnergia === 'function' ? calcolaModificatoreEnergia(tiratore.energiaAttuale) : 0;
    const modEnergiaDif = typeof calcolaModificatoreEnergia === 'function' ? calcolaModificatoreEnergia(difensore.energiaAttuale) : 0;

    // 5. LANCIO DEI DADI (Casualità da 1 a 10)
    const dadoAttacco = Math.floor(Math.random() * 10) + 1;
    const dadoDifesa = Math.floor(Math.random() * 10) + 1;

    // 6. CALCOLO DEI TOTALI FINALI
    const totaleAttacco = tiratore.att + bonusModuloAttacco + modEnergiaAtt + dadoAttacco;
    const totaleDifesa = difensore.dif + bonusModuloDifesa + modEnergiaDif + dadoDifesa;

    // 7. VERDETTO
    let esitoAzione = {
        min: minuto,
        squadra: squadraInAttacco, 
        cronaca: "",
        isGol: false,
        marcatore: "" // <--- AGGIUNTO: Proprietà vuota pronta da valorizzare
    };

    if (totaleAttacco > totaleDifesa) {
        esitoAzione.isGol = true;
        esitoAzione.marcatore = tiratore.nome; // <--- AGGIUNTO: Salviamo il nome pulito del bomber!
        esitoAzione.cronaca = `⚽ GOL! Grande spunto di ${tiratore.nome} che supera ${difensore.nome} e scarica un tiro potente che si insacca per il ${squadraInAttacco.toUpperCase()}!`;
    } else {
        esitoAzione.isGol = false;
        const variantiNoGol = [
            `Tiro di ${tiratore.nome}, ma ${difensore.nome} si oppone da campione e allontana la sfera.`,
            `${tiratore.nome} tenta la conclusione, ma strozza troppo il tiro e la palla esce sul fondo.`,
            `Ottimo tempismo difensivo di ${difensore.nome} che ferma l'avanzata pericolosa di ${tiratore.nome}.`
        ];
        esitoAzione.cronaca = `🛑 ${variantiNoGol[Math.floor(Math.random() * variantiNoGol.length)]}`;
    }

    return esitoAzione;
}