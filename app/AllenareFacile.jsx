"use client";
import { useState, useCallback, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */
const EX = [
  // ═══ RISCALDAMENTO ═══
  { id: 1, title: "Traffico", desc: "Conduzione libera in uno spazio delimitato con arresto al segnale. Sviluppo schemi motori di base.", fullDesc: "Conduzione libera in rettangolo con arresto al segnale dell'istruttore.\n\nObiettivo: Sviluppo schemi motori di base e sensibilità piede-palla.\n\nOrganizzazione: Rettangolo di dimensioni variabili. Un pallone per bambino.\n\nSvolgimento: I bambini conducono la palla liberamente seguendo le indicazioni dell'istruttore. Al segnale devono arrestare la palla.\n\nVarianti:\n- Parti del piede: interno, esterno, suola, punta, collo\n- Velocità: piano o veloce\n- Direzioni: avanti, indietro, laterale\n- Spazio: vicino o lontano dai compagni\n- Modalità di arresto: suola, testa, petto, ginocchio, seduti sopra\n- Comandi con voce, suoni o colori\n- Per i più piccoli: portare la palla come un leone, una scimmia, una rana\n\nPunti chiave: Testa alta, tocchi frequenti, reattività al segnale.", cat: "Riscaldamento", ages: ["U8", "U10"], dur: "10 min", players: "Tutti", setup: "Coni per delimitare · 1 pallone a testa" },
  { id: 2, title: "La Palla Volante", desc: "Esercizi con le mani: lancio e afferro con diverse modalità per sviluppare coordinazione.", fullDesc: "Serie di esercizi con la palla usando le mani.\n\nObiettivo: Sviluppo coordinazione oculo-manuale e schemi motori.\n\nOrganizzazione: Ogni bambino con un pallone, disposti liberamente.\n\nSvolgimento:\n1. Lancio e afferro sopra la testa e al petto\n2. Lancio, batto le mani e afferro\n3. Lancio, batto le mani davanti e dietro e afferro\n4. Lancio, batto le mani sotto e sopra una gamba e afferro\n5. Lancio con una mano e afferro con l'altra o con due mani\n\nPunti chiave: Occhi sulla palla, mani morbide alla ricezione, progressione di difficoltà.", cat: "Riscaldamento", ages: ["U8", "U10"], dur: "8 min", players: "Tutti", setup: "1 pallone a testa" },
  { id: 3, title: "La Guida e il Passeggero", desc: "A coppie: chi ha la palla conduce, il compagno segue. Scambio ruoli alla porticina.", fullDesc: "Esercizio a coppie con un pallone.\n\nObiettivo: Conduzione, passaggio e ricezione.\n\nOrganizzazione: Coppie con un pallone. Porticine sparse nel campo.\n\nSvolgimento: Il bambino con palla conduce liberamente, il compagno lo segue. In prossimità di una porticina il compagno senza palla scatta, si posiziona nella porticina e riceve la palla. Diventa la nuova guida.\n\nPunti chiave: Testa alta per vedere le porticine, passaggio preciso, scatto e posizionamento.", cat: "Riscaldamento", ages: ["U8", "U10"], dur: "10 min", players: "Tutti", setup: "Porticine con coni · 1 pallone ogni 2" },
  { id: 4, title: "Conquisto i Castelli", desc: "Superare i guardiani nei castelli di coni conducendo la palla senza perderne il controllo.", fullDesc: "Gioco a punti con conduzione e contrasto.\n\nObiettivo: Superare l'avversario e proteggere la palla.\n\nOrganizzazione: Quadrati di coni (i castelli) sparsi nel campo. Dentro ogni castello un guardiano senza palla. Gli altri hanno un pallone.\n\nSvolgimento: I giocatori devono oltrepassare i castelli senza perdere il controllo della palla. Per ogni castello superato si guadagna 1 punto. Cambio ruoli periodico.\n\nVarianti:\n- Ogni volta che il guardiano prende palla si fa cambio\n\nPunti chiave: Protezione della palla col corpo, cambi di direzione, velocità di esecuzione.", cat: "Riscaldamento", ages: ["U8", "U10", "U12"], dur: "10 min", players: "8+", setup: "Coni per castelli · 1 pallone a testa" },
  { id: 5, title: "Il Forziere", desc: "4 squadre ai vertici corrono a conquistare palloni dal centro e portarli nella propria casa.", fullDesc: "Gioco competitivo a squadre.\n\nObiettivo: Dominio della palla e velocità.\n\nOrganizzazione: 4 gruppi ai vertici del rettangolo con aree delimitate (le case). Al centro il forziere con i palloni.\n\nSvolgimento: Al via partono i primi di ogni gruppo, prendono un pallone dal forziere e lo portano nella loro casa. Vince chi conquista più palloni.\n\nVarianti per i piccoli:\n- Contatti palla-corpo: su una mano, giro vita, sulla testa\n- Palleggio semplice e riprendere in mano\n- Guidando il pallone\n\nVarianti per i grandi:\n- Palleggiando con superfici diverse\n- 1 contro 1 con difensore davanti alla casa\n- Calciare in porta prima di depositare la palla\n\nPunti chiave: Rapidità, dominio sotto pressione, competizione positiva.", cat: "Riscaldamento", ages: ["U8", "U10", "U12", "U15"], dur: "12 min", players: "8+", setup: "Coni · palloni · pettorine" },
  { id: 6, title: "Il Semaforo", desc: "Conduzione con comandi a colori: rosso stop, giallo cammina, verde corri. Reattività e dominio.", fullDesc: "Gioco di conduzione con comandi colorati.\n\nObiettivo: Conduzione e reattività ai segnali.\n\nOrganizzazione: Tutti con pallone in un rettangolo. L'allenatore ha coni colorati.\n\nSvolgimento: I bambini guidano la palla liberamente. L'allenatore alza un cono: ROSSO = stop, GIALLO = camminare, VERDE = correre.\n\nVarianti per i piccoli:\n- Variazione superfici di contatto: suola, interno, esterno, tacco\n\nVarianti per i grandi:\n- Porte colorate: passare nella porta del colore indicato\n- L'istruttore si muove per il campo costringendo ad alzare la testa\n\nVarianti per gli over:\n- 1 contro 1: chi ha palla entra nelle porte, il compagno lo contrasta\n- Guida tra le porte e tiro in porta esterna\n\nPunti chiave: Testa alta, reattività, controllo palla a diverse velocità.", cat: "Riscaldamento", ages: ["U8", "U10", "U12", "U15"], dur: "10 min", players: "Tutti", setup: "Coni colorati · 1 pallone a testa · porticine" },
  { id: 7, title: "I 4 Castelli", desc: "4 gruppi si sfidano per rubare palloni dagli altri castelli e portarli nel proprio.", fullDesc: "Gioco competitivo a 4 squadre.\n\nObiettivo: Conduzione veloce e strategia.\n\nOrganizzazione: Quadrato con 4 cerchi agli angoli (i castelli). Palloni nei cerchi.\n\nSvolgimento: Ogni gruppo parte dal proprio angolo e cerca di rubare i palloni dagli altri castelli. Si parte uno alla volta. Alla fine si conta chi ha più palloni.\n\nVarianti:\n- Palloni guidati coi piedi\n- Direzioni vincolate: diagonale, verticale, orizzontale\n- Difensore al centro che ruba la palla\n- Guardiani davanti ai castelli per 1vs1\n\nPunti chiave: Velocità di esecuzione, scelta strategica del castello da attaccare, protezione palla.", cat: "Riscaldamento", ages: ["U8", "U10", "U12"], dur: "12 min", players: "8+", setup: "Coni · cerchi · palloni" },
  { id: 8, title: "Capitan Uncino", desc: "Dal vascello di coni i bambini calciano per colpire bersagli colorati. Precisione nel tiro.", fullDesc: "Gioco di tiro di precisione a tema piratesco.\n\nObiettivo: Precisione nel tiro.\n\nOrganizzazione: Un vascello delimitato con coni. I bambini (pirati) dentro con un pallone a testa. Coni colorati posizionati all'esterno come bersagli.\n\nSvolgimento: Al comando dell'istruttore i ragazzi calciano per colpire i coni del colore indicato.\n\nVarianti per i piccoli:\n- Superficie di contatto libera, tiri casuali\n\nVarianti per i grandi:\n- Tiro alla porta colorata con portiere mobile\n\nVarianti per gli over:\n- Tiro a tempo e di precisione con difensore\n\nPunti chiave: Posizione del corpo, superficie di contatto, mirare il bersaglio.", cat: "Riscaldamento", ages: ["U8", "U10", "U12", "U15"], dur: "10 min", players: "Tutti", setup: "Coni colorati · palloni" },
  { id: 9, title: "Riscaldamento Ritmato a Squadre", desc: "Conduzione in righe ordinate con esercizi di mobilità. Tipo pre-partita con palla al piede.", fullDesc: "Riscaldamento strutturato di gruppo.\n\nObiettivo: Attivazione con palla, mantenimento delle distanze e concetto di linea.\n\nOrganizzazione: Ragazzi su 2-3 righe ordinate, ognuno con palla al piede.\n\nSvolgimento: Si muovono avanti e indietro curando le distanze tra le righe e i compagni a fianco. Poi esercizi di mobilità braccia, busto, gambe mantenendo la palla tra i piedi.\n\nNota: Se il mantenimento delle distanze è difficile, si può iniziare individualmente.\n\nPunti chiave: Automatismo della palla al piede, concetto di linea, mobilità articolare.", cat: "Riscaldamento", ages: ["U12", "U15", "U18", "Adulti"], dur: "10 min", players: "Tutti", setup: "1 pallone a testa" },
  { id: 10, title: "Conduzione Progressiva", desc: "Guida con varianti progressive ogni 30 secondi: cambi direzione, alta frequenza, alzata e controllo.", fullDesc: "Conduzione con progressione di difficoltà.\n\nObiettivo: Dominio della palla e capacità di eseguire gesti in sequenza.\n\nOrganizzazione: Spazio delimitato, ogni ragazzo con pallone.\n\nSvolgimento: Guida inizialmente lenta. Ogni 30 secondi il mister aggiunge una variante:\n- Guida libera\n- Ogni 5 tocchi cambio di direzione\n- 10 tocchi ad alta frequenza\n- Cambio di senso con suola\n- Accelerazione per 5 passi\n- Fermo la palla e la alzo\n- Controllo a seguire con skip basso in fase di volo\n\nPunti chiave: Progressione graduale, esecuzione pulita prima della velocità.", cat: "Riscaldamento", ages: ["U12", "U15", "U18"], dur: "10 min", players: "Tutti", setup: "Coni · 1 pallone a testa" },

  // ═══ TECNICA ═══
  { id: 11, title: "Il Confine", desc: "In riga, calciare la palla senza superare la linea. Precisione nel tiro con diverse superfici del piede.", fullDesc: "Esercizio di precisione nel calcio.\n\nObiettivo: Tiro controllato e schemi motori di base.\n\nOrganizzazione: Bambini in riga, ognuno con una palla. Linea bersaglio davanti.\n\nSvolgimento: Calciare la palla in modo che non superi la linea posta davanti.\n\nVarianti:\n- Modalità di recupero: camminando, correndo, quadrupedia, strisciando, saltellando\n- Bersaglio diverso: entrare in un cerchio\n- Bersaglio in movimento (cerchi legati a una corda)\n- Posizione del corpo: frontale, di schiena, laterale\n- Parti del piede: interno, esterno, suola, punta, tacco\n\nPunti chiave: Dosare la forza del tiro, precisione, superfici di contatto diverse.", cat: "Tecnica", ages: ["U8", "U10"], dur: "8 min", players: "Tutti", setup: "Coni per linea · cerchi · palloni" },
  { id: 12, title: "Affonda la Flotta", desc: "Un gruppo attraversa il campo, l'altro calcia rasoterra per colpirli. Tiro e schivata.", fullDesc: "Gioco a squadre con tiro e schivata.\n\nObiettivo: Precisione nel tiro rasoterra e agilità nell'evitare.\n\nOrganizzazione: Due gruppi. La flotta in fila a fondo campo. I pirati sui lati lunghi con palloni.\n\nSvolgimento: La flotta deve attraversare il campo senza farsi colpire dai palloni calciati rasoterra dai pirati. Chi non viene colpito guadagna un punto. Poi cambio ruoli.\n\nVarianti:\n- Anche la flotta ha una palla da condurre\n- I pirati lanciano facendo rotolare la palla con le mani\n\nPunti chiave: Tiro rasoterra preciso, visione periferica, agilità.", cat: "Tecnica", ages: ["U8", "U10"], dur: "10 min", players: "8+", setup: "Coni · palloni" },
  { id: 13, title: "Sprint a Tema con Guida", desc: "3 file: il giocatore centrale scatta e decide il percorso, gli altri si adattano.", fullDesc: "Sprint reattivo con scelta del percorso.\n\nObiettivo: Conduzione, reazione e orientamento spazio-temporale.\n\nOrganizzazione: Tre file parallele con coni come percorsi alternativi.\n\nSvolgimento: Il giocatore centrale scatta e decide il percorso. Gli altri due si adattano scegliendo le alternative.\n\nPunti chiave: Reattività, lettura del movimento del compagno, velocità di adattamento.", cat: "Tecnica", ages: ["U10", "U12", "U15"], dur: "8 min", players: "6+", setup: "Coni per percorsi" },
  { id: 14, title: "Palleggio a Tempo", desc: "Palleggi individuali con sfide a tempo: massimo numero in 2 minuti con varianti progressive.", fullDesc: "Sfida di palleggio individuale.\n\nObiettivo: Dominio della palla, equilibrio e coordinazione.\n\nOrganizzazione: Ogni ragazzo con un pallone nello spazio delimitato.\n\nSvolgimento:\n1. Massimo numero di palleggi in 2 minuti\n2. Sequenze da 5 palleggi col piede preferito\n3. Sequenze 3 destro - 3 sinistro\n4. Sequenze da 8 palleggi alternando i piedi\n\nVarianti:\n- Parti del corpo diverse\n- Fermi, camminando o in corsa\n- Piramide: piede → coscia → testa e viceversa\n\nPunti chiave: Tocco morbido, ginocchia leggermente piegate, concentrazione.", cat: "Tecnica", ages: ["U10", "U12", "U15"], dur: "10 min", players: "Tutti", setup: "1 pallone a testa" },
  { id: 15, title: "Palleggio e Passaggio al Volo", desc: "Due file: palleggiare fino alla zona e passare al volo al compagno di fronte.", fullDesc: "Combinazione palleggio e trasmissione.\n\nObiettivo: Dominio, ricezione e passaggio.\n\nOrganizzazione: Due file una di fronte all'altra con zona delimitata centrale.\n\nSvolgimento: Palleggiare fino alla zona e passare al volo al compagno che riceve e riparte.\n\nVarianti:\n- Parti del corpo diverse per palleggiare\n- Camminando o in corsa\n- Tempo limite per arrivare al passaggio\n- Tiro in porta invece del passaggio\n\nPunti chiave: Controllo nel palleggio in movimento, qualità del passaggio, ricezione pulita.", cat: "Tecnica", ages: ["U12", "U15", "U18"], dur: "10 min", players: "6+", setup: "Coni per zone · palloni" },
  { id: 16, title: "Percorso Slalom con Passaggio", desc: "Due gruppi: slalom tra coni e passaggio al compagno della fila opposta, poi cambio.", fullDesc: "Percorso tecnico con trasmissione.\n\nObiettivo: Conduzione, passaggio e accoppiamento motorio.\n\nOrganizzazione: Due gruppi posizionati di fronte con file di coni centrali.\n\nSvolgimento: Al via partono i primi due, effettuano lo slalom. Alla fine passaggio al compagno della fila opposta, scatto e cambio fila.\n\nVarianti:\n- Interno ed esterno alternati\n- Dentro la porticina e suola dietro\n\nPunti chiave: Fluidità nello slalom, passaggio preciso dopo la conduzione, scatto dopo il passaggio.", cat: "Tecnica", ages: ["U10", "U12", "U15"], dur: "10 min", players: "6+", setup: "Coni · palloni" },
  { id: 17, title: "Tecnica a Tre", desc: "Gruppi di 3: il giocatore al centro riceve e restituisce alternandosi tra i due compagni.", fullDesc: "Esercizio tecnico in gruppo di 3.\n\nObiettivo: Tecnica individuale e capacità coordinative.\n\nOrganizzazione: Gruppi di 3 (o 2) disposti in linea. Il compagno al centro si muove tra i due.\n\nSvolgimento: Il giocatore al centro passa da un compagno all'altro eseguendo gli esercizi indicati.\n\nVarianti:\n- Parti del piede: interno, esterno, suola, testa, punta, collo\n- Numero di tocchi prima di ridare\n- Diversi tipi di ricezione: interno, testa, petto\n- Al volo, controbalzo, rasoterra\n- Stop e colpi di testa\n\nPunti chiave: Qualità del primo tocco, orientamento del corpo, ritmo dell'esercizio.", cat: "Tecnica", ages: ["U10", "U12", "U15"], dur: "10 min", players: "6+", setup: "Cinesini · palloni" },
  { id: 18, title: "Conduzione ai 4 Angoli", desc: "4 gruppi ai vertici del rettangolo conducono verso il cono centrale con cambi di direzione.", fullDesc: "Esercizio di conduzione e trasmissione.\n\nObiettivo: Dominio, conduzione, trasmissione e ricezione.\n\nOrganizzazione: Coppie o gruppetti ai 4 angoli dello spazio. Un cono centrale.\n\nSvolgimento: Partenza simultanea, conduzione al cono centrale, cambio di direzione e ritorno.\n\nTipi di conduzione: collo, esterno, interno, suola, un tocco dx e un tocco sx. Avanti, indietro, laterale.\nCambi di direzione: libero, suola, uncino, interno sotto il corpo, esterno.\nFinte: forbice (passo), doppia forbice (doppio passo).\n\nVarianti con trasmissione:\n- Cambio direzione e condurre al gruppetto di destra/sinistra\n- Passaggio al compagno posto frontalmente e scatto\n\nPunti chiave: Esecuzione pulita, testa alta, cambio di ritmo dopo il cambio direzione.", cat: "Tecnica", ages: ["U10", "U12", "U15", "U18"], dur: "12 min", players: "8+", setup: "Coni · palloni" },
  { id: 19, title: "Conduzione e Trasmissione in File", desc: "Due file frontali: condurre, consegnare o passare al compagno con varianti di transizione.", fullDesc: "Esercizio di conduzione con trasmissione e transizione.\n\nObiettivo: Conduzione veloce, trasmissione precisa, transizione.\n\nOrganizzazione: Gruppi divisi in due file di 3 una di fronte all'altra.\n\nSvolgimento progressivo:\n1. Condurre veloce, fermare davanti al compagno, andare in fila\n2. Spostarsi su un fianco (palla coperta) e con suola attivare il compagno\n3. Dopo il passaggio scattare indietro (transizione) e frenata (temporeggiare)\n4. Passaggio a metà tragitto e scatto in avanti\n5. Passaggio a metà e scatto indietro con frenata\n\nPunti chiave: Protezione della palla, qualità del passaggio di suola, transizione rapida.", cat: "Tecnica", ages: ["U10", "U12", "U15"], dur: "12 min", players: "6+", setup: "Coni · palloni" },
  { id: 20, title: "Il Bowling", desc: "A file, i bambini calciano per abbattere coni disposti come birilli. Precisione e divertimento.", fullDesc: "Gioco di precisione nel tiro.\n\nObiettivo: Trasmissione precisa.\n\nOrganizzazione: File di bambini. Coni disposti come birilli da bowling davanti.\n\nSvolgimento: Ogni fila ha una palla. I bambini calciando provano ad abbattere i coni.\n\nVarianti per i piccoli:\n- Bowling casuale con varianti di superficie\n- Cambio distanza per dare possibilità di successo a tutti\n\nVarianti per i grandi:\n- Bowling colorato: coni colorati hanno punteggi diversi\n\nVarianti per gli over:\n- Staffetta: abbattere coni a distanze progressive. Vince chi finisce per primo\n\nPunti chiave: Precisione, dosaggio della forza, scelta della superficie di contatto.", cat: "Tecnica", ages: ["U8", "U10", "U12", "U15"], dur: "10 min", players: "6+", setup: "Coni · palloni" },
  { id: 21, title: "Controllo Orientato", desc: "Ricezione dentro un quadrato con controllo orientato per uscire dal lato destro o sinistro.", fullDesc: "Esercizio di ricezione e orientamento.\n\nObiettivo: Controllo orientato della palla.\n\nOrganizzazione: Quadrato con coni. Compagno che passa dall'esterno. Ricevitore dentro.\n\nSvolgimento: Trasmissione al compagno nel quadrato che deve controllare e orientarsi per uscire dal lato destro o sinistro.\n\nPunti chiave: Corpo aperto alla ricezione, primo tocco nella direzione di uscita, rapidità decisionale.", cat: "Tecnica", ages: ["U10", "U12", "U15", "U18"], dur: "10 min", players: "4+", setup: "Coni per quadrato · palloni" },
  { id: 22, title: "Labirinto Colorato 1vs1", desc: "Condurre attraverso porte del proprio colore e concludere in porta. Poi 1vs1 col difensore.", fullDesc: "Percorso tecnico con conclusione.\n\nObiettivo: Conduzione, orientamento e finalizzazione.\n\nOrganizzazione: File identificate da colori. Porte colorate incrociate tra loro. Porta finale.\n\nSvolgimento: Condurre la palla attraverso le porte del proprio colore (i percorsi si incrociano) e concludere in porta. Progressione: aggiungere un difensore davanti alla porta per 1vs1.\n\nPunti chiave: Testa alta per riconoscere le porte, velocità di esecuzione, finalizzazione precisa.", cat: "Tecnica", ages: ["U10", "U12", "U15"], dur: "12 min", players: "6+", setup: "Cinesini colorati · porte · palloni" },
  { id: 23, title: "Conduzione Ritmica", desc: "Coni alternati a 3 e 6 metri: 3 tocchi nello spazio lungo, 6 in quello corto. Ritmo e adattamento.", fullDesc: "Esercizio di conduzione con variazione del ritmo.\n\nObiettivo: Ritmo, adattamento e differenziazione.\n\nOrganizzazione: Fila con pallone. Coni alternati a distanza di 3 e 6 metri.\n\nSvolgimento: Condurre effettuando 3 tocchi nello spazio più lungo e 6 in quello più corto.\n\nVarianti:\n- Distanze dei coni diverse\n- Numero di tocchi variabile\n- Conduzione + trasmissione oppure conduzione + tiro\n\nPunti chiave: Adattare la frequenza dei tocchi allo spazio, fluidità di esecuzione.", cat: "Tecnica", ages: ["U12", "U15", "U18"], dur: "10 min", players: "4+", setup: "Coni · palloni · porta" },
  { id: 24, title: "Smarcamento a 5 nel Quadrato", desc: "5 giocatori in un quadrato 25x25: il centrale riceve e smista a 2 tocchi, poi a 1 tocco.", fullDesc: "Esercitazione tecnica per smarcamento, ricezione e passaggio.\n\nObiettivo: Smarcamento, ricezione orientata e trasmissione rapida.\n\nOrganizzazione: 5 calciatori in un quadrato 25x25m. Uno al centro, 4 sugli angoli con pallone.\n\nSvolgimento: Il calciatore al centro riceve andando incontro ai compagni e con 2 tocchi passa al compagno senza palla. Lavoro di 1 minuto, poi cambio.\n\nProgressione: dopo il primo giro si ripete con un solo tocco.\n\nPunti chiave: Smarcamento continuo, ricezione orientata, velocità di pensiero.", cat: "Tecnica", ages: ["U12", "U15", "U18", "Adulti"], dur: "10 min", players: "5", setup: "Coni per quadrato 25x25m · palloni" },
  { id: 25, title: "Gara a Squadre con Passaggio e Tiro", desc: "Conduzione tra coni, passaggio al compagno in area, controllo, girata e tiro.", fullDesc: "Gara a squadre tecnico-tattica.\n\nObiettivo: Guida della palla, trasmissione e tiro in porta.\n\nOrganizzazione: Due squadre. Metà giocatori sulla trequarti con coni, gli altri vicino all'area.\n\nSvolgimento: Il primo conduce tra i coni, passaggio al giocatore che viene incontro. Controllo, girata e tiro.\n\nVarianti per i più grandi:\n- Gol valido con massimo 2 tocchi\n- Piede destro da una parte, sinistro dall'altra\n- Gol valido anche su ribattuta\n\nPunti chiave: Qualità della conduzione tra coni, passaggio preciso, tiro rapido.", cat: "Tecnica", ages: ["U12", "U15", "U18"], dur: "12 min", players: "8+", setup: "Coni · porta · palloni" },
  { id: 26, title: "Lavoro Tecnico in Cerchio", desc: "Gruppo esterno con palla, interni in movimento: passaggio, ricezione e progressione tecnica.", fullDesc: "Esercizio tecnico di gruppo in cerchio.\n\nObiettivo: Trasmissione e ricezione con progressione.\n\nOrganizzazione: Cerchio di metà campo. Due gruppi uguali: uno sul perimetro con palla, l'altro all'interno.\n\nSvolgimento: Chi è dentro si muove in corsa e va a cercare un compagno con la palla. Si trasmettono la palla e chi è in mezzo cerca un altro compagno.\n\nProgressione palla a terra: di prima, controllo orientato e passaggio. Alternare destro e sinistro.\n\nProgressione palla in mano (grandi): interno, collo, testa, petto e passaggio, coscia e passaggio.\n\nOgni minuto si invertono i giocatori e si cambia il gesto.\n\nPunti chiave: Movimento continuo, alternare i piedi, qualità del gesto tecnico.", cat: "Tecnica", ages: ["U12", "U15", "U18", "Adulti"], dur: "12 min", players: "10+", setup: "Cinesini per cerchio · palloni" },
  { id: 27, title: "Passaggi Colorati", desc: "4 squadre con pettorine si scambiano la palla seguendo una sequenza di colori prestabilita.", fullDesc: "Esercizio di possesso con sequenza cromatica.\n\nObiettivo: Visione periferica, comunicazione e smarcamento.\n\nOrganizzazione: 4 gruppi con pettorine diverse. 8 palloni.\n\nSvolgimento: I ragazzi si muovono nello spazio scambiandosi la palla con le mani secondo la sequenza indicata (es. ROSSO → VERDE → GIALLO → BLU). Chi deve ricevere si avvicina, chi non deve si allontana.\n\nVarianti:\n- Inserire gradualmente più palloni\n- Partita di possesso 2 colori vs 2 colori\n- 3 colori con sequenza vs 1 colore\n\nPunti chiave: Visione periferica, comunicazione verbale, smarcamento attivo.", cat: "Tecnica", ages: ["U12", "U15", "U18"], dur: "12 min", players: "12+", setup: "Pettorine 4 colori · palloni" },
  { id: 28, title: "Torello Cognitivo", desc: "Passaggi in cerchio con spazio libero: dopo il passaggio ci si muove nello spazio vuoto.", fullDesc: "Torello con componente cognitiva.\n\nObiettivo: Passaggio, smarcamento e lettura dello spazio.\n\nOrganizzazione: Cerchio con coppie di cinesini che delimitano spazi uguali. Un giocatore per spazio, uno spazio libero (es. 10 giocatori, 11 spazi).\n\nSvolgimento: Passaggi liberi ai compagni nel cerchio. Dopo il passaggio ci si muove nello spazio libero.\n\nVarianti:\n- Sequenza di colori con casacche (bianco → rosso → grigio)\n- Giocatore al centro che cerca di conquistare palla\n- Chi perde possesso o non si muove va al centro\n\nPunti chiave: Leggere lo spazio libero, passaggio preciso, movimento immediato dopo il passaggio.", cat: "Tecnica", ages: ["U12", "U15", "U18", "Adulti"], dur: "12 min", players: "10+", setup: "Cinesini · pettorine · palloni" },

  // ═══ TATTICA ═══
  { id: 29, title: "Lo Sparviero", desc: "Tutti con palla devono attraversare il campo. Lo sparviero al centro cerca di rubare i palloni.", fullDesc: "Gioco di 1vs1 multiplo per i piccoli.\n\nObiettivo: Superare l'avversario e proteggere la palla.\n\nOrganizzazione: Tutti in riga con palla a fondo campo. Uno sparviero al centro senza palla.\n\nSvolgimento: Al via, i bambini conducono la palla per raggiungere l'altro lato senza farsela rubare. Chi viene intercettato si unisce allo sparviero.\n\nPunti chiave: Protezione della palla, cambi di direzione, velocità, visione periferica.", cat: "Tattica", ages: ["U8", "U10"], dur: "10 min", players: "8+", setup: "Coni per campo · 1 pallone a testa" },
  { id: 30, title: "Il Guardiano del Ponte", desc: "Attraversare il ponte difeso conducendo la palla senza farsela rubare. Progressione verso 1vs1.", fullDesc: "Progressione didattica verso l'1vs1.\n\nObiettivo: Superare l'avversario, intercettare la palla, fare meta o gol.\n\nOrganizzazione: Area rettangolare (il ponte) con un guardiano dentro. Gli altri in riga con palla.\n\nSvolgimento: Partono in conduzione e devono attraversare il ponte senza farsi rubare la palla. Chi ci riesce ottiene un punto.\n\nProgressione:\n- Tanti contro uno → si riduce gradualmente fino a 1vs1\n- Due ponti con due guardiani\n- Porticine colorate dove fare gol\n- Porte a fondo campo per il tiro\n\nVarianti:\n- Zone di meta diverse\n- Porticine colorate con ingresso e uscita obbligati\n\nPunti chiave: Conduzione protetta, cambio di direzione per eludere il guardiano, velocità.", cat: "Tattica", ages: ["U8", "U10", "U12"], dur: "12 min", players: "8+", setup: "Coni per ponte · porticine · palloni" },
  { id: 31, title: "1vs1 con 4 Porticine", desc: "Quadrato 10x10 con porticine sui lati. 4 attaccanti vs 3 difensori con assegnazione dinamica.", fullDesc: "1vs1 con scelta della porticina.\n\nObiettivo: Conduzione, tiro e orientamento.\n\nOrganizzazione: Quadrato 10x10m con 4 porticine sui lati. 3 ragazzi esterni palleggiano, 4 interni conducono.\n\nSvolgimento: Al via, i 3 esterni vanno a difendere una porticina ciascuno. I 4 attaccanti scelgono quale difensore affrontare. Chi non trova nessun difensore da affrontare perde.\n\nPunti chiave: Decisione rapida, scelta della porticina libera, 1vs1 in spazio ridotto.", cat: "Tattica", ages: ["U10", "U12", "U15"], dur: "10 min", players: "7", setup: "Coni per quadrato e porticine · palloni" },
  { id: 32, title: "1vs1 Frontale con Meta", desc: "Due giocatori si affrontano: l'attaccante deve portare la palla nella zona di meta oltre il difensore.", fullDesc: "1vs1 classico con varianti progressive.\n\nObiettivo: Dribbling, finta, superamento dell'avversario.\n\nOrganizzazione: Campetto con zone di meta. Due giocatori uno di fronte all'altro.\n\nSvolgimento: L'attaccante cerca di portare la palla nella zona di meta.\n\nVarianti:\n- Gol fermando la palla sulla linea, in porticina, in zona prestabilita, colpendo cono, in porta\n- Partenza laterale, centrale, destra, sinistra\n- Campo quadrato, rotondo, triangolare\n- Difensore passivo, semi-attivo o attivo\n- Distanza vicini o lontani\n- Partenza frontale, dorsale, laterale\n\nPunti chiave: Puntare il difensore con velocità, accorciare i tocchi in prossimità, finta e cambio di direzione.", cat: "Tattica", ages: ["U8", "U10", "U12", "U15", "U18"], dur: "10 min", players: "4+", setup: "Coni · porticine · palloni" },
  { id: 33, title: "1vs1 col Sostegno (Jolly)", desc: "Due bambini in 1vs1, chi ha palla può usare un jolly esterno. Progressione verso il 2vs1.", fullDesc: "1vs1 con appoggio esterno.\n\nObiettivo: Dribbling, finta, uso del compagno di sostegno.\n\nOrganizzazione: Campo ridotto con porta. Due bambini + un jolly con casacca diversa.\n\nSvolgimento: 1vs1 dove chi ha la palla può avvalersi del jolly. Azione finalizzata al tiro. Cambio del jolly periodico.\n\nPunti chiave: Scegliere se driblare o usare il jolly, timing del passaggio, finalizzazione.", cat: "Tattica", ages: ["U10", "U12", "U15"], dur: "10 min", players: "6+", setup: "Coni · porta · pettorine" },
  { id: 34, title: "1vs1 con Porta Colorata", desc: "Il mister chiama un colore: l'attaccante deve segnare nella porta di quel colore superando il difensore.", fullDesc: "Esercizio situazionale con componente cognitiva.\n\nObiettivo: 1vs1 con lettura del contesto e reazione al comando.\n\nOrganizzazione: Due porte colorate. Attaccante e difensore.\n\nSvolgimento:\n1. Partenza in conduzione: il mister chiama un colore, l'attaccante segna nella porta di quel colore\n2. Partenza in trasmissione: chi ha palla passa al compagno che attacca la porta indicata\n3. Trasmissione colorata: si passa al compagno del colore chiamato che attacca la porta opposta\n\nVarianti: Difensore con partenza laterale o da dietro. Comando SOLO (girarsi e tirare) o UOMO (sponda e 1vs1).\n\nPunti chiave: Reattività al comando, decisione rapida, finalizzazione.", cat: "Tattica", ages: ["U12", "U15", "U18"], dur: "12 min", players: "4+", setup: "Porte colorate · coni · palloni" },
  { id: 35, title: "1vs1 per Conquista dello Spazio", desc: "Superare il difensore dentro un quadrato e guidare la palla nella zona di meta.", fullDesc: "1vs1 per il superamento e la conquista dello spazio.\n\nObiettivo: Guidare la palla nella zona di meta attraversando il quadrato.\n\nOrganizzazione: Quadrato delimitato con zona di meta. Difensore che parte da posizioni diverse.\n\nSvolgimento: L'attaccante deve superare il difensore e portare la palla nella zona di meta.\n\nPosizioni del difensore: frontale, laterale dx/sx, dietro, all'interno del quadrato.\n\nVarianti:\n- Entrambi aggirano un cono e corrono al pallone\n- L'attaccante deve mantenere la palla nel quadrato il più a lungo possibile\n- Forme diverse: quadrato, rettangolo largo/corto, lungo/stretto\n\nPunti chiave per l'attaccante: velocità di esecuzione, protezione della palla.\nPunti chiave per il difensore: correre veloce, rallentare, temporeggiare, posizione obliqua.", cat: "Tattica", ages: ["U10", "U12", "U15", "U18"], dur: "10 min", players: "4+", setup: "Coni per quadrato e meta · palloni" },
  { id: 36, title: "1vs1 Difesa Estrema della Porta", desc: "Il difensore difende la porta senza portiere: può solo chiudere lo specchio o rubare palla.", fullDesc: "1vs1 con difensore sulla linea di porta.\n\nObiettivo: Tiro di precisione e dribbling sotto pressione.\n\nOrganizzazione: Porta difesa solo da un difensore (senza portiere).\n\nSvolgimento: Il difensore può solo chiudere lo specchio della porta oppure rubare palla.\n\nVarianti:\n- Zone di partenza diverse\n- Tempo di esecuzione limitato o 2° difensore in recupero\n- Il difensore trasmette all'attaccante (rasoterra, mezza altezza, alto) prima di difendere\n\nPunti chiave: Trovare l'angolo di tiro, velocità decisionale, precisione.", cat: "Tattica", ages: ["U12", "U15", "U18"], dur: "10 min", players: "4+", setup: "Porta · coni · palloni" },
  { id: 37, title: "1vs1 + Portiere con Transizione", desc: "Due porte, due portieri. Attaccante e difensore: se il difensore ruba palla, contrattacca.", fullDesc: "1vs1 bidirezionale con transizione.\n\nObiettivo: Conduzione, finta, dribbling, recupero palla e transizione.\n\nOrganizzazione: Campo con due porte e due portieri. Due gruppi ai lati.\n\nSvolgimento in possesso: Attaccante e difensore partono insieme, l'attaccante cerca il gol, il difensore se recupera palla contrattacca.\n\nSvolgimento in ricezione: Il difensore conduce e passa all'attaccante, poi corre a difendere. L'attaccante riceve e cerca il gol.\n\nVarianti:\n- Tempo per arrivare al tiro\n- Controllo con un tocco e tiro immediato\n- Inserire un jolly per 2vs1\n\nPunti chiave: Transizione rapida attacco-difesa, qualità del primo tocco, finalizzazione.", cat: "Tattica", ages: ["U12", "U15", "U18", "Adulti"], dur: "15 min", players: "6+", setup: "2 porte · portieri · coni · palloni" },
  { id: 38, title: "1vs1 Finalizzato al Cross", desc: "Sulla fascia laterale: superare il difensore nel quadrato e crossare per il compagno in area.", fullDesc: "1vs1 in fascia con cross finale.\n\nObiettivo: Dribbling in fascia, cross e conclusione.\n\nOrganizzazione: Fascia laterale con quadrato. Difensore nel quadrato. Attaccante che riceve il cross in area.\n\nSvolgimento: L'attaccante supera il difensore nel quadrato e crossa a centro area per il compagno (cross radente sul 1° palo, a parabola sul 2°).\n\nVarianti:\n- Difensore da posizioni diverse: frontale, dietro, laterale\n- Difensore può agire anche fuori dal quadrato\n- Attaccante in area marcato da difensore passivo poi attivo\n\nPunti chiave per il crossatore: guida della palla, finta e dribbling, qualità del cross.\nPunti chiave per il finalizzatore: smarcamento e conclusione a rete.", cat: "Tattica", ages: ["U12", "U15", "U18", "Adulti"], dur: "12 min", players: "6+", setup: "Coni · porta · palloni" },
  { id: 39, title: "Uomo o Solo", desc: "A trasmette a B: se chiama SOLO, B si gira e tira. Se chiama UOMO, B risponda e A attacca in 1vs1.", fullDesc: "Esercizio situazionale con doppia opzione.\n\nObiettivo: Lettura del comando, finalizzazione e 1vs1.\n\nOrganizzazione: Giocatore A con pallone, giocatore B di fronte, porta con portiere.\n\nSvolgimento: A trasmette a B e chiama un comando:\n- SOLO: B si gira e affronta il portiere (1 vs portiere)\n- UOMO: B ritrasmette ad A che attacca in 1vs1 contro B\n\nPunti chiave: Reattività al comando, qualità della sponda, girata rapida, finalizzazione.", cat: "Tattica", ages: ["U12", "U15", "U18"], dur: "10 min", players: "4+", setup: "Porta · coni · palloni" },

  // ═══ PARTITA ═══
  { id: 40, title: "Partita con Porte a Triangolo", desc: "6vs6 con porte a tre lati: gol valido solo di prima. Stimola il tiro rapido.", fullDesc: "Partita a tema per stimolare il tiro.\n\nObiettivo: Tiro di prima intenzione.\n\nOrganizzazione: Campo 40x40m. Due porte a triangolo (3 lati, 6m di larghezza) a 8m dalla linea di fondo. Portieri. 6 vs 6.\n\nSvolgimento: Si gioca normalmente ma il gol è valido solo su tiro di prima.\n\nVarianti:\n- Limitare il numero di tocchi per aumentare le occasioni di tiro\n\nPunti chiave: Cercare la posizione di tiro, passaggio per il tiro del compagno, conclusione rapida.", cat: "Partita", ages: ["U12", "U15", "U18", "Adulti"], dur: "15 min", players: "12+", setup: "Campo 40x40m · porte a triangolo · pettorine" },
  { id: 41, title: "Partita con Gol nelle Porticine", desc: "Gol passando la palla in una porticina e il compagno la controlla dall'altra parte.", fullDesc: "Partita per allenare il passaggio.\n\nObiettivo: Passaggio preciso e ricezione.\n\nOrganizzazione: Porticine sparse nel campo. Numero di porte inferiore di 1 rispetto ai giocatori per squadra.\n\nSvolgimento: Il gol viene realizzato se la palla passa in una porticina e il compagno la controlla dall'altro lato.\n\nVarianti:\n- Porte colorate: il mister indica il colore valido o la sequenza\n\nPunti chiave: Visione di gioco, comunicazione, passaggio preciso nella porticina.", cat: "Partita", ages: ["U10", "U12", "U15", "U18"], dur: "15 min", players: "8+", setup: "Porticine colorate · pettorine · palloni" },
  { id: 42, title: "Partitella 5 vs 5", desc: "Mini partita con porte ridotte. Applicazione libera dei concetti di gioco.", fullDesc: "Mini partita con porte ridotte. Applicazione libera dei concetti di gioco.\n\nObiettivo: Mettere in pratica i concetti tattici e tecnici in situazione di gioco reale.\n\nOrganizzazione: Campo ridotto (30x20m). Due porte piccole (3m). Due squadre da 5.\n\nSvolgimento: Partita libera. L'allenatore interviene per richiamare concetti tattici. Partite da 3-4 minuti con pause brevi.\n\nVarianti:\n- Massimo 2 tocchi per gioco veloce\n- Obbligo di passaggio in profondità prima del tiro\n- Gol valido solo se tutta la squadra nella metà campo avversaria\n\nPunti chiave: Transizione rapida, occupazione degli spazi, comunicazione.", cat: "Partita", ages: ["U10", "U12", "U15"], dur: "15 min", players: "10", setup: "Campo 30x20m · 2 porte · pettorine" },
];

const CATS = ["Tutti", "Riscaldamento", "Tecnica", "Tattica", "Partita"];
const AGES = ["Tutti", "U8", "U10", "U12", "U15", "U18", "Adulti"];

const CAT_CFG = {
  Riscaldamento: { emoji: "🏃", badge: "bg-emerald-600", grad: "from-emerald-800 to-emerald-950" },
  Tecnica:       { emoji: "🎯", badge: "bg-sky-600",     grad: "from-sky-800 to-sky-950" },
  Tattica:       { emoji: "🧠", badge: "bg-violet-600",  grad: "from-violet-800 to-violet-950" },
  Partita:       { emoji: "🏟️", badge: "bg-amber-600",   grad: "from-amber-700 to-amber-950" },
};

const TODAY = new Date().toLocaleDateString("it-IT", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

/* ─── STYLES ───────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
.af{font-family:'DM Sans',system-ui,sans-serif}
@keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.af-up{animation:up .25s ease}
`;

/* ─── DETAIL MODAL ─────────────────────────────────────────── */
function DetailModal({ ex, onClose, onToggle, added }) {
  if (!ex) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="af-up relative bg-white w-full max-w-md md:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-500 active:bg-gray-100 shadow-sm text-sm">✕</button>
        <div className={`h-40 bg-gradient-to-br ${CAT_CFG[ex.cat].grad} flex items-center justify-center rounded-t-2xl`}>
          <span className="text-7xl opacity-80">{CAT_CFG[ex.cat].emoji}</span>
        </div>
        <div className="p-5">
          <span className={`inline-block text-xs font-semibold text-white px-2.5 py-1 rounded-md mb-3 ${CAT_CFG[ex.cat].badge}`}>{ex.cat}</span>
          <h2 className="text-lg font-bold text-gray-900 mb-1">{ex.title}</h2>
          <div className="flex gap-4 text-xs text-gray-400 mb-4">
            <span>⏱ {ex.dur}</span>
            <span>👥 {ex.players} giocatori</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 whitespace-pre-line">{ex.fullDesc}</p>
          {ex.setup && (
            <div className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2.5 mb-5 border border-gray-100">
              <span className="font-semibold text-gray-700">Materiale:</span> {ex.setup}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {ex.ages.map((a) => (
              <span key={a} className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{a}</span>
            ))}
          </div>
          <button onClick={() => { onToggle(ex); onClose(); }}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${
              added ? "bg-gray-100 text-red-500 active:bg-red-50" : "bg-indigo-600 text-white active:bg-indigo-700"
            }`}>
            {added ? "Rimuovi dalla sessione" : "+ Aggiungi alla sessione"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SESSION PAGE ─────────────────────────────────────────── */
function SessionPage({ session, setSession, notes, setNotes, onBack }) {
  const dragRef = useRef(null);
  const overRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [preview, setPreview] = useState(false);

  const up = (i) => { if (!i) return; const a=[...session]; [a[i-1],a[i]]=[a[i],a[i-1]]; setSession(a); };
  const dn = (i) => { if (i>=session.length-1) return; const a=[...session]; [a[i],a[i+1]]=[a[i+1],a[i]]; setSession(a); };
  const rm = (id) => setSession(p => p.filter(s => s.id !== id));

  const totalDur = session.reduce((s, e) => s + (parseInt(e.dur) || 0), 0);

  /* ── PREVIEW / PRINT VIEW ── */

  const handlePrint = () => {
    // window.print() works on real hosting (GitHub Pages, Vercel, etc.)
    // Falls back to HTML download in sandboxed environments
    try {
      window.print();
    } catch(e) {
      // fallback: download as HTML
      const esc = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>");
      const exHTML = session.map((ex, i) => `<div style="margin-bottom:28px;page-break-inside:avoid"><div style="display:flex;align-items:baseline;gap:10px;margin-bottom:4px"><span style="font-size:20px;font-weight:700;color:#4f46e5">${i+1}</span><h2 style="font-size:16px;font-weight:700;margin:0;color:#111">${esc(ex.title)}</h2></div><p style="font-size:12px;color:#888;margin:0 0 10px 30px">${esc(ex.cat)} · ${esc(ex.dur)} · ${esc(ex.players)} giocatori</p><div style="margin:0 0 0 30px;font-size:13px;line-height:1.75;color:#444">${esc(ex.fullDesc)}</div></div>`).join("");
      const notesB = notes ? `<div style="margin-top:24px;padding:14px 16px;border-left:3px solid #4f46e5;background:#fafaff;border-radius:6px"><p style="margin:0 0 6px;font-weight:700;font-size:13px;color:#333">Note dell'allenatore</p><p style="margin:0;color:#555;font-size:13px;line-height:1.75">${esc(notes)}</p></div>` : "";
      const html = `<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><title>AllenareFacile</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Helvetica,Arial,sans-serif;color:#1a1a1a;max-width:750px;margin:0 auto;padding:40px}</style></head><body><div style="border-bottom:2px solid #4f46e5;padding-bottom:14px;margin-bottom:28px"><h1 style="font-size:22px;font-weight:700;color:#1e1b4b">AllenareFacile — Sessione di Allenamento</h1><p style="color:#888;margin-top:4px;font-size:13px">${TODAY}</p></div>${exHTML}${notesB}<p style="margin-top:40px;text-align:center;color:#ccc;font-size:11px">AllenareFacile · ${TODAY}</p></body></html>`;
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "AllenareFacile_Sessione.html";
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 100);
    }
  };

  if (preview) {
    return (
      <div className="af min-h-screen bg-gray-100">
        <style>{`
          @media print {
            .no-print { display: none !important; }
            .print-bg { background: white !important; min-height: auto !important; }
            .print-sheet { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; border-radius: 0 !important; padding: 24px !important; }
          }
        `}</style>

        {/* Top bar - hidden in print */}
        <div className="no-print sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setPreview(false)} className="text-sm font-medium text-gray-500 flex items-center gap-1.5 active:text-gray-800">
            ← Torna alla sessione
          </button>
          <button onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white active:bg-indigo-700 flex items-center gap-2">
            🖨️ Stampa / Salva PDF
          </button>
        </div>

        {/* Print sheet preview */}
        <div className="print-bg min-h-screen bg-gray-100">
          <div className="print-sheet max-w-3xl mx-auto my-6 bg-white rounded-xl shadow-sm p-8 sm:p-12" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            {/* Header */}
            <div style={{ borderBottom: "2px solid #4f46e5", paddingBottom: "14px", marginBottom: "28px" }}>
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: "#1e1b4b" }}>AllenareFacile — Sessione di Allenamento</h1>
              <p className="text-sm mt-1" style={{ color: "#888" }}>{TODAY}</p>
            </div>

            {/* Exercises */}
            {session.map((ex, i) => (
              <div key={ex.id} className="mb-7" style={{ pageBreakInside: "avoid" }}>
                <div className="flex items-baseline gap-2.5 mb-1">
                  <span className="text-lg font-bold" style={{ color: "#4f46e5" }}>{i + 1}</span>
                  <h2 className="text-base font-bold text-gray-900">{ex.title}</h2>
                </div>
                <p className="text-xs mb-2.5 ml-7" style={{ color: "#888" }}>
                  {ex.cat} · {ex.dur} · {ex.players} giocatori
                </p>
                <div className="ml-7 text-sm leading-relaxed whitespace-pre-line" style={{ color: "#444" }}>
                  {ex.fullDesc}
                </div>
              </div>
            ))}

            {/* Notes */}
            {notes && (
              <div className="mt-6 pl-3 border-l-4" style={{ borderColor: "#4f46e5", pageBreakInside: "avoid" }}>
                <p className="text-sm font-bold mb-1" style={{ color: "#333" }}>Note dell'allenatore</p>
                <p className="text-sm whitespace-pre-wrap" style={{ color: "#555", lineHeight: "1.7" }}>{notes}</p>
              </div>
            )}

            {/* Footer */}
            <p className="mt-10 text-center text-xs" style={{ color: "#ccc" }}>AllenareFacile · {TODAY}</p>
          </div>
        </div>

        {/* Hint - hidden in print */}
        <p className="no-print text-center text-xs text-gray-400 pb-6">Su hosting reale (Vercel, GitHub Pages) il PDF si genera direttamente. Nella sandbox di Claude, verrà scaricato come HTML.</p>
      </div>
    );
  }

  return (
    <div className="af min-h-screen bg-gray-50">
      {/* ─── SCREEN UI ─── */}
      <div>
        {/* Nav */}
        <nav className="sticky top-0 z-40 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <span className="text-base font-bold text-indigo-700 flex items-center gap-1.5">
              <span className="text-lg">⚽</span> AllenareFacile
            </span>
            <div className="flex items-center gap-1">
              <button onClick={onBack} className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500 active:text-gray-700">Esercizi</button>
              <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-600 text-white flex items-center gap-1.5">
                Sessione
                {session.length > 0 && <span className="bg-white text-indigo-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{session.length}</span>}
              </span>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">La tua Sessione</h1>
              <p className="text-sm text-gray-400 mt-0.5">{session.length} esercizi selezionati{totalDur ? ` · ~${totalDur} min` : ""}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setSession([])} disabled={!session.length}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  session.length ? "text-red-500 border-red-200 active:bg-red-50" : "text-gray-300 border-gray-100"
                }`}>
                Svuota
              </button>
              <button onClick={() => setPreview(true)} disabled={!session.length}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  session.length ? "bg-indigo-600 text-white active:bg-indigo-700" : "bg-gray-100 text-gray-300"
                }`}>
                🖨️ Genera PDF / Stampa
              </button>
            </div>
          </div>

          {/* Exercise list */}
          {session.length > 0 ? (
            <div className="space-y-2.5">
              {session.map((ex, i) => (
                <div key={ex.id}
                  draggable
                  onDragStart={() => { dragRef.current = i; setDragging(i); }}
                  onDragEnter={() => { overRef.current = i; }}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnd={() => {
                    if (dragRef.current !== null && overRef.current !== null && dragRef.current !== overRef.current) {
                      const a = [...session]; const [m] = a.splice(dragRef.current, 1); a.splice(overRef.current, 0, m); setSession(a);
                    }
                    dragRef.current = null; overRef.current = null; setDragging(null);
                  }}
                  className={`bg-white rounded-xl border p-4 flex items-center gap-3 select-none ${
                    dragging === i ? "opacity-30 scale-[0.98]" : "border-gray-100"
                  }`}
                  style={{ transition: "opacity .15s, transform .15s" }}
                >
                  {/* Number */}
                  <span className="text-lg font-bold text-indigo-600 w-6 text-center flex-shrink-0">{i + 1}</span>

                  {/* Emoji avatar */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${CAT_CFG[ex.cat].grad} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-2xl opacity-80">{CAT_CFG[ex.cat].emoji}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{ex.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs font-medium text-white px-2 py-0.5 rounded ${CAT_CFG[ex.cat].badge}`}>{ex.cat}</span>
                      <span className="text-xs text-gray-400">{ex.dur}</span>
                    </div>
                  </div>

                  {/* Arrows */}
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button onClick={() => up(i)} disabled={!i}
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${!i ? "text-gray-200 border-gray-100 cursor-default" : "text-gray-500 border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 active:bg-indigo-100"}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
                    </button>
                    <button onClick={() => dn(i)} disabled={i >= session.length - 1}
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${i >= session.length - 1 ? "text-gray-200 border-gray-100 cursor-default" : "text-gray-500 border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 active:bg-indigo-100"}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                  </div>

                  {/* Delete */}
                  <button onClick={() => rm(ex.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 active:bg-red-100 transition-colors flex-shrink-0">
                    🗑
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-400 text-sm">Nessun esercizio nella sessione.</p>
              <button onClick={onBack} className="mt-3 text-sm font-medium text-indigo-600 underline">Vai agli esercizi</button>
            </div>
          )}

          {/* Notes */}
          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Note dell'allenatore</h3>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
              placeholder="Aggiungi le tue note per questa sessione..."
              className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none placeholder-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── EXERCISES PAGE ───────────────────────────────────────── */
export default function AllenareFacile() {
  const [session, setSession] = useState([]);
  const [notes, setNotes] = useState("");
  const [catF, setCatF] = useState("Tutti");
  const [ageF, setAgeF] = useState("Tutti");
  const [detail, setDetail] = useState(null);
  const [page, setPage] = useState("exercises");

  const filtered = EX.filter((e) => {
    if (catF !== "Tutti" && e.cat !== catF) return false;
    if (ageF !== "Tutti" && !e.ages.includes(ageF)) return false;
    return true;
  });

  const toggle = useCallback((ex) => {
    setSession(p => p.find(s => s.id === ex.id) ? p.filter(s => s.id !== ex.id) : [...p, ex]);
  }, []);
  const has = (id) => !!session.find(s => s.id === id);

  /* SESSION PAGE */
  if (page === "session") {
    return (
      <>
        
        <SessionPage session={session} setSession={setSession} notes={notes} setNotes={setNotes} onBack={() => setPage("exercises")} />
      </>
    );
  }

  /* EXERCISES PAGE */
  return (
    <>
      
      <div className="af min-h-screen bg-gray-50">
        {detail && <DetailModal ex={detail} onClose={() => setDetail(null)} onToggle={toggle} added={has(detail.id)} />}

        <div className="af-screen">
          {/* Nav */}
          <nav className="sticky top-0 z-30 bg-white border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
              <span className="text-base font-bold text-indigo-700 flex items-center gap-1.5">
                <span className="text-lg">⚽</span> AllenareFacile
              </span>
              <div className="flex items-center gap-1">
                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">Esercizi</span>
                <button onClick={() => setPage("session")}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1.5 transition-colors">
                  Sessione
                  {session.length > 0 && (
                    <span className="bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{session.length}</span>
                  )}
                </button>
              </div>
            </div>
          </nav>

          {/* Content */}
          <div className="max-w-6xl mx-auto px-4 pt-6 pb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Scopri gli Esercizi</h1>
            <p className="text-sm text-gray-400 mb-5">Esplora il database e aggiungi esercizi alla tua sessione.</p>

            {/* Filters */}
            <div className="mb-5 space-y-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-gray-400 font-medium mr-1 flex items-center gap-1">🔍 Filtra:</span>
                {CATS.map(c => (
                  <button key={c} onClick={() => setCatF(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      catF === c ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-200 active:border-indigo-300"
                    }`}>{c}</button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pl-14 md:pl-16">
                {AGES.map(a => (
                  <button key={a} onClick={() => setAgeF(a)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      ageF === a ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-200 active:border-indigo-300"
                    }`}>{a}</button>
                ))}
              </div>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(ex => {
                const added = has(ex.id);
                return (
                  <div key={ex.id} className={`bg-white rounded-xl border overflow-hidden transition-shadow ${added ? "border-indigo-200 shadow-sm" : "border-gray-100"}`}>
                    <div className={`relative h-36 bg-gradient-to-br ${CAT_CFG[ex.cat].grad} flex items-center justify-center`}>
                      <span className="text-6xl opacity-60">{CAT_CFG[ex.cat].emoji}</span>
                      <span className={`absolute top-2.5 left-2.5 text-xs font-semibold text-white px-2.5 py-1 rounded-md ${CAT_CFG[ex.cat].badge}`}>{ex.cat}</span>
                    </div>
                    <div className="p-3.5">
                      <h3 className="text-base font-bold text-gray-900 leading-snug">{ex.title}</h3>
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed" style={{ display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{ex.desc}</p>
                      <div className="flex items-center gap-3 mt-2.5 text-xs text-gray-400">
                        <span>⏱ {ex.dur}</span>
                        <span>👥 {ex.players}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {ex.ages.map(a => (
                          <span key={a} className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{a}</span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3.5">
                        <button onClick={() => setDetail(ex)}
                          className="flex-1 py-2.5 rounded-lg text-xs font-semibold text-gray-600 bg-white border border-gray-200 active:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors">
                          👁 Scopri
                        </button>
                        <button onClick={() => toggle(ex)}
                          className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                            added ? "bg-red-50 text-red-500 border border-red-200 active:bg-red-100" : "bg-indigo-600 text-white active:bg-indigo-700"
                          }`}>
                          {added ? "✕ Rimuovi" : "+ Aggiungi"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {!filtered.length && (
                <div className="col-span-full py-16 text-center text-gray-400">
                  <p className="text-3xl mb-2">🔍</p>
                  <p className="text-sm">Nessun esercizio trovato.</p>
                  <button onClick={() => { setCatF("Tutti"); setAgeF("Tutti"); }} className="mt-2 text-sm font-medium text-indigo-600 underline">Resetta filtri</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
