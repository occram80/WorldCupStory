// ==========================================
// GESTIONE GIRONI - STATO GLOBALE
// ==========================================
let squadreGirone = []; // Conterrà i nomi delle 4 squadre del girone
let classifica = {};    // Conterrà i dati (punti, giocate, golFatti, golSubiti)
let calendario = [];    // Conterrà le 3 giornate con le relative partite

let giornataCorrente = 1; // <--- NUOVA: Tiene traccia di quale giornata si deve giocare (1, 2 o 3)

// ==========================================
// ==========================================
// 1. INIZIALIZZAZIONE DEL GIRONE
// ==========================================
function inizializzaGirone(quattroSquadre) {
    squadreGirone = quattroSquadre; 
    classifica = {};
    calendario = [];
    // Crea la struttura della classifica a zero per ogni squadra
    squadreGirone.forEach(squadra => {
        classifica[squadra] = { punti: 0, giocate: 0, golFatti: 0, golSubiti: 0 };
    });

    // Genera le 3 giornate fisse (Algoritmo Girone all'Italiana per 4 squadre)
    calendario = [
        {
            giornata: 1,
            partite: [
                { casa: squadreGirone[0], fuori: squadreGirone[1], golCasa: null, golFuori: null, giocata: false },
                { casa: squadreGirone[2], fuori: squadreGirone[3], golCasa: null, golFuori: null, giocata: false }
            ]
        },
        {
            giornata: 2,
            partite: [
                { casa: squadreGirone[0], fuori: squadreGirone[2], golCasa: null, golFuori: null, giocata: false },
                { casa: squadreGirone[1], fuori: squadreGirone[3], golCasa: null, golFuori: null, giocata: false }
            ]
        },
        {
            giornata: 3,
            partite: [
                { casa: squadreGirone[3], fuori: squadreGirone[0], golCasa: null, golFuori: null, giocata: false },
                { casa: squadreGirone[1], fuori: squadreGirone[2], golCasa: null, golFuori: null, giocata: false }
            ]
        }
    ];

    // Disegna la grafica a schermo
    renderizzaClassifica();
    renderizzaCalendario();
}

// ==========================================
// 2. DISEGNA LA CLASSIFICA A SCHERMO
// ==========================================
function renderizzaClassifica() {
    const corpo = document.getElementById('corpo-classifica');
    if (!corpo) return;
    
    corpo.innerHTML = "";

    // Trasforma l'oggetto classifica in un array ordinabile
    let ordinata = Object.keys(classifica).map(nome => {
        return { nome: nome, ...classifica[nome] };
    });

    // Ordinamento: Punti -> Differenza Reti -> Gol Fatti
    ordinata.sort((a, b) => {
        if (b.punti !== a.punti) return b.punti - a.punti;
        let diffA = a.golFatti - a.golSubiti;
        let diffB = b.golFatti - b.golSubiti;
        if (diffB !== diffA) return diffB - diffA;
        return b.golFatti - a.golFatti;
    });

    // Inietta le righe nella tabella HTML
    ordinata.forEach(s => {
        corpo.innerHTML += `
            <tr style="border-bottom: 1px solid #333; font-size: 0.95rem;">
                <td style="text-align: left; padding: 12px 10px; font-weight: bold;">${s.nome}</td>
                <td style="color: #00f2ff; font-weight: bold;">${s.punti}</td>
                <td>${s.giocate}</td>
                <td>${s.golFatti}</td>
                <td>${s.golSubiti}</td>
            </tr>
        `;
    });
}

