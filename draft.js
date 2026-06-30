// ==========================================
// DRAFT.JS - IL MOTORE DEI RULLI E SCHIERAMENTO
// ==========================================

function faiRoll() {
    // 1. CONTROLLO ROSA COMPLETA (Max 18 giocatori)
    if (nomiSchierati.length >= 18) {
        alert("Rosa completa! 18 giocatori schierati. È ora di generare i Mondiali!");
        document.getElementById('pagina-draft').style.display = 'none'; 
        document.getElementById('schermata-gironi').style.display = 'block';
        inizializzaGironiVuoti();
        return;
    }

    const nomiSquadre = Object.keys(databaseSquadre);
    const squadraCasuale = nomiSquadre[Math.floor(Math.random() * nomiSquadre.length)];
    
    const datiSquadra = databaseSquadre[squadraCasuale];
    const giocatori = Array.isArray(datiSquadra) ? datiSquadra : datiSquadra.rosa;
    
    const titolo = document.getElementById('nome-squadra-estratta');
    if (titolo) {
        titolo.innerText = "SQUADRA: " + squadraCasuale;
    }
    
    giocatoreSelezionato = null; 
    
    const container = document.getElementById('lista-giocatori-squadra');
    container.innerHTML = "";
    
    // --- AGGIUNTA: CONTEGGIO RUOLI GIÀ SCHIERATI DALL'UTENTE ---
    // Contiamo quanti POR, DIF, CEN, ATT l'utente ha già messo in squadra (campo + panchina)
    const conteggioRuoliSchierati = { POR: 0, DIF: 0, TER: 0, CEN: 0, MED: 0, EST: 0, ALA: 0, ATT: 0, COC: 0 };
    rosaGiocatoreOggetti.forEach(g => {
        // Prendiamo il primo ruolo primario o quello con cui è stato schierato
        if (g.ruoloSchierato) {
            conteggioRuoliSchierati[g.ruoloSchierato]++;
        } else {
            conteggioRuoliSchierati[g.ruolo[0]]++;
        }
    });

    // Calcoliamo i posti totali previsti dal modulo per i titolari
    const ruoliTitolariModulo = posizioniModuli[impostazioniGioco.modulo].map(p => p.ruolo);
    const postiTotaliPerRuolo = {
        POR: ruoliTitolariModulo.filter(r => r === "POR").length + 1, // Modulo + 1 in panchina
        DIF: ruoliTitolariModulo.filter(r => r === "DIF").length,
        TER: ruoliTitolariModulo.filter(r => r === "TER").length,
        CEN: ruoliTitolariModulo.filter(r => r === "CEN").length,
        MED: ruoliTitolariModulo.filter(r => r === "MED").length,
        EST: ruoliTitolariModulo.filter(r => r === "EST").length,
        ALA: ruoliTitolariModulo.filter(r => r === "ALA").length,
        ATT: ruoliTitolariModulo.filter(r => r === "ATT").length,
        COC: ruoliTitolariModulo.filter(r => r === "COC").length
    };

    // Integriamo i posti macro della panchina (2 per i difensori, 2 per i centrocampisti, 2 per gli attaccanti)
    // Questo serve come approssimazione per capire se i macro-ruoli sono saturi
    const totaliMacro = {
        DIF: postiTotaliPerRuolo.DIF + postiTotaliPerRuolo.TER + 2, // Titolari + 2 slot panchina
        CEN: postiTotaliPerRuolo.CEN + postiTotaliPerRuolo.MED + postiTotaliPerRuolo.EST + 2, // Titolari + 2 slot panchina
        ATT: postiTotaliPerRuolo.ATT + postiTotaliPerRuolo.ALA + postiTotaliPerRuolo.COC + 2  // Titolari + 2 slot panchina
    };

    giocatori.forEach(giocatore => {
        const div = document.createElement('div');
        div.style.padding = "10px";
        div.style.border = "1px solid #777";
        div.style.margin = "5px";
        div.style.cursor = "pointer";
        div.style.borderRadius = "5px";
        div.style.background = "#444";
        div.style.color = "white";

        // --- CONTROLLO DI SATURAZIONE RUOLO ---
        let ruoloSaturo = false;
        
        // Se è un portiere, massimo 2 in tutta la rosa (1 titolare + 1 panchina)
        if (giocatore.ruolo.includes("POR") && (conteggioRuoliSchierati["POR"] >= 2)) {
            ruoloSaturo = true;
        }
        
        // Verifica se tutti i possibili ruoli del giocatore sono pieni sia in campo che in panchina
        const haSpazio = giocatore.ruolo.some(r => {
            if (["DIF", "TER"].includes(r)) {
                const schieratiDIF = (conteggioRuoliSchierati.DIF || 0) + (conteggioRuoliSchierati.TER || 0);
                return schieratiDIF < totaliMacro.DIF;
            }
            if (["CEN", "MED", "EST"].includes(r)) {
                const schieratiCEN = (conteggioRuoliSchierati.CEN || 0) + (conteggioRuoliSchierati.MED || 0) + (conteggioRuoliSchierati.EST || 0);
                return schieratiCEN < totaliMacro.CEN;
            }
            if (["ATT", "ALA", "COC"].includes(r)) {
                const schieratiATT = (conteggioRuoliSchierati.ATT || 0) + (conteggioRuoliSchierati.ALA || 0) + (conteggioRuoliSchierati.COC || 0);
                return schieratiATT < totaliMacro.ATT;
            }
            return false;
        });

        if (!haSpazio && !giocatore.ruolo.includes("POR")) {
            ruoloSaturo = true;
        }

        // Se il giocatore è già schierato O se la sua categoria di ruolo è già strapiena, si spegne
        if (nomiSchierati.includes(giocatore.nome) || ruoloSaturo) {
            div.style.opacity = "0.15"; // Ancora più spento per far capire il blocco
            div.style.pointerEvents = "none";
        }

        const ruoliModulo = posizioniModuli[impostazioniGioco.modulo].map(p => p.ruolo);
        const isCompatibile = giocatore.ruolo.some(r => ruoliModulo.includes(r));

        if (isCompatibile) {
            div.innerHTML = `
                <strong>${giocatore.nome}</strong> (${giocatore.ruolo.join('/')})<br>
                <small style="color: #ffcc00; font-weight: bold;">ATT: ${giocatore.att} | DIF: ${giocatore.dif} | RES: ${giocatore.res}</small>
            `;

            div.onclick = function() {
                if (nomiSchierati.includes(giocatore.nome) || ruoloSaturo) return;
                if (giocatoreSelezionato !== null) return;
                
                giocatoreSelezionato = giocatore;
                const tuttiIPlayer = container.querySelectorAll('div');
                tuttiIPlayer.forEach(d => { d.style.pointerEvents = "none"; d.style.opacity = "0.3"; });
                illuminaSlot(giocatore.ruolo);
                illuminaPanchina();
            };
        } else {
            div.innerHTML = `
                <strong>${giocatore.nome}</strong> (${giocatore.ruolo.join('/')}) - [Solo Panchina]<br>
                <small style="color: #aaa;">ATT: ${giocatore.att} | DIF: ${giocatore.dif} | RES: ${giocatore.res}</small>
            `;

            div.onclick = function() {
                if (nomiSchierati.includes(giocatore.nome) || ruoloSaturo) return;
                if (giocatoreSelezionato !== null) return;
                
                giocatoreSelezionato = player = giocatore;
                const tuttiIPlayer = container.querySelectorAll('div');
                tuttiIPlayer.forEach(d => { d.style.pointerEvents = "none"; d.style.opacity = "0.3"; });
                illuminaPanchina(); 
            };
        }
        container.appendChild(div);
    });
}

