// Database delle Squadre per il progetto Mondiali
const databaseSquadre = {
    "Italia 1982": {
    modulo: "4-3-3",
    rosa: [
        // TITOLARI STORICI (I primi 11)
        { nome: "Zoff", ruolo: ["POR"], att: 10, dif: 90, res: 80 },
        { nome: "Gentile", ruolo: ["DIF", "TER"], att: 40, dif: 92, res: 88 },
        { nome: "Scirea", ruolo: ["DIF"], att: 50, dif: 90, res: 85 },
        { nome: "Collovati", ruolo: ["DIF"], att: 30, dif: 88, res: 82 },
        { nome: "Cabrini", ruolo: ["DIF", "TER"], att: 65, dif: 82, res: 85 },
        { nome: "Oriali", ruolo: ["CEN", "MED"], att: 60, dif: 85, res: 90 },
        { nome: "Tardelli", ruolo: ["CEN"], att: 75, dif: 80, res: 92 },
        { nome: "Conti", ruolo: ["ALA", "EST"], att: 85, dif: 40, res: 85 },
        { nome: "Antognoni", ruolo: ["CEN", "COC"], att: 88, dif: 50, res: 80 },
        { nome: "Graziani", ruolo: ["ATT", "ALA"], att: 80, dif: 50, res: 85 },
        { nome: "Rossi", ruolo: ["ATT"], att: 92, dif: 20, res: 80 },
        
        // PANCHINA E RISERVE AMPLIATE (I successivi 7)
        { nome: "Bordon", ruolo: ["POR"], att: 10, dif: 82, res: 80 },
        { nome: "Baresi F.", ruolo: ["DIF"], att: 45, dif: 85, res: 84 },
        { nome: "Vierchowod", ruolo: ["DIF"], att: 25, dif: 86, res: 88 },
        { nome: "Marini", ruolo: ["CEN", "MED"], att: 55, dif: 81, res: 86 },
        { nome: "Dossena", ruolo: ["CEN"], att: 72, dif: 60, res: 83 },
        { nome: "Causio", ruolo: ["ALA", "EST"], att: 81, dif: 45, res: 78 },
        { nome: "Altobelli", ruolo: ["ATT"], att: 86, dif: 25, res: 84 }
    ]
},"Italia 1982": {
    modulo: "4-3-3",
    rosa: [
        // TITOLARI STORICI (I primi 11)
        { nome: "Zoff", ruolo: ["POR"], att: 10, dif: 90, res: 80 },
        { nome: "Gentile", ruolo: ["DIF", "TER"], att: 40, dif: 92, res: 88 },
        { nome: "Scirea", ruolo: ["DIF"], att: 50, dif: 90, res: 85 },
        { nome: "Collovati", ruolo: ["DIF"], att: 30, dif: 88, res: 82 },
        { nome: "Cabrini", ruolo: ["DIF", "TER"], att: 65, dif: 82, res: 85 },
        { nome: "Oriali", ruolo: ["CEN", "MED"], att: 60, dif: 85, res: 90 },
        { nome: "Tardelli", ruolo: ["CEN"], att: 75, dif: 80, res: 92 },
        { nome: "Conti", ruolo: ["ALA", "EST"], att: 85, dif: 40, res: 85 },
        { nome: "Antognoni", ruolo: ["CEN", "COC"], att: 88, dif: 50, res: 80 },
        { nome: "Graziani", ruolo: ["ATT", "ALA"], att: 80, dif: 50, res: 85 },
        { nome: "Rossi", ruolo: ["ATT"], att: 92, dif: 20, res: 80 },
        
        // PANCHINA E RISERVE AMPLIATE (I successivi 7)
        { nome: "Bordon", ruolo: ["POR"], att: 10, dif: 82, res: 80 },
        { nome: "Baresi F.", ruolo: ["DIF"], att: 45, dif: 85, res: 84 },
        { nome: "Vierchowod", ruolo: ["DIF"], att: 25, dif: 86, res: 88 },
        { nome: "Marini", ruolo: ["CEN", "MED"], att: 55, dif: 81, res: 86 },
        { nome: "Dossena", ruolo: ["CEN"], att: 72, dif: 60, res: 83 },
        { nome: "Causio", ruolo: ["ALA", "EST"], att: 81, dif: 45, res: 78 },
        { nome: "Altobelli", ruolo: ["ATT"], att: 86, dif: 25, res: 84 }
    ]
},
   "Brasile 1970": {
    modulo: "4-2-4",
    rosa: [
        // TITOLARI ORIGINALI (I primi 11)
        { nome: "Felix", ruolo: ["POR"], att: 10, dif: 80, res: 75 },
        { nome: "Carlos Alberto", ruolo: ["DIF", "TER"], att: 80, dif: 85, res: 88 },
        { nome: "Brito", ruolo: ["DIF"], att: 30, dif: 88, res: 80 },
        { nome: "Piazza", ruolo: ["DIF", "MED"], att: 40, dif: 86, res: 84 },
        { nome: "Everaldo", ruolo: ["DIF", "TER"], att: 50, dif: 82, res: 80 },
        { nome: "Clodoaldo", ruolo: ["MED", "CEN"], att: 60, dif: 85, res: 88 },
        { nome: "Gerson", ruolo: ["CEN", "COC"], att: 88, dif: 60, res: 85 },
        { nome: "Jairzinho", ruolo: ["ALA", "ATT"], att: 95, dif: 30, res: 88 },
        { nome: "Pelé", ruolo: ["COC", "ATT"], att: 99, dif: 30, res: 90 },
        { nome: "Tostao", ruolo: ["ATT", "COC"], att: 90, dif: 30, res: 82 },
        { nome: "Rivelino", ruolo: ["ALA", "CEN"], att: 92, dif: 35, res: 85 },
        
        // PANCHINA AGGIUNTA (7 GIOCATORI PER ARRIVARE A 18)
        { nome: "Ado", ruolo: ["POR"], att: 5, dif: 78, res: 70 },
        { nome: "Marco Antonio", ruolo: ["DIF", "TER"], att: 65, dif: 80, res: 82 },
        { nome: "Baldocchi", ruolo: ["DIF"], att: 20, dif: 82, res: 78 },
        { nome: "Fontana", ruolo: ["DIF"], att: 25, dif: 81, res: 75 },
        { nome: "Paulo Cezar", ruolo: ["CEN", "ALA"], att: 82, dif: 45, res: 83 },
        { nome: "Jose Guilherme", ruolo: ["MED", "CEN"], att: 55, dif: 78, res: 80 },
        { nome: "Edu", ruolo: ["ALA", "ATT"], att: 85, dif: 25, res: 80 }
    ]
},
  "Argentina 1986": {
    modulo: "4-4-2",
    rosa: [
        // TITOLARI ORIGINALI (I primi 11)
        { nome: "Pumpido", ruolo: ["POR"], att: 10, dif: 85, res: 80 },
        { nome: "Cuciuffo", ruolo: ["DIF", "TER"], att: 40, dif: 84, res: 85 },
        { nome: "Brown", ruolo: ["DIF"], att: 30, dif: 88, res: 85 },
        { nome: "Ruggeri", ruolo: ["DIF"], att: 40, dif: 89, res: 88 },
        { nome: "Olarticoechea", ruolo: ["DIF", "TER"], att: 50, dif: 80, res: 85 },
        { nome: "Batista", ruolo: ["MED"], att: 50, dif: 86, res: 85 },
        { nome: "Giusti", ruolo: ["CEN", "TER"], att: 60, dif: 80, res: 90 },
        { nome: "Enrique", ruolo: ["CEN"], att: 65, dif: 75, res: 88 },
        { nome: "Burruchaga", ruolo: ["COC", "ALA"], att: 85, dif: 50, res: 85 },
        { nome: "Maradona", ruolo: ["COC", "ATT"], att: 99, dif: 20, res: 90 },
        { nome: "Valdano", ruolo: ["ATT", "ALA"], att: 90, dif: 30, res: 85 },
        
        // PANCHINA AGGIUNTA (7 GIOCATORI REALI PER ARRIVARE A 18)
        { nome: "Islas", ruolo: ["POR"], att: 5, dif: 80, res: 75 },
        { nome: "Clausen", ruolo: ["DIF", "TER"], att: 55, dif: 81, res: 82 },
        { nome: "Garrè", ruolo: ["DIF"], att: 35, dif: 79, res: 80 },
        { nome: "Tapia", ruolo: ["CEN", "COC"], att: 78, dif: 55, res: 82 },
        { nome: "Trobbiani", ruolo: ["CEN"], att: 70, dif: 62, res: 80 },
        { nome: "Borghi", ruolo: ["ALA", "COC"], att: 82, dif: 40, res: 78 },
        { nome: "Pasculli", ruolo: ["ATT"], att: 83, dif: 25, res: 81 }
    ]
},
   "Germania 1990": {
    modulo: "4-4-2",
    rosa: [
        // TITOLARI ORIGINALI (I primi 11)
        { nome: "Illgner", ruolo: ["POR"], att: 10, dif: 88, res: 80 },
        { nome: "Augenthaler", ruolo: ["DIF"], att: 50, dif: 90, res: 85 },
        { nome: "Kohler", ruolo: ["DIF"], att: 30, dif: 92, res: 88 },
        { nome: "Buchwald", ruolo: ["DIF", "MED"], att: 40, dif: 88, res: 90 },
        { nome: "Brehme", ruolo: ["DIF", "TER"], att: 75, dif: 85, res: 88 },
        { nome: "Matthaus", ruolo: ["CEN", "MED"], att: 90, dif: 85, res: 95 },
        { nome: "Hassler", ruolo: ["COC", "ALA"], att: 85, dif: 40, res: 85 },
        { nome: "Littbarski", ruolo: ["ALA", "COC"], att: 88, dif: 30, res: 82 },
        { nome: "Bein", ruolo: ["COC"], att: 82, dif: 40, res: 80 },
        { nome: "Voller", ruolo: ["ATT"], att: 89, dif: 30, res: 85 },
        { nome: "Klinsmann", ruolo: ["ATT"], att: 91, dif: 25, res: 88 },
        
        // PANCHINA AGGIUNTA (7 GIOCATORI REALI PER ARRIVARE A 18)
        { nome: "Aumann", ruolo: ["POR"], att: 5, dif: 83, res: 75 },
        { nome: "Berthold", ruolo: ["DIF", "TER"], att: 58, dif: 84, res: 85 },
        { nome: "Pflugler", ruolo: ["DIF"], att: 40, dif: 80, res: 82 },
        { nome: "Thon", ruolo: ["CEN", "DIF"], att: 78, dif: 70, res: 84 },
        { nome: "Moller", ruolo: ["COC", "CEN"], att: 84, dif: 45, res: 83 },
        { nome: "Riedle", ruolo: ["ATT"], att: 86, dif: 30, res: 82 },
        { nome: "Mill", ruolo: ["ATT"], att: 78, dif: 32, res: 80 }
    ]
},
  "Francia 1998": {
    modulo: "4-4-2",
    rosa: [
        // TITOLARI ORIGINALI (I primi 11)
        { nome: "Barthez", ruolo: ["POR"], att: 10, dif: 88, res: 82 },
        { nome: "Thuram", ruolo: ["DIF", "TER"], att: 55, dif: 91, res: 88 },
        { nome: "Blanc", ruolo: ["DIF"], att: 50, dif: 89, res: 84 },
        { nome: "Desailly", ruolo: ["DIF"], att: 40, dif: 92, res: 87 },
        { nome: "Lizarazu", ruolo: ["DIF", "TER"], att: 60, dif: 86, res: 86 },
        { nome: "Deschamps", ruolo: ["CEN", "MED"], att: 45, dif: 88, res: 90 },
        { nome: "Petit", ruolo: ["CEN"], att: 65, dif: 82, res: 85 },
        { nome: "Karembeu", ruolo: ["CEN", "EST"], att: 55, dif: 80, res: 88 },
        { nome: "Zidane", ruolo: ["CEN", "COC"], att: 90, dif: 55, res: 84 },
        { nome: "Djorkaeff", ruolo: ["ATT", "COC"], att: 84, dif: 45, res: 82 },
        { nome: "Guivarc'h", ruolo: ["ATT"], att: 78, dif: 35, res: 80 },
        
        // PANCHINA AGGIUNTA (7 GIOCATORI REALI PER ARRIVARE A 18)
        { nome: "Lama", ruolo: ["POR"], att: 5, dif: 82, res: 75 },
        { nome: "Leboeuf", ruolo: ["DIF"], att: 45, dif: 83, res: 80 },
        { nome: "Candela", ruolo: ["DIF", "TER"], att: 62, dif: 78, res: 82 },
        { nome: "Vieira", ruolo: ["MED", "CEN"], att: 65, dif: 84, res: 85 },
        { nome: "Pires", ruolo: ["ALA", "CEN"], att: 81, dif: 45, res: 80 },
        { nome: "Henry", ruolo: ["ATT", "ALA"], att: 85, dif: 30, res: 84 },
        { nome: "Trezeguet", ruolo: ["ATT"], att: 84, dif: 20, res: 80 }
    ]
},
   "Brasile 2002": {
    modulo: "3-4-3",
    rosa: [
        // TITOLARI ORIGINALI (I primi 11)
        { nome: "Marcos", ruolo: ["POR"], att: 10, dif: 85, res: 80 },
        { nome: "Lucio", ruolo: ["DIF"], att: 60, dif: 88, res: 86 },
        { nome: "Edmilson", ruolo: ["DIF", "MED"], att: 55, dif: 84, res: 82 },
        { nome: "Roque Junior", ruolo: ["DIF"], att: 35, dif: 82, res: 80 },
        { nome: "Cafu", ruolo: ["DIF", "TER", "EST"], att: 75, dif: 84, res: 95 },
        { nome: "Roberto Carlos", ruolo: ["DIF", "TER", "EST"], att: 82, dif: 80, res: 93 },
        { nome: "Gilberto Silva", ruolo: ["CEN", "MED"], att: 50, dif: 86, res: 88 },
        { nome: "Kleberson", ruolo: ["CEN"], att: 65, dif: 75, res: 86 },
        { nome: "Ronaldinho", ruolo: ["ATT", "COC", "ALA"], att: 92, dif: 40, res: 83 },
        { nome: "Rivaldo", ruolo: ["ATT", "ALA"], att: 90, dif: 45, res: 82 },
        { nome: "Ronaldo", ruolo: ["ATT"], att: 96, dif: 25, res: 80 },
        
        // PANCHINA AGGIUNTA (7 GIOCATORI REALI PER ARRIVARE A 18)
        { nome: "Dida", ruolo: ["POR"], att: 5, dif: 83, res: 78 },
        { nome: "Junior", ruolo: ["DIF", "TER"], att: 68, dif: 76, res: 82 },
        { nome: "Anderson Polga", ruolo: ["DIF"], att: 25, dif: 78, res: 80 },
        { nome: "Vampeta", ruolo: ["CEN", "MED"], att: 64, dif: 76, res: 82 },
        { nome: "Juninho Paulista", ruolo: ["COC", "CEN"], att: 83, dif: 50, res: 80 },
        { nome: "Kaka", ruolo: ["COC", "CEN"], att: 85, dif: 40, res: 84 },
        { nome: "Denilson", ruolo: ["ALA", "EST"], att: 82, dif: 30, res: 81 }
    ]
},
   "Italia 2006": {
    modulo: "4-4-2",
    rosa: [
        // TITOLARI ORIGINALI (I primi 11)
        { nome: "Buffon", ruolo: ["POR"], att: 10, dif: 95, res: 85 },
        { nome: "Zambrotta", ruolo: ["DIF", "TER", "EST"], att: 70, dif: 88, res: 92 },
        { nome: "Cannavaro", ruolo: ["DIF"], att: 40, dif: 96, res: 90 },
        { nome: "Materazzi", ruolo: ["DIF"], att: 60, dif: 90, res: 85 },
        { nome: "Grosso", ruolo: ["DIF", "TER", "EST"], att: 72, dif: 82, res: 88 },
        { nome: "Gattuso", ruolo: ["CEN", "MED"], att: 40, dif: 92, res: 96 },
        { nome: "Pirlo", ruolo: ["CEN"], att: 80, dif: 65, res: 85 },
        { nome: "Camoranesi", ruolo: ["CEN", "EST", "ALA"], att: 78, dif: 60, res: 86 },
        { nome: "Perrotta", ruolo: ["CEN", "EST"], att: 70, dif: 75, res: 92 },
        { nome: "Totti", ruolo: ["ATT", "COC"], att: 91, dif: 45, res: 82 },
        { nome: "Toni", ruolo: ["ATT"], att: 90, dif: 30, res: 84 },
        
        // PANCHINA AGGIUNTA (7 GIOCATORI REALI PER ARRIVARE A 18)
        { nome: "Peruzzi", ruolo: ["POR"], att: 5, dif: 84, res: 75 },
        { nome: "Nesta", ruolo: ["DIF"], att: 35, dif: 92, res: 80 },
        { nome: "Barzagli", ruolo: ["DIF"], att: 25, dif: 84, res: 82 },
        { nome: "De Rossi", ruolo: ["MED", "CEN"], att: 74, dif: 84, res: 88 },
        { nome: "Barone", ruolo: ["CEN"], att: 60, dif: 70, res: 82 },
        { nome: "Del Piero", ruolo: ["ATT", "ALA"], att: 88, dif: 35, res: 80 },
        { nome: "Gilardino", ruolo: ["ATT"], att: 85, dif: 25, res: 83 }
    ]
},
    "Argentina 2022": [
        { nome: "E. Martinez", ruolo: ["POR"], att: 10, dif: 88, res: 85 },
        { nome: "Molina", ruolo: ["DIF", "TER", "EST"], att: 68, dif: 80, res: 88 },
        { nome: "Romero", ruolo: ["DIF"], att: 45, dif: 89, res: 86 },
        { nome: "Otamendi", ruolo: ["DIF"], att: 50, dif: 87, res: 84 },
        { nome: "Tagliafico", ruolo: ["DIF", "TER"], att: 60, dif: 82, res: 85 },
        { nome: "De Paul", ruolo: ["CEN", "EST"], att: 75, dif: 78, res: 94 }, // Ottimo anche come esterno di destra
        { nome: "Enzo Fernandez", ruolo: ["CEN", "MED"], att: 78, dif: 82, res: 88 },
        { nome: "Mac Allister", ruolo: ["CEN"], att: 80, dif: 74, res: 86 },
        { nome: "Di Maria", ruolo: ["ALA", "EST"], att: 88, dif: 45, res: 82 }, // L'esterno/ala perfetto
        { nome: "Messi", ruolo: ["ATT", "COC"], att: 95, dif: 30, res: 80 },
        { nome: "Alvarez", ruolo: ["ATT"], att: 88, dif: 45, res: 88 }
    ],
     "Francia 2026": [
        { nome: "Maignan", ruolo: ["POR"], att: 10, dif: 91, res: 84 },
        { nome: "Koundé", ruolo: ["DIF", "TER"], att: 60, dif: 86, res: 88 },
        { nome: "Upamecano", ruolo: ["DIF"], att: 45, dif: 87, res: 85 },
        { nome: "Saliba", ruolo: ["DIF"], att: 40, dif: 92, res: 88 },
        { nome: "T. Hernandez", ruolo: ["DIF", "TER", "EST"], att: 82, dif: 80, res: 91 }, // Esterno devastante
        { nome: "Tchouaméni", ruolo: ["CEN", "MED"], att: 65, dif: 88, res: 89 },
        { nome: "Camavinga", ruolo: ["CEN", "MED"], att: 72, dif: 84, res: 90 },
        { nome: "Dembélé", ruolo: ["ALA", "EST"], att: 86, dif: 35, res: 82 }, // Velocità pura sulla fascia
        { nome: "Griezmann", ruolo: ["CEN", "COC"], att: 88, dif: 60, res: 86 }, // Tuttofare offensivo (COC)
        { nome: "Mbappé", ruolo: ["ATT", "ALA"], att: 97, dif: 25, res: 88 },
        { nome: "Thuram K.", ruolo: ["ATT"], att: 84, dif: 40, res: 85 }
    ],
    "Spagna 2026": [
        { nome: "Unai Simon", ruolo: ["POR"], att: 10, dif: 87, res: 82 },
        { nome: "Carvajal", ruolo: ["DIF", "TER"], att: 68, dif: 89, res: 88 },
        { nome: "Le Normand", ruolo: ["DIF"], att: 40, dif: 86, res: 84 },
        { nome: "Laporte", ruolo: ["DIF"], att: 50, dif: 88, res: 85 },
        { nome: "Cucurella", ruolo: ["DIF", "TER"], att: 65, dif: 84, res: 90 },
        { nome: "Rodri", ruolo: ["CEN", "MED"], att: 82, dif: 93, res: 94 }, // Il cervello del centrocampo
        { nome: "Pedri", ruolo: ["CEN"], att: 80, dif: 70, res: 86 },
        { nome: "Dani Olmo", ruolo: ["CEN", "COC", "EST"], att: 85, dif: 50, res: 84 }, // Esterno/Trequartista creativo
        { nome: "Lamine Yamal", ruolo: ["ALA", "EST"], att: 90, dif: 40, res: 85 }, // Esterno/Ala fortissimo
        { nome: "Nico Williams", ruolo: ["ALA", "EST"], att: 89, dif: 38, res: 86 }, // Altro esterno perfetto
        { nome: "Morata", ruolo: ["ATT"], att: 85, dif: 45, res: 87 }
    ],
    "Inghilterra 2026": [
        { nome: "Pickford", ruolo: ["POR"], att: 10, dif: 85, res: 83 },
        { nome: "Walker", ruolo: ["DIF", "TER"], att: 60, dif: 90, res: 92 },
        { nome: "John Stones", ruolo: ["DIF", "MED"], att: 65, dif: 88, res: 86 },
        { nome: "Guehi", ruolo: ["DIF"], att: 35, dif: 85, res: 84 },
        { nome: "Trippier", ruolo: ["DIF", "TER", "EST"], att: 72, dif: 82, res: 85 },
        { nome: "Rice", ruolo: ["CEN", "MED"], att: 70, dif: 90, res: 93 },
        { nome: "Mainoo", ruolo: ["CEN"], att: 74, dif: 76, res: 85 },
        { nome: "Bellingham", ruolo: ["CEN", "COC"], att: 92, dif: 75, res: 92 }, // Centrocampista totale / COC
        { nome: "Saka", ruolo: ["ALA", "EST"], att: 88, dif: 50, res: 88 }, // Perfetto esterno destro
        { nome: "Foden", ruolo: ["ALA", "EST", "COC"], att: 90, dif: 45, res: 86 }, // Esterno sinistro di qualità
        { nome: "Harry Kane", ruolo: ["ATT"], att: 94, dif: 35, res: 84 }
    ],
    "Brasile 2026": [
        { nome: "Alisson", ruolo: ["POR"], att: 10, dif: 92, res: 83 },
        { nome: "Danilo", ruolo: ["DIF", "TER"], att: 55, dif: 85, res: 86 },
        { nome: "Marquinhos", ruolo: ["DIF"], att: 50, dif: 89, res: 87 },
        { nome: "Gabriel", ruolo: ["DIF"], att: 45, dif: 88, res: 85 },
        { nome: "Arana", ruolo: ["DIF", "TER"], att: 65, dif: 80, res: 84 },
        { nome: "Bruno Guimaraes", ruolo: ["CEN", "MED"], att: 72, dif: 83, res: 88 },
        { nome: "Paquetá", ruolo: ["CEN", "COC"], att: 80, dif: 65, res: 85 },
        { nome: "Rodrygo", ruolo: ["ATT", "ALA", "EST"], att: 88, dif: 40, res: 86 }, // Esterno d'attacco
        { nome: "Raphinha", ruolo: ["ALA", "EST"], att: 85, dif: 45, res: 88 }, // Esterno di centrocampo/attacco
        { nome: "Vinicius Jr", ruolo: ["ATT", "ALA"], att: 95, dif: 30, res: 89 },
        { nome: "Endrick", ruolo: ["ATT"], att: 86, dif: 25, res: 82 }
    ],
     "Argentina 2026": [
        { nome: "E. Martinez ", ruolo: ["POR"], att: 10, dif: 90, res: 86 },
        { nome: "Molina ", ruolo: ["DIF", "TER", "EST"], att: 70, dif: 81, res: 89 },
        { nome: "Cuti Romero ", ruolo: ["DIF"], att: 45, dif: 91, res: 88 },
        { nome: "Lisandro Martinez", ruolo: ["DIF"], att: 50, dif: 88, res: 86 },
        { nome: "Tagliafico ", ruolo: ["DIF", "TER"], att: 60, dif: 83, res: 84 },
        { nome: "De Paul ", ruolo: ["CEN", "EST"], att: 76, dif: 80, res: 95 },
        { nome: "Enzo F. ", ruolo: ["CEN", "MED"], att: 80, dif: 83, res: 89 },
        { nome: "Mac Allister ", ruolo: ["CEN"], att: 82, dif: 76, res: 88 },
        { nome: "Nico Gonzalez", ruolo: ["ALA", "EST"], att: 80, dif: 55, res: 90 }, // Esterno di corsa e sacrificio
        { nome: "Messi ", ruolo: ["ATT", "COC"], att: 93, dif: 25, res: 78 },
        { nome: "Julian Alvarez ", ruolo: ["ATT"], att: 89, dif: 50, res: 91 }
    ],
    "Italia 2021": [
        { nome: "Donnarumma", ruolo: ["POR"], att: 10, dif: 93, res: 85 },
        { nome: "Di Lorenzo", ruolo: ["DIF", "TER"], att: 65, dif: 84, res: 90 },
        { nome: "Bonucci", ruolo: ["DIF"], att: 55, dif: 88, res: 83 },
        { nome: "Chiellini", ruolo: ["DIF"], att: 30, dif: 92, res: 82 },
        { nome: "Spinazzola", ruolo: ["DIF", "TER", "EST"], att: 80, dif: 78, res: 88 }, // Freccia a sinistra (EST)
        { nome: "Barella", ruolo: ["CEN"], att: 78, dif: 82, res: 95 },
        { nome: "Jorginho", ruolo: ["CEN", "MED"], att: 75, dif: 80, res: 88 },
        { nome: "Verratti", ruolo: ["CEN"], att: 78, dif: 82, res: 85 },
        { nome: "Chiesa", ruolo: ["ALA", "EST"], att: 88, dif: 50, res: 90 }, // Perfetto per spaccare le fasce
        { nome: "Insigne", ruolo: ["ALA", "COC"], att: 84, dif: 40, res: 82 },
        { nome: "Immobile", ruolo: ["ATT"], att: 86, dif: 30, res: 85 }
    ],
    "Portogallo 2016": [
        { nome: "Rui Patricio", ruolo: ["POR"], att: 10, dif: 86, res: 84 },
        { nome: "Cedric", ruolo: ["DIF", "TER"], att: 60, dif: 80, res: 85 },
        { nome: "Pepe", ruolo: ["DIF"], att: 40, dif: 93, res: 90 },
        { nome: "Fonte", ruolo: ["DIF"], att: 30, dif: 85, res: 83 },
        { nome: "Raphael Guerreiro", ruolo: ["DIF", "TER", "EST"], att: 75, dif: 78, res: 86 }, // Terzino/Esterno tecnico
        { nome: "William Carvalho", ruolo: ["CEN", "MED"], att: 50, dif: 84, res: 85 },
        { nome: "Adrien Silva", ruolo: ["CEN"], att: 68, dif: 78, res: 86 },
        { nome: "Joao Mario", ruolo: ["CEN", "EST"], att: 74, dif: 72, res: 88 }, // Esterno di manovra
        { nome: "Renato Sanches", ruolo: ["CEN"], att: 75, dif: 75, res: 90 },
        { nome: "Nani", ruolo: ["ALA", "EST", "ATT"], att: 84, dif: 45, res: 84 },
        { nome: "Cristiano Ronaldo", ruolo: ["ATT", "ALA"], att: 96, dif: 30, res: 91 }
    ],
    "Brasile 1994": [
        { nome: "Taffarel", ruolo: ["POR"], att: 10, dif: 86, res: 84 },
        { nome: "Jorginho 94", ruolo: ["DIF", "TER", "EST"], att: 75, dif: 82, res: 88 },
        { nome: "Aldair", ruolo: ["DIF"], att: 40, dif: 89, res: 85 },
        { nome: "Marcio Santos", ruolo: ["DIF"], att: 35, dif: 86, res: 84 },
        { nome: "Branco", ruolo: ["DIF", "TER"], att: 70, dif: 80, res: 83 },
        { nome: "Mauro Silva", ruolo: ["CEN", "MED"], att: 45, dif: 88, res: 92 },
        { nome: "Dunga", ruolo: ["CEN", "MED"], att: 60, dif: 87, res: 94 },
        { nome: "Mazingho", ruolo: ["CEN"], att: 65, dif: 78, res: 86 },
        { nome: "Zinho", ruolo: ["CEN", "EST"], att: 72, dif: 70, res: 85 }, // L'esterno tattico del 4-4-2 di Parreira
        { nome: "Bebeto", ruolo: ["ATT"], att: 88, dif: 35, res: 84 },
        { nome: "Romario", ruolo: ["ATT"], att: 95, dif: 25, res: 82 }
    ],
     "Germania 2026": [
        { nome: "Ter Stegen", ruolo: ["POR"], att: 10, dif: 89, res: 84 },
        { nome: "Kimmich", ruolo: ["DIF", "TER", "CEN"], att: 78, dif: 86, res: 93 }, // Jolly totale
        { nome: "Tah", ruolo: ["DIF"], att: 40, dif: 87, res: 86 },
        { nome: "Rüdiger", ruolo: ["DIF"], att: 50, dif: 91, res: 89 },
        { nome: "Mittelstädt", ruolo: ["DIF", "TER", "EST"], att: 72, dif: 80, res: 85 },
        { nome: "Andrich", ruolo: ["CEN", "MED"], att: 65, dif: 84, res: 90 },
        { nome: "Kroos", ruolo: ["CEN"], att: 80, dif: 75, res: 82 }, // Geometrie perfette
        { nome: "Musiala", ruolo: ["CEN", "COC", "EST"], att: 90, dif: 40, res: 88 }, // Esterno/Trequartista devastante
        { nome: "Wirtz", ruolo: ["CEN", "COC", "EST"], att: 89, dif: 45, res: 87 }, // Altra stella sulle fasce o al centro
        { nome: "Havertz", ruolo: ["ATT", "COC"], att: 87, dif: 55, res: 86 },
        { nome: "Füllkrug", ruolo: ["ATT"], att: 85, dif: 35, res: 83 }
    ],
     "Olanda 1988": [
        { nome: "Van Breukelen", ruolo: ["POR"], att: 10, dif: 87, res: 84 },
        { nome: "Van Aerle", ruolo: ["DIF", "TER"], att: 55, dif: 82, res: 88 },
        { nome: "Rijkaard", ruolo: ["DIF", "MED", "CEN"], att: 75, dif: 92, res: 92 }, // Centrocampista totale
        { nome: "Koeman", ruolo: ["DIF"], att: 78, dif: 88, res: 86 }, // Difensore col vizio del gol
        { nome: "Van Tiggelen", ruolo: ["DIF", "TER"], att: 50, dif: 83, res: 85 },
        { nome: "Vanenburg", ruolo: ["CEN", "EST"], att: 78, dif: 65, res: 86 }, // Esterno di centrocampo
        { nome: "Wouters", ruolo: ["CEN", "MED"], att: 60, dif: 85, res: 90 },
        { nome: "Muhren", ruolo: ["CEN", "EST"], att: 74, dif: 70, res: 84 },
        { nome: "Gullit", ruolo: ["CEN", "COC", "ATT"], att: 92, dif: 75, res: 93 }, // Il Tulipano Nero (COC)
        { nome: "Van Basten", ruolo: ["ATT"], att: 96, dif: 30, res: 85 },
        { nome: "E. Koeman", ruolo: ["ATT", "ALA"], att: 82, dif: 45, res: 84 }
    ],
    "Italia 1990": [
        { nome: "Zenga", ruolo: ["POR"], att: 10, dif: 92, res: 85 },
        { nome: "Bergomi", ruolo: ["DIF", "TER"], att: 45, dif: 89, res: 90 },
        { nome: "Baresi", ruolo: ["DIF"], att: 50, dif: 94, res: 88 }, // Eleganza difensiva
        { nome: "Ferri", ruolo: ["DIF"], att: 35, dif: 88, res: 86 },
        { nome: "Maldini 90", ruolo: ["DIF", "TER", "EST"], att: 70, dif: 91, res: 92 }, // Muro a sinistra
        { nome: "De Agostini", ruolo: ["CEN", "EST"], att: 72, dif: 78, res: 88 },
        { nome: "De Napoli", ruolo: ["CEN", "MED"], att: 58, dif: 82, res: 93 },
        { nome: "Giannini", ruolo: ["CEN", "COC"], att: 82, dif: 70, res: 86 }, // Il Principe
        { nome: "Donadoni", ruolo: ["ALA", "EST"], att: 85, dif: 55, res: 89 }, // Esterno devastante
        { nome: "Baggio 90", ruolo: ["ATT", "COC"], att: 90, dif: 25, res: 82 },
        { nome: "Schillaci", ruolo: ["ATT"], att: 89, dif: 30, res: 86 } // Notti Magiche
    ],
    "Olanda 1974": [
        { nome: "Jongbloed", ruolo: ["POR"], att: 15, dif: 80, res: 82 },
        { nome: "Suurbier", ruolo: ["DIF", "TER"], att: 68, dif: 82, res: 91 },
        { nome: "Rijsbergen", ruolo: ["DIF"], att: 40, dif: 85, res: 86 },
        { nome: "Haan", ruolo: ["DIF", "MED"], att: 70, dif: 86, res: 89 },
        { nome: "Krol", ruolo: ["DIF", "TER", "EST"], att: 75, dif: 88, res: 90 },
        { nome: "Jansen", ruolo: ["CEN", "MED"], att: 62, dif: 83, res: 92 },
        { nome: "Neeskens", ruolo: ["CEN"], att: 84, dif: 80, res: 95 }, // Polmoni e gol
        { nome: "Van Hanegem", ruolo: ["CEN"], att: 80, dif: 74, res: 85 },
        { nome: "Rep", ruolo: ["ALA", "EST"], att: 86, dif: 45, res: 88 }, // Esterno d'attacco
        { nome: "Cruyff", ruolo: ["ATT", "COC"], att: 96, dif: 35, res: 90 }, // Il Profeta del Calcio Totale
        { nome: "Rensenbrink", ruolo: ["ALA", "EST"], att: 88, dif: 40, res: 86 }
    ],
    "Spagna 2010": [
        { nome: "Casillas", ruolo: ["POR"], att: 10, dif: 92, res: 84 },
        { nome: "Sergio Ramos 10", ruolo: ["DIF", "TER"], att: 72, dif: 89, res: 91 },
        { nome: "Piqué", ruolo: ["DIF"], att: 55, dif: 88, res: 85 },
        { nome: "Puyol", ruolo: ["DIF"], att: 35, dif: 92, res: 90 }, // Cuore e grinta
        { nome: "Capdevila", ruolo: ["DIF", "TER"], att: 62, dif: 82, res: 86 },
        { nome: "Busquets", ruolo: ["CEN", "MED"], att: 65, dif: 88, res: 88 },
        { nome: "Xavi", ruolo: ["CEN"], att: 82, dif: 78, res: 89 }, // Il maestro del tiqui-taca
        { nome: "Iniesta", ruolo: ["CEN", "COC", "EST"], att: 88, dif: 70, res: 90 }, // L'Illusionista sulle fasce o al centro
        { nome: "Pedro", ruolo: ["ALA", "EST"], att: 83, dif: 50, res: 87 },
        { nome: "Villa", ruolo: ["ATT", "ALA"], att: 92, dif: 30, res: 86 },
        { nome: "Torres", ruolo: ["ATT"], att: 88, dif: 25, res: 84 }
    ],
    "Germania 2014": [
        { nome: "Neuer", ruolo: ["POR"], att: 20, dif: 93, res: 86 }, // Portiere-Libero
        { nome: "Lahm", ruolo: ["DIF", "TER", "MED"], att: 70, dif: 91, res: 94 }, // Il Capitano perfetto
        { nome: "Boateng", ruolo: ["DIF"], att: 45, dif: 87, res: 86 },
        { nome: "Hummels", ruolo: ["DIF"], att: 55, dif: 89, res: 85 },
        { nome: "Höwedes", ruolo: ["DIF", "TER"], att: 40, dif: 83, res: 86 },
        { nome: "Khedira", ruolo: ["CEN", "MED"], att: 72, dif: 82, res: 88 },
        { nome: "Schweinsteiger", ruolo: ["CEN", "MED"], att: 78, dif: 85, res: 92 }, // Il Generale combattente
        { nome: "Kroos 14", ruolo: ["CEN", "COC"], att: 84, dif: 70, res: 86 },
        { nome: "Özil", ruolo: ["CEN", "COC", "EST"], att: 82, dif: 35, res: 82 }, // Visione pura di gioco
        { nome: "Müller", ruolo: ["ATT", "COC", "EST"], att: 88, dif: 60, res: 93 }, // Lo Spazio-Interprete
        { nome: "Klose", ruolo: ["ATT"], att: 90, dif: 40, res: 84 }
    ],
    "Germania 1974": [
        { nome: "Maier", ruolo: ["POR"], att: 10, dif: 90, res: 85 },
        { nome: "Vogts", ruolo: ["DIF", "TER"], att: 50, dif: 88, res: 91 },
        { nome: "Beckenbauer", ruolo: ["DIF", "MED"], att: 82, dif: 95, res: 93 }, // Il Kaiser assoluto
        { nome: "Schwarzenbeck", ruolo: ["DIF"], att: 30, dif: 86, res: 85 },
        { nome: "Breitner", ruolo: ["DIF", "TER", "CEN"], att: 78, dif: 84, res: 90 }, // Terzino-Mediano totale
        { nome: "Bonhof", ruolo: ["CEN", "MED"], att: 72, dif: 82, res: 91 },
        { nome: "Overath", ruolo: ["CEN"], att: 80, dif: 68, res: 85 },
        { nome: "Hoeness", ruolo: ["ALA", "EST"], att: 85, dif: 50, res: 88 }, // Velocità sulla fascia
        { nome: "Grabowski", ruolo: ["ALA", "EST"], att: 82, dif: 45, res: 86 },
        { nome: "Gerd Müller", ruolo: ["ATT"], att: 96, dif: 20, res: 82 }, // Il Bomber della nazione
        { nome: "Hölzenbein", ruolo: ["ATT", "ALA"], att: 80, dif: 40, res: 84 }
    ],
     "Brasile 1958": [
        { nome: "Gilmar", ruolo: ["POR"], att: 10, dif: 88, res: 80 },
        { nome: "Bellini", ruolo: ["DIF"], att: 35, dif: 90, res: 85 },
        { nome: "Orlando", ruolo: ["DIF"], att: 30, dif: 87, res: 84 },
        { nome: "Djalma Santos", ruolo: ["DIF", "TER"], att: 70, dif: 89, res: 88 },
        { nome: "Nilton Santos", ruolo: ["DIF", "TER"], att: 75, dif: 88, res: 87 },
        { nome: "Zito", ruolo: ["CEN", "MED"], att: 65, dif: 84, res: 88 },
        { nome: "Didi", ruolo: ["CEN"], att: 88, dif: 60, res: 85 },
        { nome: "Garrincha", ruolo: ["ALA", "EST"], att: 96, dif: 30, res: 88 },
        { nome: "Zagallo", ruolo: ["ALA", "CEN"], att: 82, dif: 65, res: 90 },
        { nome: "Pelé", ruolo: ["ATT", "COC"], att: 99, dif: 40, res: 90 },
        { nome: "Vavá", ruolo: ["ATT"], att: 90, dif: 25, res: 82 }
    ],
      "Brasile 1998": [
        { nome: "Taffarel", ruolo: ["POR"], att: 10, dif: 85, res: 80 },
        { nome: "Aldair", ruolo: ["DIF"], att: 40, dif: 88, res: 83 },
        { nome: "Junior Baiano", ruolo: ["DIF"], att: 45, dif: 82, res: 82 },
        { nome: "Cafu", ruolo: ["DIF", "TER"], att: 82, dif: 85, res: 95 },
        { nome: "Roberto Carlos", ruolo: ["DIF", "TER"], att: 88, dif: 80, res: 96 },
        { nome: "Cesar Sampaio", ruolo: ["CEN", "MED"], att: 60, dif: 84, res: 86 },
        { nome: "Dunga", ruolo: ["CEN", "MED"], att: 65, dif: 88, res: 90 },
        { nome: "Rivaldo", ruolo: ["COC", "ALA"], att: 92, dif: 45, res: 85 },
        { nome: "Leonardo", ruolo: ["CEN", "COC"], att: 85, dif: 60, res: 84 },
        { nome: "Bebeto", ruolo: ["ATT"], att: 86, dif: 30, res: 80 },
        { nome: "Ronaldo", ruolo: ["ATT"], att: 98, dif: 20, res: 88 }
    ],
    "Francia 2018": [
        { nome: "Lloris", ruolo: ["POR"], att: 10, dif: 87, res: 80 },
        { nome: "Varane", ruolo: ["DIF"], att: 35, dif: 90, res: 86 },
        { nome: "Umtiti", ruolo: ["DIF"], att: 30, dif: 86, res: 82 },
        { nome: "Pavard", ruolo: ["DIF", "TER"], att: 65, dif: 83, res: 85 },
        { nome: "Lucas Hernandez", ruolo: ["DIF", "TER"], att: 55, dif: 85, res: 86 },
        { nome: "Kanté", ruolo: ["CEN", "MED"], att: 55, dif: 92, res: 98 },
        { nome: "Pogba", ruolo: ["CEN"], att: 84, dif: 72, res: 85 },
        { nome: "Matuidi", ruolo: ["CEN", "EST"], att: 68, dif: 82, res: 92 },
        { nome: "Griezmann", ruolo: ["COC", "ATT"], att: 89, dif: 55, res: 88 },
        { nome: "Mbappé", ruolo: ["ALA", "ATT"], att: 94, dif: 30, res: 88 },
        { nome: "Giroud", ruolo: ["ATT"], att: 84, dif: 45, res: 84 }
    ],
    "Croazia 2018": [
        { nome: "Subasic", ruolo: ["POR"], att: 10, dif: 84, res: 82 },
        { nome: "Lovren", ruolo: ["DIF"], att: 30, dif: 84, res: 84 },
        { nome: "Vida", ruolo: ["DIF"], att: 35, dif: 83, res: 86 },
        { nome: "Vrsaljko", ruolo: ["DIF", "TER"], att: 65, dif: 81, res: 88 },
        { nome: "Strinic", ruolo: ["DIF", "TER"], att: 50, dif: 79, res: 82 },
        { nome: "Brozovic", ruolo: ["CEN", "MED"], att: 70, dif: 80, res: 96 },
        { nome: "Modric", ruolo: ["CEN", "COC"], att: 90, dif: 72, res: 92 },
        { nome: "Rakitic", ruolo: ["CEN"], att: 86, dif: 68, res: 88 },
        { nome: "Perisic", ruolo: ["ALA", "EST"], att: 85, dif: 62, res: 91 },
        { nome: "Rebic", ruolo: ["ALA", "ATT"], att: 81, dif: 50, res: 85 },
        { nome: "Mandzukic", ruolo: ["ATT"], att: 85, dif: 65, res: 90 }
    ],
    "Inghilterra 1966": [
        { nome: "Banks", ruolo: ["POR"], att: 10, dif: 92, res: 85 },
        { nome: "Moore", ruolo: ["DIF"], att: 55, dif: 94, res: 88 },
        { nome: "Jack Charlton", ruolo: ["DIF"], att: 30, dif: 88, res: 85 },
        { nome: "Cohen", ruolo: ["DIF", "TER"], att: 60, dif: 85, res: 86 },
        { nome: "Wilson", ruolo: ["DIF", "TER"], att: 58, dif: 86, res: 85 },
        { nome: "Stiles", ruolo: ["CEN", "MED"], att: 45, dif: 88, res: 92 },
        { nome: "Bobby Charlton", ruolo: ["CEN", "COC"], att: 92, dif: 60, res: 90 },
        { nome: "Peters", ruolo: ["CEN"], att: 80, dif: 70, res: 86 },
        { nome: "Ball", ruolo: ["ALA", "CEN"], att: 82, dif: 55, res: 94 },
        { nome: "Hunt", ruolo: ["ATT"], att: 86, dif: 35, res: 84 },
        { nome: "Hurst", ruolo: ["ATT"], att: 90, dif: 30, res: 85 }
    ],
    "Inghilterra 1996": [
        { nome: "Seaman", ruolo: ["POR"], att: 10, dif: 88, res: 82 },
        { nome: "Adams", ruolo: ["DIF"], att: 40, dif: 90, res: 86 },
        { nome: "Southgate", ruolo: ["DIF"], att: 35, dif: 86, res: 85 },
        { nome: "Gary Neville", ruolo: ["DIF", "TER"], att: 65, dif: 84, res: 88 },
        { nome: "Pearce", ruolo: ["DIF", "TER"], att: 68, dif: 85, res: 86 },
        { nome: "Ince", ruolo: ["CEN", "MED"], att: 62, dif: 84, res: 90 },
        { nome: "Gascoigne", ruolo: ["CEN", "COC"], att: 90, dif: 50, res: 82 },
        { nome: "Anderton", ruolo: ["ALA", "EST"], att: 80, dif: 60, res: 85 },
        { nome: "McManaman", ruolo: ["ALA", "EST"], att: 84, dif: 45, res: 86 },
        { nome: "Sheringham", ruolo: ["ATT", "COC"], att: 85, dif: 40, res: 82 },
        { nome: "Shearer", ruolo: ["ATT"], att: 94, dif: 20, res: 86 }
    ],
    "Olanda 2010": [
        { nome: "Stekelenburg", ruolo: ["POR"], att: 10, dif: 84, res: 82 },
        { nome: "Heitinga", ruolo: ["DIF"], att: 35, dif: 84, res: 85 },
        { nome: "Mathijsen", ruolo: ["DIF"], att: 25, dif: 83, res: 84 },
        { nome: "Van der Wiel", ruolo: ["DIF", "TER"], att: 70, dif: 80, res: 88 },
        { nome: "Van Bronckhorst", ruolo: ["DIF", "TER"], att: 74, dif: 82, res: 86 },
        { nome: "Van Bommel", ruolo: ["CEN", "MED"], att: 60, dif: 87, res: 92 },
        { nome: "De Jong", ruolo: ["CEN", "MED"], att: 50, dif: 89, res: 94 },
        { nome: "Sneijder", ruolo: ["COC", "CEN"], att: 92, dif: 50, res: 86 },
        { nome: "Robben", ruolo: ["ALA", "EST"], att: 94, dif: 35, res: 88 },
        { nome: "Kuyt", ruolo: ["ALA", "ATT"], att: 80, dif: 68, res: 96 },
        { nome: "Van Persie", ruolo: ["ATT"], att: 91, dif: 25, res: 84 }
    ],
    "Germania 2006": [
        { nome: "Lehmann", ruolo: ["POR"], att: 10, dif: 86, res: 80 },
        { nome: "Metzelder", ruolo: ["DIF"], att: 30, dif: 85, res: 83 },
        { nome: "Mertesacker", ruolo: ["DIF"], att: 25, dif: 86, res: 85 },
        { nome: "Friedrich", ruolo: ["DIF", "TER"], att: 55, dif: 83, res: 86 },
        { nome: "Lahm", ruolo: ["DIF", "TER"], att: 76, dif: 89, res: 94 },
        { nome: "Frings", ruolo: ["CEN", "MED"], att: 72, dif: 84, res: 91 },
        { nome: "Ballack", ruolo: ["CEN", "COC"], att: 88, dif: 75, res: 88 },
        { nome: "Schneider", ruolo: ["CEN", "EST"], att: 80, dif: 60, res: 85 },
        { nome: "Schweinsteiger", ruolo: ["CEN", "ALA"], att: 82, dif: 68, res: 88 },
        { nome: "Podolski", ruolo: ["ATT", "ALA"], att: 86, dif: 35, res: 84 },
        { nome: "Klose", ruolo: ["ATT"], att: 93, dif: 40, res: 86 }
    ]
};