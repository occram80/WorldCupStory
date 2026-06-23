// ==========================================
// ENGINE PARTITE - VERSIONE LIVE LIGHT (AGGIORNATO)
// ==========================================
let timerPartita = null;
let minutoCorrente = 0;
let golCasa = 0;
let golFuori = 0;
let squadraCasaNome = "";
let squadraFuoriNome = "";

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
function preparaMatchLive(casa, fuori) {
    squadraCasaNome = casa;
    squadraFuoriNome = fuori;
    minutoCorrente = 0;
    golCasa = 0;
    golFuori = 0;

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

// 2. FA PARTIRE IL CRONOMETRO FAST (1 minuto di gioco = 100 millisecondi reali)
function startCronometroPartita() {
    const btnInizio = document.getElementById('btn-inizio-partita');
    if (btnInizio) btnInizio.style.display = "none"; // Nasconde il tasto start

    document.getElementById('live-box-cronaca').innerHTML = ""; // Pulisce la cronaca

    clearInterval(timerPartita);
    
    timerPartita = setInterval(() => {
        minutoCorrente++;
        
        // Aggiorna il display del tempo
        let minFormattato = minutoCorrente < 10 ? "0" + minutoCorrente : minutoCorrente;
        document.getElementById('live-cronometro').innerText = `${minFormattato}:00 (${minutoCorrente}')`;

        // Controlla se c'è un'azione da scrivere a questo minuto
        let azione = frasiCronaca.find(f => f.min === minutoCorrente);
        if (azione) {
            const box = document.getElementById('live-box-cronaca');
            
            if (azione.tipo === "gol") {
                golCasa++;
                document.getElementById('live-risultato').innerText = `${golCasa} - ${golFuori}`;
                box.innerHTML += `<div style="color: #ffcc00; font-weight: bold; margin-bottom: 4px;">[${minutoCorrente}'] ⚽ GOL! ${squadraCasaNome}: ${azione.testo}</div>`;
            } else {
                box.innerHTML += `<div style="color: white; margin-bottom: 4px;">[${minutoCorrente}'] 🛑 ${azione.testo}</div>`;
            }
            box.scrollTop = box.scrollHeight;
        }

        // Fine partita a 90 minuti
        if (minutoCorrente >= 90) {
            clearInterval(timerPartita);
            finePartitaTest();
        }
    }, 100);
}

// 3. FINE PARTITA: MOSTRA IL TASTO PER TORNARE INDIETRO
function finePartitaTest() {
    const box = document.getElementById('live-box-cronaca');
    box.innerHTML += `<div style="color: #00f2ff; font-weight: bold; text-align: center; margin-top: 10px;">🏆 MATCH TERMINATO! Punteggio finale: ${golCasa} - ${golFuori}</div>`;
    
    // Bottone temporaneo per tornare al girone
    box.innerHTML += `
        <div style="text-align: center; margin-top: 15px;">
            <button onclick="tornaAlGironeDopoPartita()" style="background: #ffcc00; color: black; border: none; padding: 10px 20px; font-weight: bold; border-radius: 5px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                ↩️ Torna al Girone
            </button>
        </div>
    `;
    box.scrollTop = box.scrollHeight;
}

// 4. FUNZIONE PER TORNARE AL GIRONE
function tornaAlGironeDopoPartita() {
    document.getElementById('schermata-partita-live').style.display = 'none';
    document.getElementById('schermata-mio-girone').style.display = 'block';
}