// ==========================================
// 3. DISEGNA IL CALENDARIO A SCHERMO (AGGIORNATO CON FILTRI E BLOCCHI)
// ==========================================
function renderizzaCalendario() {
    const contenitore = document.getElementById('contenitore-calendario');
    if (!contenitore) return;
    
    contenitore.innerHTML = "";

    // Recuperiamo il nome esatto del team utente per i controlli
    let nomeMioTeam = "MIO TEAM";
    if (typeof impostazioniGioco !== 'undefined' && impostazioniGioco.nomeTeam && impostazioniGioco.nomeTeam.trim() !== "") {
        nomeMioTeam = impostazioniGioco.nomeTeam.toUpperCase();
    } else {
        const inputNome = document.getElementById('nome-team');
        if (inputNome && inputNome.value.trim() !== "") nomeMioTeam = inputNome.value.toUpperCase();
    }

    calendario.forEach(g => {
        let htmlGiornata = `
            <div style="background: #2a2a2a; padding: 10px; border-radius: 5px;">
                <h3 style="margin: 0 0 10px 0; font-size: 0.9rem; color: #ffcc00; border-bottom: 1px solid #444; padding-bottom: 5px;">GIORNATA ${g.giornata}</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
        `;

        g.partite.forEach((p, index) => {
            let risCasa = p.golCasa !== null ? p.golCasa : "-";
            let risFuori = p.golFuori !== null ? p.golFuori : "-";
            
            // Verifica se questa partita coinvolge l'utente
            let ePartitaUtente = (p.casa.toUpperCase() === nomeMioTeam || p.fuori.toUpperCase() === nomeMioTeam);
            
            // Generazione dinamica del bottone basata sullo stato
            let bottoneHTML = "";
            
            if (ePartitaUtente) {
                if (p.giocata) {
                    // Partita già conclusa
                    bottoneHTML = `<div style="color: #28a745; font-size: 0.8rem; font-weight: bold; text-align: center;">✅ PARTITA GIOCATA</div>`;
                } else if (g.giornata === giornataCorrente) {
                    // Giornata corrente ed è la tua partita: ATTIVO!
                    bottoneHTML = `
                        <div style="text-align: center;">
                            <button onclick="preparaMatchLive('${p.casa.replace(/'/g, "\\'")}', '${p.fuori.replace(/'/g, "\\'")}')" style="background: #00f2ff; color: #000; border: none; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; cursor: pointer; transition: 0.2s;">
                                VAI ALLA PARTITA ⚽
                            </button>
                        </div>`;
                } else {
                    // Giornata futura: BLOCCATO
                    bottoneHTML = `
                        <div style="text-align: center;">
                            <button disabled style="background: #555; color: #aaa; border: none; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; cursor: not-allowed;">
                                BLOCCATA 🔒
                            </button>
                        </div>`;
                }
            } else {
                // Partite CPU vs CPU (Nessun bottone)
                if (p.giocata) {
                    bottoneHTML = `<div style="color: #aaa; font-size: 0.75rem; font-style: italic; text-align: center;">Simulata</div>`;
                } else {
                    bottoneHTML = `<div style="color: #666; font-size: 0.75rem; font-style: italic; text-align: center;">In attesa dell'utente...</div>`;
                }
            }
            
            htmlGiornata += `
                <div style="display: flex; flex-direction: column; background: #1e1e1e; padding: 10px; border-radius: 4px; gap: 8px; border-left: ${ePartitaUtente ? '3px solid #00f2ff' : 'none'};">
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
                        <div style="flex: 1; text-align: right; font-weight: bold; padding-right: 10px; color: ${p.casa.toUpperCase() === nomeMioTeam ? '#00f2ff' : 'white'}">${p.casa}</div>
                        <div style="background: #333; padding: 4px 10px; border-radius: 3px; font-weight: bold; color: #00f2ff; min-width: 40px; text-align: center;">
                            ${risCasa} - ${risFuori}
                        </div>
                        <div style="flex: 1; text-align: left; font-weight: bold; padding-left: 10px; color: ${p.fuori.toUpperCase() === nomeMioTeam ? '#00f2ff' : 'white'}">${p.fuori}</div>
                    </div>
                    
                    ${bottoneHTML}
                </div>
            `;
        });

        htmlGiornata += `</div></div>`;
        contenitore.innerHTML += htmlGiornata;
    });
}// 4. TRANSIZIONE: VAI ALLA SCHERMATA DEL GIRONE REALE
// ==========================================
function vaiAlMioGirone() {
    // 1. Controllo di sicurezza: il sorteggio deve essere stato fatto!
    if (typeof strutturaGironi === 'undefined' || Object.keys(strutturaGironi).length === 0) {
        alert("Prima devi completare il Sorteggio Live!");
        return;
    }

    // 2. Recuperiamo il nome esatto del nostro team
    let nomeMioTeam = "MIO TEAM";
    if (typeof impostazioniGioco !== 'undefined' && impostazioniGioco.nomeTeam && impostazioniGioco.nomeTeam.trim() !== "") {
        nomeMioTeam = impostazioniGioco.nomeTeam.toUpperCase();
    } else {
        const inputNome = document.getElementById('nome-team');
        if (inputNome && inputNome.value.trim() !== "") nomeMioTeam = inputNome.value.toUpperCase();
    }

    // 3. Cerchiamo in quale girone (A-H) si trova la squadra dell'utente
    let lettere = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let mioGironeTrovato = null;
    let squadreDelMioGirone = [];

    for (let l of lettere) {
        let contieneUtente = strutturaGironi[l].some(squadra => squadra.nome.toUpperCase() === nomeMioTeam);
        if (contieneUtente) {
            mioGironeTrovato = l;
            // Estraiamo solo i nomi delle 4 squadre di quel girone
            squadreDelMioGirone = strutturaGironi[l].map(squadra => squadra.nome);
            break;
        }
    }

    // Se per qualche motivo strano non lo trova, usiamo un fallback di sicurezza
    if (!mioGironeTrovato) {
        alert("Non ho trovato il tuo team nei gironi. Assicurati che il sorteggio sia finito!");
        return;
    }

    // 4. Nascondi la schermata del sorteggio generale e mostra il nostro girone
    document.getElementById('schermata-gironi').style.display = 'none';
    document.getElementById('schermata-mio-girone').style.display = 'block';
    
    // Aggiorna il titolo della schermata per mostrare la lettera del girone
    const titolo = document.querySelector('#schermata-mio-girone h1');
    if (titolo) titolo.innerText = `🏆 GESTIONE GIRONE ${mioGironeTrovato}`;

    // 5. Fai partire la generazione di calendario e classifica con le 4 SQUADRE VERE!
    inizializzaGirone(squadreDelMioGirone);
    
    console.log(`Mondiale iniziato! Trovato nel Girone ${mioGironeTrovato} con:`, squadreDelMioGirone);
}