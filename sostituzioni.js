// ==========================================
// CONFIGURAZIONE GLOBALE SOSTITUZIONI
// ==========================================
let sostituzioniRimaste = 5;
let giocatoreSelezionatoDaSostituireIndex = null; // Memorizza l'indice del titolare cliccato

/**
 * Mette in pausa o riprende la partita
 */
function gestisciPausaTattica() {
    const btnPausa = document.getElementById('btn-pausa-tattica');
    
    if (partitaAttiva) {
        // METTIAMO IN PAUSA
        clearInterval(timerPartitaId);
        partitaAttiva = false;
        if (btnPausa) {
            btnPausa.innerText = "▶️ RIPRENDI MATCH";
            btnPausa.style.background = "#28a745";
        }
        
        // Notifica in cronaca della pausa
        const box = document.getElementById('live-box-cronaca');
        box.innerHTML += `<div style="color: #00f2ff; font-style: italic; margin-bottom: 4px;">⏸️ Gioco fermo. Puoi effettuare sostituzioni cliccando prima su un titolare e poi su un panchinaro.</div>`;
        box.scrollTop = box.scrollHeight;
        
        // --- AGGIUNTA: Ridisegna le liste per attivare subito i click in pausa ---
        if (typeof renderizzaGiocatoriInPartita === 'function') {
            renderizzaGiocatoriInPartita();
        }
        
    } else {
        // RIPRENDIAMO IL MATCH (Solo se la partita non era già finita al 90°)
        if (minutoAttuale < 90) {
            partitaAttiva = true;
            timerPartitaId = setInterval(cicloMinutoPartita, 1300);
            if (btnPausa) {
                btnPausa.innerText = "⏸️ PAUSA TATTICA";
                btnPausa.style.background = "#ffc107";
            }
            
            // Rilascio eventuale selezione precedente per sicurezza
            giocatoreSelezionatoDaSostituireIndex = null;
            if (typeof renderizzaGiocatoriInPartita === 'function') {
                renderizzaGiocatoriInPartita();
            }
        }
    }
}

/**
 * Logica per scambiare un titolare con un panchinaro
 * @param {number} indexTitolare - Indice del giocatore in rosaGiocatoreOggetti
 * @param {number} indexPanchina - Indice del giocatore in rosaGiocatoreOggetti
 */
function effettuaSostituzione(indexTitolare, indexPanchina) {
    // Se siamo a partita in corso (minuto > 1) controlla se ci sono cambi rimasti
    if (minutoAttuale > 1 && sostituzioniRimaste <= 0) {
        alert("Hai esaurito le 5 sostituzioni disponibili per la partita live!");
        return;
    }

    let titolare = rosaGiocatoreOggetti[indexTitolare];
    let panchinaro = rosaGiocatoreOggetti[indexPanchina];

    // Controllo di sicurezza sui ruoli reali di schieramento
    if (titolare.schieramento !== "campo" || panchinaro.schieramento !== "panchina") {
        alert("Sostituzione non valida! Seleziona prima un giocatore in campo e poi uno in panchina.");
        return;
    }

    // 🔄 SCAMBIO DI STATO
    titolare.schieramento = "panchina";
    panchinaro.schieramento = "campo";

    // Il panchinaro eredita il ruolo dinamico sul campo del titolare che esce
    panchinaro.ruoloDinamico = titolare.ruoloDinamico;

    // --- AGGIUNTA: SE SIAMO NEL PRE-MATCH I CAMBI SONO GRATIS ---
    let stringaMinuto = "";
    if (minutoAttuale === 1) {
        stringaMinuto = "PRE-MATCH";
        // Non scaliamo sostituzioniRimaste!
    } else {
        stringaMinuto = `${minutoAttuale}'`;
        sostituzioniRimaste--; // Scala il cambio solo durante la partita live
    }

    // 📺 AGGIORNA IL CONTATORE VISIVO
    aggiornaInterfacciaCambi();

    // 📝 SCRIVIAMO IL CAMBIO NELLA TELECRONACA LIVE
    const box = document.getElementById('live-box-cronaca');
    box.innerHTML += `
        <div style="color: #00ff66; font-weight: bold; margin-bottom: 4px; border-left: 3px solid #00ff66; padding-left: 5px;">
            [${stringaMinuto}] 🔄 CAMBIO PER IL ${squadraCasaNome.toUpperCase()}: Esce ${titolare.nome} (Energia: ${Math.floor(titolare.energiaAttuale)}%) ed entra ${panchinaro.nome} (Energia: ${Math.floor(panchinaro.energiaAttuale)}%)!
        </div>
    `;
    box.scrollTop = box.scrollHeight;

    // Reset della selezione grafica e refresh dei campetti/liste
    giocatoreSelezionatoDaSostituireIndex = null;
    renderizzaGiocatoriInPartita();
}

/**
 * Aggiorna il testo dei cambi rimasti sul tabellone
 */
function aggiornaInterfacciaCambi() {
    const elementoCambi = document.getElementById('live-cambi-rimasti');
    if (elementoCambi) {
        elementoCambi.innerText = `🔄 Cambi rimasti: ${sostituzioniRimaste} / 5`;
    }
}

/**
 * Resetta i cambi a inizio di ogni match (da chiamare dentro preparaMatchLive)
 */
function resetSostituzioniMatch() {
    sostituzioniRimaste = 5;
    giocatoreSelezionatoDaSostituireIndex = null;
    aggiornaInterfacciaCambi();
}

/**
 * Gestisce l'evento di click sequenziale sui giocatori durante la pausa tattica
 * @param {number} index - L'indice reale del giocatore in rosaGiocatoreOggetti
 * @param {string} tipo - "campo" o "panchina"
 */
function selezionaGiocatoreSostituzione(index, tipo) {
    if (partitaAttiva) return; // Sicurezza: se la partita scorre, i click non fanno nulla

    if (tipo === "campo") {
        // Primo click: Selezioniamo il titolare che deve uscire
        giocatoreSelezionatoDaSostituireIndex = index;
        // Aggiorna l'interfaccia per far vedere il bordo azzurro sul giocatore scelto
        renderizzaGiocatoriInPartita();
    } 
    else if (tipo === "panchina") {
        // Secondo click: Se abbiamo già scelto un titolare, completiamo lo scambio
        if (giocatoreSelezionatoDaSostituireIndex !== null) {
            effettuaSostituzione(giocatoreSelezionatoDaSostituireIndex, index);
        } else {
            alert("Seleziona prima un giocatore in campo da sostituire!");
        }
    }
}