function illuminaPanchina() {
    if (typeof giocatoreSelezionato === 'undefined' || !giocatoreSelezionato) return;
    
    // Convertiamo sempre il ruolo del giocatore in un Array, anche se è una stringa singola
    const ruoliGiocatore = Array.isArray(giocatoreSelezionato.ruolo) 
                           ? giocatoreSelezionato.ruolo 
                           : [giocatoreSelezionato.ruolo];
    
    const slotPanchina = document.querySelectorAll('.omino-panchina');
    
    console.log("Illuminazione per ruoli: " + ruoliGiocatore);
    
    slotPanchina.forEach((p, index) => {
        // Verifica se lo slot è libero (contiene ancora una label di ruolo)
        const isOccupato = !["POR", "DIF", "CEN", "ATT"].includes(p.innerText);

        // Controlliamo se almeno UNO dei ruoli del giocatore è presente nel dataset dello slot
        // dataset.ruolo è una stringa come "MED,CEN,EST"
        const ruoliSlot = p.dataset.ruolo.split(',');
        const isCompatibile = ruoliGiocatore.some(r => ruoliSlot.includes(r));

        if (isCompatibile && !isOccupato) {
            // Effetto luce
            p.style.border = "3px solid #ffcc00";
            p.style.boxShadow = "0 0 15px #ffcc00";
            p.style.cursor = "pointer";
            
            p.onclick = function() {
                console.log("CLICK RICEVUTO su slot: " + index);
                assegnaPanchina(p);
            };
        } else {
            // Reset se non compatibile
            if (!isOccupato) {
                p.style.border = "2px solid #555";
                p.style.boxShadow = "none";
                p.onclick = null;
            }
        }
    });
}
function illuminaSlot(ruoliGiocatore) {
    const tutti = document.querySelectorAll('.omino-giocatore');
    // Lista di tutti i ruoli possibili per verificare se lo slot contiene ancora il nome del ruolo
    const ruoliStandard = ["POR", "DIF", "TER", "CEN", "MED", "COC", "ALA", "ATT", "EST"];
    
    tutti.forEach(slot => {
        const ruoloSlot = slot.dataset.ruolo;
        const cerchio = slot.querySelector('div');
        
        // 1. Controlla se il ruolo è compatibile
        const eValido = ruoliGiocatore.includes(ruoloSlot);
        
        // 2. Controlla se è LIBERO (se il testo dentro è ancora un ruolo standard, è vuoto)
        const eLibero = ruoliStandard.includes(cerchio.innerText);

        // Illumina solo se è valido ED è libero
        if (eValido && eLibero) {
            slot.style.opacity = "1";
            slot.style.boxShadow = "0 0 15px #00f2ff, 0 0 25px #00f2ff";
            slot.style.border = "3px solid #00f2ff";
            slot.style.transform = "translate(-50%, -50%) scale(1.1)";
            slot.style.cursor = "pointer";
            slot.onclick = function() { assegnaGiocatore(slot); };
        } else {
            // Se è occupato o non compatibile, lo spegniamo
            slot.style.opacity = "0.2";
            slot.style.boxShadow = "none";
            slot.style.border = "none";
            slot.style.transform = "translate(-50%, -50%) scale(1)";
            slot.style.cursor = "default";
            // Importante: se è già occupato, non vogliamo che il click faccia riassegnare
            if (!eLibero) {
                slot.onclick = null;
            } else {
                slot.onclick = null;
            }
        }
    });
}

function assegnaPanchina(slot) {
    if (!giocatoreSelezionato) return;

    // 0. CONTROLLO DUPLICATI: Il giocatore è già stato schierato?
    if (nomiSchierati.includes(giocatoreSelezionato.nome)) {
        alert("Questo giocatore è già in campo o in panchina!");
        giocatoreSelezionato = null; // Resettiamo
        resetIlluminazione();
        return;
    }
    
    // Assegna il nome al cerchietto
    slot.innerText = giocatoreSelezionato.nome;
    slot.style.display = "flex";
    slot.style.alignItems = "center";
    slot.style.justifyContent = "center";
    slot.style.fontSize = "9px";
    
    // --- COLORAZIONE BANDIERA IN PANCHINA ---
    slot.style.background = impostazioniGioco.coloreMaglia || "#444";
    slot.style.color = impostazioniGioco.coloreTestoMaglia || "#ffffff";
    
    // Memorizziamo il nome nella lista dei giocatori schierati
    nomiSchierati.push(giocatoreSelezionato.nome);
    
    // 🔥 MODIFICA: Arricchiamo l'oggetto e lo tagghiamo come panchina
    let copiaGiocatore = { ...giocatoreSelezionato };
    copiaGiocatore.schieramento = "panchina"; // Segnamo che va in panchina
    copiaGiocatore.ruoloDinamico = "PANCHINA";
    
    // SALVIAMO L'OGGETTO MODIFICATO
    rosaGiocatoreOggetti.push(copiaGiocatore);
    
    console.log("Giocatore aggiunto alla panchina. Lista schierati:", nomiSchierati);
    console.log("Oggetto panchina salvato:", rosaGiocatoreOggetti);
    
    // Blocchiamo lo slot della panchina
    slot.onclick = null; 
    slot.style.cursor = "default";
    slot.style.border = "2px solid white"; // Bordino bianco coordinato col campo!
    slot.style.boxShadow = "none";
    
    // Resetta la selezione globale
    giocatoreSelezionato = null;
    
    // Reset estetico: rimuove l'illuminazione dagli altri slot liberi
    document.querySelectorAll('.omino-panchina').forEach(p => {
        if (["POR", "DIF", "CEN", "ATT"].includes(p.innerText)) {
            p.style.boxShadow = "none";
            p.style.border = "2px solid #555";
        }
    });
    
    console.log("Giocatore assegnato in panchina!");
}

function assegnaGiocatore(slot) {
    if (!giocatoreSelezionato) return;

    // 0. CONTROLLO DUPLICATI: Il giocatore è già stato schierato?
    if (nomiSchierati.includes(giocatoreSelezionato.nome)) {
        alert("Questo giocatore è già in campo o in panchina!");
        giocatoreSelezionato = null; // Resettiamo la selezione
        resetIlluminazione();
        return;
    }

    const cerchio = slot.querySelector('div'); 
    
    if (cerchio) {
        // 1. CONTROLLO SOVRASCRITTURA
        const ruoliValidi = ["POR", "DIF", "TER", "CEN", "MED", "COC", "ALA", "ATT", "EST"];
        
        if (!ruoliValidi.includes(cerchio.innerText)) {
            console.log("Slot occupato, impossibile sovrascrivere!");
            return;
        }

        // 2. ASSEGNAZIONE GRAFICA E COLORI DELLA BANDIERA
        cerchio.style.width = "50px";
        cerchio.style.height = "50px";
        cerchio.style.boxSizing = "border-box";
        
        // Applica dinamicamente il colore della maglia nazionale scelta
        cerchio.style.background = impostazioniGioco.coloreMaglia || "#444";
        cerchio.style.color = impostazioniGioco.coloreTestoMaglia || "#ffffff";
        cerchio.style.border = "2px solid white"; // Un bel bordino bianco stile maglia da gioco
        
        cerchio.innerText = giocatoreSelezionato.nome;
        cerchio.style.fontSize = giocatoreSelezionato.nome.length > 7 ? "9px" : "11px";
        
        // Memorizziamo il nome nella lista dei giocatori schierati
        nomiSchierati.push(giocatoreSelezionato.nome);
        
        // 🔥 MODIFICA SALVATAGGIO: Arricchiamo l'oggetto salvando anche l'ID univoco dello slot per l'ordine visivo
        let copiaGiocatore = { ...giocatoreSelezionato };
        copiaGiocatore.schieramento = "campo";             // Segnamo che va in campo
        copiaGiocatore.ruoloDinamico = slot.dataset.ruolo; // Salviamo il ruolo dello slot (es: POR, DIF, ATT)
        copiaGiocatore.idSlot = slot.id || slot.dataset.id || Math.random(); // Salva l'identificativo del modulo
        
        // SALVIAMO L'OGGETTO MODIFICATO
        rosaGiocatoreOggetti.push(copiaGiocatore);
        
        console.log("Giocatore aggiunto con idSlot:", copiaGiocatore.idSlot);
        console.log("Dati completi con ruolo dinamico salvati:", rosaGiocatoreOggetti);
    }
    
    // 3. BLOCCO DELLO SLOT
    slot.onclick = null; 
    slot.style.cursor = "default";
    
    // 4. RESET FINALE
    giocatoreSelezionato = null;
    resetIlluminazione();
    
    console.log("Giocatore assegnato con successo!");
}

function resetIlluminazione() {
    // 1. Reset Titolari (il tuo codice attuale)
    const tuttiTitolari = document.querySelectorAll('.omino-giocatore');
    tuttiTitolari.forEach(s => {
        s.style.opacity = "1";
        s.style.boxShadow = "none";
        s.style.border = "none";
        s.style.transform = "translate(-50%, -50%) scale(1)";
        s.style.transition = "all 0.3s ease";
    });

    // 2. Reset Panchina (AGGIUNTO)
    const tuttiPanchina = document.querySelectorAll('.omino-panchina');
    tuttiPanchina.forEach(p => {
        // Se lo slot è ancora "libero" (contiene un ruolo), resetta lo stile
        if (["POR", "DIF", "CEN", "ATT"].includes(p.innerText)) {
            p.style.boxShadow = "none";
            p.style.border = "2px solid #555";
            p.onclick = null; // Toglie eventuali click rimasti
        }
    });
}


// Aggiungi questa funzione per sapere cosa esiste nel campo
function ruoliPresentiNelModulo() {
    const posizioni = posizioniModuli[impostazioniGioco.modulo];
    // Ritorna un array unico di ruoli, es: ["POR", "DIF", "TER", ...]
    return [...new Set(posizioni.map(p => p.ruolo))];
}

