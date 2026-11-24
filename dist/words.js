import { mergeCategory } from './categories.js?v=118';

// Hint anchors approved by the player: Njure -> Kaffefilter (filtering),
// Höna -> Maräng (egg white), Piano -> Övergångsställe (black/white fields),
// Blyertspenna -> Diamant (carbon). Keep one concrete, familiar middle link.
// Prefer common materials/products, plain functions and immediately visible shapes.
// Avoid niche facts, incidental props, strained analogies, definitions and word leaks.
// Rejected anchors: Helikopter -> Lönnfrö, Kompass -> Kylskåpsdörr,
// Bläckfisk -> Dammsugare. Technical plausibility alone does not make a good hint.
// Format: secret word | hint | alternative hint. Categories remain broad.
const groups = {
  'Mat': `
Popcorn|Förtexter|Majsfält
Pizza|Kartong|Tårtbitar
Pasta|Vetefält|Durkslag
Sushi|Akvarium|Sjötång
Tacos|Fredagssoffa|Majsfält
Hamburgare|Drive-through|Våningshus
Pannkaka|Saltomortal|Mjölkpaket
Våffla|Kortlek|Hjärtoperation
Omelett|Hönsgård|Visp
Lasagne|Våningshus|Garfield
Risotto|Risfält|Stärkelse
Falafel|Hummus|Ärtsoppa
Köttbullar|Möbelvaruhus|Julbord
Korv|Ballongdjur|Senapsfrö
Soppa|Termos|Buljongtärning
Gröt|Tomte|Tapetklister
Sallad|Kaninbur|Bladverk
Smörgås|Picknick|Brödsmulor
Pommes frites|Potatiskällare|Tändstickor
Dumpling|Presentpaket|Pastadeg`,
  'Råvaror': `
Potatis|Källare|Brännvin
Morot|Kaninbur|Snögubbe
Lök|Tårkanal|Simmarglasögon
Vitlök|Huggtänder|Andedräkt
Tomat|Ketchupfläck|Växthus
Gurka|Ögonlock|Vattenkran
Paprika|Trafikljus|Kryddburk
Broccoli|Miniatyrskog|Trädkrona
Spenat|Seriefigur|Grön smoothie
Svamp|Höstpromenad|Paraply
Avokado|Smörpaket|Fruktkärna
Citron|Vinäger|Grimas
Apelsin|C-vitamin|Marmeladburk
Banan|Slapstick|Halvmåne
Äpple|Gravitation|Mustpress
Päron|Glödlampa|Föräldramöte
Jordgubbe|Midsommar|Gräddtårta
Blåbär|Vasalopp|Lila tunga
Hallon|Fingerborg|Syltburk
Kokosnöt|Öde ö|Palmblad`,
  'Smaker och sötsaker': `
Choklad|Kakaoträd|Handfläck
Glass|Hjärnfrys|Pöl
Lakrits|Svart färg|Godispåse
Marsipan|Mandelträd|Tårtlock
Karamell|Tandläkarräkning|Smält socker
Kanelbulle|Snäckskal|Trädbark
Semla|Februari|Gräddmustasch
Pepparkaka|Arkitektur|Kavel
Kladdkaka|Tandpetare|Kakaoböna
Maräng|Moln|Äggvisp
Sockervadd|Moln|Bomull
Honung|Bikupa|Vaxljus
Sylt|Bärbuske|Pannkakstorsdag
Marmelad|Apelsinlund|Rostat bröd
Senap|Julskinka|Fröpåse
Ketchup|Vit skjorta|Tomatplanta
Salt|Vinterväg|Konservering
Peppar|Nysning|Kvarn
Socker|Tandläkare|Syltburk
Vanilj|Glasskopa|Parfym`,
  'Drycker': `
Kaffe|Väckarklocka|Sömnlöshet
Te|Storbritannien|Löv
Mjölk|Mustasch|Ostbricka
Juice|Fruktträd|Citruspress
Läsk|Rapning|Sockerbit
Saft|Bärbuske|Vattenkanna
Smoothie|Mixer|Fruktskål
Varm choklad|Skidstuga|Gräddmustasch
Mineralvatten|Rapning|Brunn
Lemonad|Citrusträd|Grimas
Espresso|Fingerborg|Sömnbrist
Cappuccino|Mjölkmustasch|Skumbad
Matcha|Teblad|Grön färg
Chai|Kanelbulle|Kryddburk
Kombucha|Jästdeg|Teblad
Cider|Fruktträdgård|Jäsning
Öl|Bröddeg|Skum
Vin|Druvklase|Årgång
Champagne|Prispall|Raketskott
Milkshake|Glasskopa|Sugrör`,
  'Djur': `
Katt|Garnnystan|Kartong
Hund|Dörrklocka|Nosavtryck
Häst|Schack|Riddarrustning
Ko|Ostbricka|Mjölkpaket
Gris|Julskinka|Sparande
Får|Sömnlöshet|Stickning
Get|Klättervägg|Ostbricka
Höna|Maräng|Majonnäs
Anka|Badleksak|Simfötter
Gås|Bläckhorn|Duntäcke
Uggla|Studentmössa|Nattpass
Örn|Riksvapen|Flygplansvinge
Kråka|Fågelskrämma|Soptunna
Papegoja|Bandspelare|Piratskepp
Pingvin|Frack|Sydpolsexpedition
Flamingo|Balett|Rosa färg
Påfågel|Solfjäder|Ögonmönster
Struts|Löparbana|Styltor
Svan|Balett|Hjärta
Kolibri|Blomsternektar|Sugrör`,
  'Vilda djur': `
Elefant|Vattenkanna|Dammsugarslang
Giraff|Höghus|Trädkrona
Zebra|Övergångsställe|Streckkod
Lejon|Solros|Kungakrona
Tiger|Randig tröja|Kamouflage
Leopard|Modeplagg|Fräknar
Björn|Honungsburk|Ide
Varg|Rödluvan|Hundkoppel
Räv|Hönshus|Röd päls
Älg|Trafikskylt|Skogskonung
Ren|Julsläde|Lav
Hare|Påskägg|Långa öron
Ekorre|Vinterförråd|Nötknäppare
Igelkott|Taggtråd|Lövhög
Fladdermus|Batman|Nattlampa
Delfin|Ekolod|Leende
Val|Ubåt|Luftandning
Haj|Skräckmusik|Tandläkare
Bläckfisk|Rökridå|Bläckpatron
Manet|Brännskada|Gelé`,
  'Smådjur': `
Fjäril|Rosett|Förvandling
Bi|Fruktodling|Vaxljus
Geting|Sensommar|Saftglas
Myra|Myrsyra|Sockerbit
Spindel|Fisknät|Vävstol
Mygga|Blodgivning|Nattligt surr
Fluga|Soptunna|Fönsterruta
Nyckelpiga|Prickig klänning|Bladlöss
Trollslända|Glasruta|Dammkant
Gräshoppa|Längdhopp|Studsmatta
Humla|Pälsjacka|Blomsteräng
Snigel|Slemspår|Salladsblad
Snäcka|Husbil|Spiraltrappa
Dagmask|Kompost|Fiskekrok
Fästing|Blodgivning|Hundpäls
Skalbagge|Rustning|Bilmodell
Kackerlacka|Matrester|Sprayburk
Skorpion|Stjärnhimmel|Injektionsspruta
Tusenfoting|Skobutik|Många ben
Loppa|Höjdhopp|Hundpäls`,
  'Natur': `
Sand|Fönster|Timglas
Berg|Klätterrep|Toppmöte
Skog|Pappersbruk|Bokhylla
Sjö|Isbana|Fiskespö
Flod|Vattenväg|Bro
Hav|Saltkar|Containerfartyg
Ö|Robinson|Färjebiljett
Vulkan|Askmoln|Smält sten
Glaciär|Isbit|Havsnivå
Grotta|Eko|Fladdermus
Öken|Kaktus|Timglas
Strand|Glasbruk|Badhandduk
Vattenfall|Eluttag|Tyngdkraft
Träsk|Gummistövel|Myggbett
Äng|Höbal|Pollenkorn
Klippa|Klätterrep|Stup
Sten|Bilruta|Slangbella
Lera|Kaffekopp|Fotspår
Mossa|Sammetsmatta|Skogsbotten
Lava|Smältugn|Ny mark`,
  'Väder och rymd': `
Regn|Doft av asfalt|Gummistövel
Snö|Ljuddämpning|Vattenkran
Hagel|Bilförsäkring|Glaskula
Dimma|Färjehorn|Imma
Åska|Hundrädsla|Trumvirvel
Blixt|Fotograf|Elledning
Regnbåge|Prisma|Färgpennor
Vind|Eluttag|Drake
Storm|Nedfallen ledning|Inställd färja
Torka|Tom brunn|Sprucken jord
Frost|Bilskrapa|Frysfack
Dagg|Spindelnät|Vått gräs
Moln|Bomull|Vispgrädde
Sol|D-vitamin|Glödlampa
Måne|Tidvatten|Kalender
Stjärna|Hotellbetyg|Julgranstopp
Planet|Jordglob|Omloppsbana
Komet|Snöboll|Svans
Meteor|Stjärnfall|Krater
Norrsken|Solstorm|Färgad natthimmel`,
  'Växter': `
Ros|Ursäkt|Parfym
Tulpan|Nederländerna|Lökförråd
Solros|Matolja|Fröpåse
Kaktus|Nåldyna|Ökenvatten
Orkidé|Bukett|Blomkruka
Maskros|Önskning|Fallskärm
Nässla|Brännskada|Vårsoppa
Lavendel|Doftpåse|Parfym
Bambu|Sugrör|Pandameny
Ek|Vinfat|Bokhylla
Björk|Bastukvast|Pollenprognos
Gran|December|Barr i strumpan
Tall|Möbelvirke|Kåda
Pil|Amor|Korgflätning
Palm|Solsemester|Oas
Lönn|Kanadas flagga|Sirap
Murgröna|Husfasad|Klättervägg
Klöver|Lyckoamulett|Kortlek
Ljung|Lila färg|Höstkruka
Vass|Visselpipa|Fågelbo`,
  'Hemmet': `
Soffa|Fjärrkontroll|Sänggäst
Fåtölj|Läshörna|Fotstöd
Säng|Väckarklocka|Drömtydning
Bord|Förhandling|Träskiva
Stol|Hela havet stormar|Fyra ben
Bokhylla|Trädfiber|Bokstöd
Garderob|Narnia|Säsongsbyte
Spegel|Vampyr|Självbild
Matta|Flygande transport|Dammallergi
Gardin|Premiär|Insyn
Kudde|Nackstöd|Fjäderdräkt
Täcke|Dunjacka|Isolering
Lampa|Serietidningsidé|Nattfjäril
Ljusstake|Decemberfönster|Stearinfläck
Vas|Blomsteräng|Stilleben
Tavla|Auktionsklubba|Spikhål
Klocka|Puls|Tidspress
Dörr|Nyckelhål|Integritet
Fönster|Sand|Insyn
Trappa|Vardagsmotion|Stege`,
  'Kök och städning': `
Kylskåp|Vinterjacka|Matrester
Frys|Istid|Storkok
Ugn|Brandvarnare|Lerkruka
Mikrovågsugn|Kontorslunch|Exploderat ägg
Brödrost|Solbränna|Smulor
Vattenkokare|Brittisk paus|Ångmoln
Diskmaskin|Biltvätt|Intorkade rester
Kastrull|Campingkök|Ångmoln
Stekpanna|Solvärme|Pannkakstorsdag
Durkslag|Sil|Pastavatten
Visp|Moln|Träningsvärk
Rivjärn|Skrapsår|Ostbricka
Skärbräda|Knivmärken|Träspån
Kavel|Pepparkakshus|Ångvält
Mortel|Stenkross|Krydddoft
Dammsugare|Kattskräck|Dammallergi
Mopp|Halkskylt|Blött golv
Tvättmaskin|Strumpjakt|Karusell
Strykjärn|Skjortkrage|Brännmärke
Sopborste|Häxa|Tandborste`,
  'Kläder och tillbehör': `
Jacka|Garderobsavgift|Vintervind
Kappa|Detektiv|Ylle
Tröja|Garnnystan|Statisk elektricitet
Skjorta|Jobbintervju|Strykbräda
Byxor|Knälagning|Plånboksficka
Jeans|Bomullsfält|Blå färg
Klänning|Nobelmiddag|Galakväll
Kjol|Skottland|Dansvirvel
Strumpa|Tåvärme|Tvättmaskin
Sko|Askungen|Skavsår
Stövel|Lerpöl|Katt i saga
Sandal|Solränder|Sandkorn
Hatt|Trollkonst|Kanin
Mössa|Frisyrproblem|Värmeisolering
Halsduk|Supporter|Garnnystan
Vante|Snöbollskrig|Handavtryck
Slips|Ormslinga|Knutproblem
Bälte|Karate|Byxmidja
Glasögon|Imma|Förstoringsglas
Ryggsäck|Skolstart|Packåsna`,
  'Verktyg och saker': `
Hammare|Tumme|Auktionssal
Skruvmejsel|Batterilucka|Platta möbler
Såg|Årsringar|Tandrad
Borrmaskin|Grannkonflikt|Betongdamm
Tång|Tandläkare|Hummerklo
Yxa|Vedbod|Trädstubbe
Spade|Arkeologi|Skattkarta
Kratta|Höstlöv|Kam
Stege|Fönsterputs|Äppelplockning
Måttband|Skräddare|Ormform
Vattenpass|Bubbla|Tavelhängning
Ficklampa|Strömavbrott|Ljusstråle
Kompass|Soluppgång|Skattkarta
Paraply|Cocktailglas|Mary Poppins
Nyckel|Låssmed|Under dörrmattan
Hänglås|Fängelse|Gymväska
Sax|Invigning|Krabbklo
Tejp|Julklappspanik|Luddrulle
Lim|Spindelnät|Kladdiga fingrar
Rep|Dragkamp|Spindelnät`,
  'Transport': `
Cykel|Byxklämma|Kedja
Bil|Köbildning|Oljefält
Buss|Dragspel|Klassresa
Tåg|Pärlband|Förseningsersättning
Spårvagn|Göteborg|Elledning
Tunnelbana|Gatumusik|Underjordisk karta
Flygplan|Lufttryck|Fågelvinge
Helikopter|Takfläkt|Ambulans
Båt|Ankare|Sjösjuka
Färja|Bildäck|Ö
Ubåt|Val|Periskop
Segelbåt|Vindkraft|Lakan
Kanot|Paddel|Camping
Kajak|Dubbelpaddel|Vattenyta
Motorcykel|Skinnställ|Hjälmfrisyr
Moped|Femtonårsdag|Bensinpump
Traktor|Mjölpåse|Skördetid
Lastbil|Flyttkartonger|Rastplats
Ambulans|Blåljus|Bår
Luftballong|Varmluft|Festballong`,
  'Platser och byggnader': `
Bibliotek|Viskning|Förseningsavgift
Museum|Monterglas|Tidsresa
Biograf|Popcornpåse|Mörkläggning
Teater|Ridå|Röda sammetsstolar
Sjukhus|Handdesinfektion|Ambulans
Apotek|Kölapp|Recept
Skola|Sommarlov|Korridorspring
Universitet|Studieskuld|Studentmössa
Kyrka|Orgel|Bröllopslöften
Slott|Kungakrona|Vallgrav
Fängelse|Kalenderstreck|Besöksdag
Brandstation|Vattenslang|Nattlarm
Fyr|Ficklampa|Sjöfart
Bro|Trollsaga|Tandläkare
Tunnel|Mullvad|Bergsprängning
Flygplats|Vätskepåse|Resväska
Tågstation|Tidtabell|Återförening
Hamn|Måsar|Ankare
Camping|Tältduk|Gemensam dusch
Hotell|Minischampo|Frukostbuffé`,
  'Sport och fritid': `
Fotboll|Gräsfläckar|Målram
Tennis|Hundpromenad|Domarstol
Golf|Gräsmatta|Mullvad
Basket|Studsboll|Tvättkorg
Volleyboll|Sand i skorna|Badhandduk
Ishockey|Tandlucka|Utvisningsbås
Simning|Klorlukt|Russinfingrar
Löpning|Skoskav|Nummerlapp
Cykling|Motvind|Benskraft
Skidåkning|Valla|Blåbärssoppa
Snowboard|Surfbräda|Liftkö
Skridskor|Kökskniv|Isbana
Klättring|Spindel|Säkerhetslina
Boxning|Tandskydd|Väckarklocka
Brottning|Kram|Matta
Fäktning|Skyddsmask|Svärd
Bowling|Låneskor|Ränna
Biljard|Grön duk|Vinkelmätare
Dart|Piltavla|Huvudräkning
Schack|Kungafamilj|Armé`,
  'Musik och kultur': `
Piano|Flyttfirma|Övergångsställe
Gitarr|Lägereld|Fiskelinor
Trumma|Hjärtslag|Marsch
Fiol|Hästsvans|Orkesterdike
Flöjt|Fågelkvitter|Visselpipa
Trumpet|Bilklaxon|Gul metall
Saxofon|Jazzklubb|Mässing
Harpa|Änglavingar|Vävstol
Dragspel|Buss|Bälg
Mikrofon|Högtalare|Talarskräck
Hörlurar|Öronmuffar|Trassel
Högtalare|Grannfest|Mikrofon
Skivspelare|Karusell|Nålbyte
Radio|Sjörapport|Antenn
Kamera|Öga|Mörkrum
Bok|Trädfiber|Vikta hörn
Tidning|Pappersbruk|Trycksvärta
Serietidning|Pratbubbla|Filmremsa
Pussel|Mosaik|Regnsemester
Kortlek|Las Vegas|Trolleri`,
  'Teknik': `
Mobiltelefon|Fickdator|Nackvärk
Dator|Fläktdamm|Schackmästare
Tangentbord|Smulor|Piano
Datormus|Handledsvärk|Pekfinger
Skärm|Fönster|Fingeravtryck
Skrivare|Pappersstopp|Bläckfläck
Router|Vägkorsning|Nätkabel
Laddare|Vägguttag|Batteri
Batteri|Fjärrkontroll|Ficklampa
Solcell|Takpanna|Eluttag
Glödlampa|Serietidningsidé|Varmt glas
Robot|Löpande band|Plåtgubbe
Drönare|Fjärrkontroll|Propeller
Satellit|Väderkarta|Rymdraket
Teleskop|Kikare|Stjärnljus
Mikroskop|Yoghurt|Lökhinna
Termometer|Feber|Väderprognos
Miniräknare|Matteprov|Delad nota
USB-minne|Nyckelknippa|Filarkiv
Hårddisk|Familjealbum|Minnesförlust`,
  'Vardag och upplevelser': `
Semester|Autosvar|Resväska
Födelsedag|Årsring|Tårtljus
Bröllop|Risregn|Sittordning
Begravning|Svart slips|Vissna blommor
Jul|Barr i strumpan|Paketberg
Påsk|Fjäderkvist|Äggkartong
Midsommar|Små grodorna|Blomsterkrans
Nyår|Hundoro|Fyrverkeri
Halloween|Tandläkare|Ringklocka
Karneval|Konfetti|Maskerad
Picknick|Myrbesök|Filt
Utflykt|Sittunderlag|Termos
Fiske|Maskburk|Gummistövel
Trädgård|Ogräsrensning|Jord under naglarna
Bastu|Svettpärlor|Varm sten
Massage|Degknådning|Ömma muskler
Dröm|Kudde|Sovande ögon
Kö|Nummerlapp|Väntetid
Hemlighet|Kuvert|Dagbokslås
Överraskning|Presentpapper|Födelsedag`,
  'Däggdjur': `
Kanin|Trollhatt|Påskägg
Hamster|Löpband|Kindpåse
Marsvin|Höhög|Salladsblad
Råtta|Avloppsrör|Ostfälla
Mus|Datorbord|Ostfälla
Chinchilla|Pälsjacka|Gosedjur
Iller|Korvform|Päls
Åsna|Packväska|Envishet
Kamel|Ökenkaravan|Ryggsäck
Dromedar|Sanddyn|Fartgupp
Noshörning|Pansarplåt|Tjurhorn
Flodhäst|Badkar|Stor gäspning
Gorilla|Boxare|Brösttrumma
Schimpans|Klätterställning|Människosläkting
Orangutang|Röd frisyr|Klätterställning
Sengångare|Hängmatta|Snigel
Koala|Nallebjörn|Australien
Känguru|Studsmatta|Magficka
Panda|Bamburör|Schackfärger
Tvättbjörn|Ögonmask|Soptunnelock`,
  'Hav och vatten': `
Lax|Rosa färg|Fors
Abborre|Randig tröja|Fiskespö
Gädda|Tandläkare|Vassrugge
Torsk|Fiskpinne|Skägg
Sill|Julbord|Konservburk
Makrill|Tomatsås|Randig tröja
Tonfisk|Konservöppnare|Fiskdisk
Sjöhäst|Schackpjäs|Hästhuvud
Sjöstjärna|Julgranstopp|Pepparkaksform
Krabba|Sidosteg|Klädnypa
Hummer|Nötknäppare|Röd kokkastrull
Räka|Cocktailglas|Smörgåstårta
Mussla|Gångjärn|Smyckeskrin
Ostron|Pärlhalsband|Plånboksform
Korall|Undervattensskog|Dykmask
Säl|Badboll|Morrhår
Valross|Mustasch|Betar
Utter|Vattenlek|Fiskmiddag
Bäver|Timmerman|Dammbygge
Ål|Orm|Spagetti`,
  'Frukt och grönt': `
Ananas|Punkfrisyr|Tropisk juice
Mango|Fruktjuice|Smoothie
Kiwi|Fågelnamn|Brun päls
Persika|Sammetsyta|Fruktsallad
Plommon|Russin|Fruktkompott
Körsbär|Örhänge|Kärnspottning
Vindruva|Vinkällare|Russin
Melon|Vattenkanna|Sommarpicknick
Granatäpple|Rubiner|Fröpåse
Fikon|Fröprickar|Ostbricka
Dadlar|Palmblad|Torkad frukt
Russin|Skrynklig hud|Glöggkopp
Tranbär|Röd juice|Syrlig grimas
Lingon|Skogspromenad|Köttbullstallrik
Hjortron|Bärnsten|Myrmark
Rabarber|Grimas|Pajform
Rödbeta|Fingerfärg|Röd sammet
Blomkål|Vitt moln|Trädkrona
Purjolök|Gröna ringar|Soppskål
Selleri|Grön stjälk|Soppgryta`,
  'Mat och måltider': `
Ärtsoppa|Torsdagsmeny|Fröpåse
Fiskpinne|Brödsmulor|Remouladsås
Fiskgratäng|Potatisåker|Ugnsvärme
Kebab|Karusell|Pitabröd
Burrito|Sovsäck|Risfält
Quesadilla|Ostbricka|Halvmåne
Paella|Saffranspåse|Risfält
Couscous|Vetefält|Sandkorn
Hummus|Falafeltallrik|Ärtsoppa
Guacamole|Avokadoträd|Tortillachips
Pesto|Basilikakruka|Mortel
Ratatouille|Tecknad råtta|Grönsaksland
Chili con carne|Pepparhetta|Bönburk
Gulasch|Paprikapulver|Soppskål
Schnitzel|Hammarslag|Brödsmulor
Kroppkaka|Potatisåker|Degpaket
Pyttipanna|Matrester|Tärningar
Raggmunk|Rivjärn|Lingonburk
Surströmming|Klädnypa|Svullen burk
Smörgåstårta|Våningshus|Födelsedag`,
  'Bakverk och efterrätter': `
Prinsesstårta|Kungakrona|Grön kupol
Morotskaka|Snögubbe|Ostbricka
Cheesecake|Mjölkgård|Kexsmulor
Äppelpaj|Höstskörd|Fruktträd
Chokladboll|Pärlor|Kakaoböna
Muffins|Papperskjol|Luftbubblor
Croissant|Halvmåne|Smörpaket
Wienerbröd|Smörpaket|Konditori
Donut|Livboj|Glasyr
Bagel|Badring|Smörgås
Scones|Brittisk paus|Smörpaket
Baguette|Svärd|Papperspåse
Knäckebröd|Smulor|Hålkaka
Skorpa|Doppning|Smulhög
Polkagris|Randig käpp|Tandkräm
Geléhallon|Bärbuske|Dallrande yta
Nougat|Nötskal|Chokladask
Tryffel|Kakaopulver|Chokladask
Sorbet|Fruktjuice|Frysfack
Pannacotta|Gelé|Gräddkanna`,
  'Kryddor och tillbehör': `
Smör|Gräddkanna|Smältpunkt
Ost|Musfälla|Mjölkgård
Yoghurt|Mjölkgård|Frukostskål
Grädde|Smörpaket|Tårtdekoration
Ägg|Maräng|Påskmålning
Mjöl|Dammoln|Sädesfält
Jäst|Luftballong|Degbunke
Bakpulver|Luftballong|Ugnshöjd
Kanel|Trädbark|Juldoft
Kardemumma|Semla|Kryddkvarn
Saffran|Luciakrona|Gul färg
Gurkmeja|Gul fläck|Currypulver
Ingefära|Pepparkaka|Rotknöl
Basilika|Pesto|Tomatsallad
Oregano|Pizzakartong|Örtkruka
Dill|Kräftskiva|Färskpotatis
Persilja|Grön kvist|Soppskål
Rosmarin|Barrskog|Örtkruka
Timjan|Örtkruka|Kryddhylla
Mynta|Tuggummi|Tandkräm`,
  'Småsaker hemma': `
Fjärrkontroll|Soffkudde|Batteri
Väckarklocka|Tupp|Morgontrötthet
Blomkruka|Lerklump|Jord under naglarna
Galge|Axlar|Kemtvätt
Klädnypa|Krokodilmun|Fjäder
Tvättkorg|Strumpor|Högar
Soptunna|Matrester|Måsbesök
Återvinningspåse|Glasburk|Kretslopp
Dörrmatta|Leriga skor|Välkomsthälsning
Ringklocka|Hundskall|Elektrisk ton
Brevinkast|Reklamblad|Hallgolv
Kuvert|Frimärke|Hemlig lapp
Frimärke|Saliv|Vykort
Kalender|Årsringar|Födelsedagsminne
Fotoalbum|Släktträff|Tidsresa
Ram|Fönster|Familjeporträtt
Ljus|Bivax|Strömavbrott
Tändsticka|Skogsbrand|Friktion
Tändare|Gnista|Gasbehållare
Brandvarnare|Bränt bröd|Väckarklocka`,
  'Badrum och hygien': `
Handduk|Tvättsvamp|Blött hår
Badkar|Russinfingrar|Skumbubblor
Dusch|Konstgjort regn|Kakelfog
Toalett|Avloppsrör|Pappersbruk
Handfat|Tandkrämsfläck|Skål
Toalettpapper|Skogsavverkning|Kartongrulle
Tandborste|Sopborste|Igelkott
Tandkräm|Pepparmynta|Såpskum
Tandtråd|Sytråd|Smala mellanrum
Schampo|Skumbad|Frisörbesök
Balsam|Garntrassel|Silkeskänsla
Deodorant|Svettlukt|Omklädningsrum
Parfym|Blomsteräng|Näsprov
Rakapparat|Gräsklippare|Skäggstubb
Rakhyvel|Osthyvel|Skridskoskena
Nagelsax|Halvmåne|Fingertopp
Hårborste|Igelkott|Trassel
Kam|Kratta|Tandrad
Plåster|Klistermärke|Sårskorpa
Förbandslåda|Ambulans|Skrapsår`,
  'Klädesplagg': `
Regnrock|Paraply|Vattendroppe
Väst|Kostym|Öppna armar
Kavaj|Jobbintervju|Galge
Kostym|Bröllopsgäst|Kemtvätt
Frack|Pingvin|Nobelmiddag
Pyjamas|Kudde|Sovmorgon
Nattlinne|Klänning|Godnattsaga
Badrock|Handduk|Frotté
Baddräkt|Klorlukt|Badmössa
Bikini|Solränder|Strandväska
Shorts|Bara knän|Sommarvärme
Leggings|Gummiband|Träningsväska
Overall|Sandlåda|Astronaut
Förkläde|Mjölmoln|Skyddsrock
Skärmmössa|Paraply|Baseboll
Öronmuffar|Hörlurar|Vintervind
Hängslen|Lyftremmar|Byxmidja
Bröstnäsduk|Origami|Kavajficka
Manschettknapp|Armband|Skjortärm
Brosch|Säkerhetsnål|Blomdekoration`,
  'Verkstad och fästen': `
Spik|Tumme|Väggtavla
Skruv|Spiraltrappa|Möbelkartong
Mutter|Cykelreparation|Skiftnyckel
Bricka|Donut|Metallring
Gångjärn|Knäled|Knarr
Krok|Fisketur|Frågetecken
Karbinhake|Klätterrep|Nyckelknippa
Säkerhetsnål|Trasigt tyg|Blöja
Gem|Pappershög|Böjd ståltråd
Häftapparat|Pappershög|Hammarslag
Hålslag|Konfetti|Pärm
Sandpapper|Nagelfil|Träflisor
Fil|Tandrad|Sågspån
Hyvel|Lockiga spån|Ostskiva
Mejsel|Isbit|Hammarslag
Skiftnyckel|Rörmokare|Gripklo
Insexnyckel|Möbelkartong|Sexhörning
Färgroller|Brödkavel|Väggkulör
Pensel|Hårstrån|Sminkväska
Skottkärra|Barnvagn|Trädgårdsjord`,
  'Material': `
Trä|Bokhylla|Pappersbruk
Papper|Skogsavverkning|Vikta flygplan
Kartong|Flyttdag|Trädfiber
Glas|Sandtag|Fönsterruta
Metall|Skrothög|Gryta
Järn|Rostfläck|Magnet
Stål|Besticklåda|Skyskrapa
Koppar|Elledning|Grön ärg
Aluminium|Läskburk|Ugnsfolie
Guld|Prispall|Vigselring
Silver|Andraplats|Smyckeskrin
Plast|Oljefält|Leksakslåda
Gummi|Bildäck|Sudd
Läder|Skoputs|Sadel
Ull|Fårhage|Stickad tröja
Siden|Silkesmask|Halsduk
Linne|Dukning|Skrynkligt tyg
Betong|Motorvägsbro|Grå husvägg
Tegel|Lerklump|Skorsten
Keramik|Lerklump|Kaffekopp`,
  'Byggnader och byggdelar': `
Tak|Paraply|Regnvatten
Golv|Fotsteg|Skurhink
Vägg|Pappersrulle|Tavelspik
Skorsten|Sotare|Röksignal
Balkong|Blomlåda|Höjdrädsla
Veranda|Gungstol|Trägolv
Vindsvåning|Takbjälke|Fågelperspektiv
Källare|Potatisförråd|Berggrund
Garage|Oljefläck|Verktygsbänk
Carport|Paraply|Parkeringsplats
Staket|Hundrastning|Tomtgräns
Grind|Gångjärn|Staketöppning
Port|Nyckelknippa|Stadsentré
Mur|Borgförsvar|Tegelsten
Borg|Riddarrustning|Vallgrav
Skyskrapa|Hisskö|Höjdrädsla
Stuga|Vedbod|Skogssemester
Växthus|Bastu|Tomatodling
Lekstuga|Dockhus|Minimöbler
Igloo|Snöboll|Värmeisolering`,
  'Arbetsplatser och ärenden': `
Bageri|Vetefält|Jästdoft
Konditori|Gräddvisp|Födelsedag
Restaurang|Dricks|Dukning
Kafé|Kaffeböna|Porslinskopp
Pizzeria|Kartonghög|Ostbricka
Matsal|Brickvagn|Skolkök
Butik|Kvittorulle|Kassakö
Kiosk|Småpengar|Lördagsgodis
Varuhus|Rulltrappa|Shoppingpåse
Marknad|Prislapp|Torgstånd
Bondgård|Mjölkpaket|Sädesfält
Stall|Hölukt|Hovspår
Verkstad|Motorolja|Skyddsglasögon
Fabrik|Löpande band|Robotarm
Kontor|Kaffepaus|Tangentbord
Bank|Ränta|Spargris
Postkontor|Frimärke|Paketvåg
Frisörsalong|Gräsklippare|Hårspänne
Tvätteri|Skum|Strykjärn
Återvinningscentral|Släpvagn|Kretslopp`,
  'Yrken': `
Lärare|Rödpenna|Kunskapsnyckel
Läkare|Receptblock|Vit rock
Sjuksköterska|Spruta|Blodtryck
Tandläkare|Borrljud|Tandkräm
Veterinär|Hundkoppel|Djurambulans
Brandman|Vattenslang|Rök
Polis|Handbojor|Visselpipa
Pilot|Fågelperspektiv|Cockpit
Sjökapten|Kompass|Ratt
Lokförare|Räls|Tidtabell
Busschaufför|Klassresa|Ratt
Taxichaufför|Resväska|Taxameter
Apotekare|Vit rock|Pillerburk
Bonde|Mjölpåse|Traktor
Bagare|Mjölfläck|Jästsvamp
Kock|Knivslip|Vit mössa
Servitör|Balansövning|Dricks
Snickare|Träspån|Tumstock
Elektriker|Åskledare|Proppskåp
Rörmokare|Läckande kran|Skiftnyckel
Målare|Färgstänk|Penselhår
Murare|Lerklump|Vattenpass
Arkitekt|Lego|Ritningsrulle
Ingenjör|Ritbord|Kugghjul
Bibliotekarie|Bokvagn|Viskning
Journalist|Mikrofon|Anteckningsblock
Fotograf|Röda ögon|Bröllopsalbum
Författare|Tomt papper|Bokmässa
Skådespelare|Mask|Replikminne
Dansare|Taktkänsla|Spegelvägg
Sångare|Stämband|Mikrofonstativ
Musiker|Notställ|Instrumentfodral
Dirigent|Trafikpolis|Taktpinne
Domare|Visselpipa|Lagbok
Advokat|Lagbok|Försvarstal
Forskare|Förstoringsglas|Experiment
Astronaut|Tyngdlöshet|Rymddräkt
Arkeolog|Pensel|Gammal kruka
Brevbärare|Cykelväska|Kuvert
Sotare|Svarta händer|Takstege`,
  'Skolsaker': `
Blyertspenna|Diamant|Träspån
Kulspetspenna|Bläckfläck|Namnteckning
Suddgummi|Ångra|Smulor
Linjal|Raksträcka|Måttband
Passare|Klockurtavla|Cirkel
Gradskiva|Tårtbitar|Vinkelmått
Pennvässare|Sågspån|Vass spets
Pennfodral|Verktygslåda|Skolväska
Skrivbok|Trädfiber|Rutnät
Anteckningsblock|Minneshjälp|Rivkant
Pärm|Metallringar|Pappersordning
Mapp|Pappersficka|Arkiv
Whiteboard|Ångraknapp|Suddbara streck
Krittavla|Mjöldamm|Skolsal
Krita|Puder|Asfaltskonst
Projektor|Biograf|Skuggbild
Jordglob|Fotboll|Atlas
Världskarta|Pussel|Reseplan
Skolväska|Tunga böcker|Axelband
Gympapåse|Svettiga kläder|Tvättkorg`,
  'Lek och spel': `
Lego|Fotplåga|Tegelsten
Docka|Låtsasförälder|Minikläder
Nalle|Björn|Tröst
Gosedjur|Nattkudde|Pälsjacka
Leksaksbil|Rallybana|Miniparkering
Modelljärnväg|Miniatyrstad|Spårbyte
Bilbana|Elmotor|Hårnålskurva
Jojo|Hiss|Snörtrassel
Snurra|Balettdans|Rotation
Kula|Glasblåsning|Planet
Tärning|Sockerbit|Prickmönster
Domino|Kedjereaktion|Tärningsprickar
Memory|Tvillingar|Minnesgympa
Monopol|Hyresvärd|Fängelsebesök
Fia med knuff|Hemväg|Utkastad spelpjäs
Yatzy|Tärningskopp|Protokoll
Bingo|Nummerrop|Krysspenna
Lotto|Miljonär|Sifferkombination
Rubiks kub|Färgpennor|Vridning
Korthus|Vinglig byggnad|Pappersarkitektur`,
  'Utelek och rörelse': `
Gunga|Pendel|Båtresa
Rutschkana|Vattenfall|Tyngdkraft
Studsmatta|Resårband|Höjdhopp
Sandlåda|Miniatyrslott|Glasbruk
Gungbräda|Våg|Hävstång
Karusell|Tvättmaskin|Yrsel
Hopprep|Boxningsträning|Snörtrassel
Rockring|Midjemått|Badring
Frisbee|Flygande tallrik|Plastlock
Drake|Vindkraft|Snörtrassel
Såpbubbla|Regnbåge|Diskmedel
Vattenpistol|Dusch|Blöta kläder
Slangbella|Gummiband|Spänd kraft
Pilbåge|Robin Hood|Spänd sträng
Kubb|Träklossar|Kungafall
Krocket|Trädgårdsbågar|Träklubba
Kurragömma|Stängda ögon|Försvunnen kompis
Kull|Jakt|Snabba fötter
Brännboll|Skolgård|Rundtur
Dragkamp|Repknop|Muskelkraft`,
  'Resor': `
Pass|Gränskontroll|Porträttfoto
Biljett|Kontrollant|Papperslapp
Resväska|Packlista|Hotellgolv
Handbagage|Hatthylla|Vätskepåse
Bagageband|Löpande band|Resväska
Säkerhetskontroll|Metalldetektor|Röntgenbild
Tull|Gräns|Varudeklaration
Vägtull|Betalstation|Bilkö
Rondell|Karusell|Väjningsplikt
Övergångsställe|Zebra|Pianotangenter
Trafikljus|Paprikafärger|Röd färg
Vägskylt|Metallstolpe|Pil
Parkering|Böteslapp|Backning
Tankstation|Oljefält|Bränslepris
Rastplats|Picknickbord|Trötta ben
Campingvagn|Sovrum på hjul|Sommarkö
Husbil|Semesterkök|Hotellrum
Släpvagn|Flyttdag|Dragkrok
Lift|Hiss|Skidsemester
Linbana|Tvättlina|Bergstopp`,
  'Friluftsliv': `
Tält|Paraply|Dukvägg
Sovsäck|Kokong|Dunjacka
Liggunderlag|Madrass|Kall mark
Termos|Dunjacka|Kaffepaus
Stormkök|Gasbrännare|Frystorkad middag
Kåsa|Kaffekopp|Lägereld
Fältflaska|Bensindunk|Törst
Vandringsstav|Extra ben|Krycka
Flytväst|Luftkudde|Räddningsbåt
Livboj|Donut|Räddningslina
Ankare|Parkeringsbroms|Havsbotten
Åra|Spade|Muskelkraft
Paddel|Spade|Vattenmotstånd
Segel|Lakan|Vindkraft
Fiskespö|Tålamod|Metkrok
Håv|Fisknät|Fjärilsjakt
Kikare|Läktarplats|Fågelskådning
Förstoringsglas|Detektiv|Solstråle
Lupp|Frimärkssamling|Liten lins
Pannlampa|Gruvarbetare|Mörkerlöpning`,
  'Kroppen': `
Hjärta|Pumpstation|Kärleksbrev
Lunga|Blåsbälg|Ballong
Hjärna|Valnöt|Dator
Mage|Matkvarn|Fjärilar
Tarm|Vattenslang|Matspjälkning
Lever|Reningsverk|Avgiftning
Njure|Kaffefilter|Reningsverk
Skelett|Byggställning|Halloween
Muskel|Motor|Styrketräning
Hud|Skyddsrock|Solbränna
Hår|Isolering|Frisörsax
Nagel|Kattklo|Halvmåne
Tand|Pärlrad|Karies
Tunga|Smakprov|Glasskula
Öga|Kamera|Regnbågsfärg
Öra|Parabol|Konsert
Näsa|Parfymprov|Nysning
Hand|Verktygslåda|Fingeravtryck
Fot|Linjal|Balans
Knä|Gångjärn|Skrapsår`,
  'Kroppens vardag': `
Hicka|Plötsligt ryck|Upprepat ljud
Gäspning|Sömnbrist|Öppen mun
Nysning|Pepparkvarn|Pollenprognos
Hosta|Halstablett|Luftvägar
Snarkning|Motorsåg|Sömnlös granne
Svett|Kylsystem|Träningspass
Tår|Lökhackning|Saltvatten
Saliv|Frimärke|Hundens mun
Blod|Donation|Rött vin
Puls|Trumslag|Handled
Andning|Blåsbälg|Dykpaus
Skratt|Kittling|Skämt
Leende|Gruppfoto|Munvinkel
Rodnad|Tomat|Pinsamt ögonblick
Gåshud|Plockad fågel|Kall vind
Fräknar|Stjärnhimmel|Prickmönster
Rynka|Skrynkligt papper|Årsringar
Ärr|Dragkedja|Gammalt sår
Blåmärke|Färgskiftning|Bordskant
Träningsvärk|Trappsteg|Gymbesök`,
  'Tid och rutiner': `
Morgon|Tandborstning|Tupp
Kväll|Nattlampa|Godnattsaga
Natt|Månsken|Stjärnhimmel
Gryning|Tuppsång|Soluppgång
Skymning|Gatulampor|Lång skugga
Vår|Pollenprognos|Fågelkvitter
Sommar|Myggnät|Badhandduk
Höst|Kratta|Skördekorg
Vinter|Bilskrapa|Vantar
Helg|Sovmorgon|Lördagsgodis
Måndag|Väckarklocka|Skolväska
Fredag|Tacobord|Helgkänsla
Lunch|Skolbespisning|Brickvagn
Frukost|Hotellbuffé|Müsli
Middag|Dukning|Matlagning
Mellanmål|Äpple|Fruktpaus
Fika|Kaffekopp|Kanelbulle
Rast|Skolgård|Lekplats
Läggdags|Tandborstning|Släckt lampa
Deadline|Väckarklocka|Kalenderlarm`,
  'Musik och scen': `
Notblad|Tangentbord|Fågelsång
Metronom|Väggklocka|Taktkänsla
Plektrum|Fingernagel|Plastbit
Stråke|Hästsvans|Fiol
Stämgaffel|Vibration|Hörselprov
Kör|Gemensam andning|Fågelsång
Orkester|Lagarbete|Instrumentfodral
Konsert|Öronproppar|Biljettkö
Festival|Leriga skor|Tältduk
Opera|Stämband|Teaterscen
Balett|Tåspetsar|Svan
Musikal|Repliker|Dansnummer
Karaoke|Textruta|Duschsång
Applåd|Handflator|Regnsmatter
Ridå|Gardin|Sammet
Scen|Strålkastare|Trägolv
Kuliss|Tapet|Låtsasvägg
Strålkastare|Ficklampa|Bilfront
Discokula|Spegel|Stjärnhimmel
Biljettlucka|Kontrollant|Papperslapp`,
  'Konst och skapande': `
Staffli|Stativ|Träben
Palett|Regnbåge|Färgblandning
Akvarell|Vattenkopp|Pensel
Oljefärg|Ateljé|Färgtub
Kolteckning|Grillglöd|Svarta fingrar
Skiss|Kladdpapper|Blyerts
Porträtt|Fotolegitimation|Ansikte
Landskapsmålning|Vykort|Horisont
Skulptur|Lera|Sockel
Staty|Duva|Brons
Mosaik|Pussel|Kakelbit
Origami|Presentpapper|Vikta vingar
Broderi|Tatuering|Små stygn
Stickning|Fårhage|Maskor
Virkning|Garnnystan|Krok
Vävning|Spindelnät|Trådkorsning
Symaskin|Bilpedal|Raka sömmar
Garn|Fårhage|Kattbus
Nål|Höstack|Rosentagg
Fingerborg|Rustning|Sömnad`,
  'Digital vardag': `
Webbläsare|Adressfält|Flikar
Sökmotor|Bibliotekarie|Sakletare
Webbsida|Bokblad|Adress
Lösenord|Dörrnyckel|Kodlås
Användarnamn|Namnskylt|Inloggning
E-post|Kuvert|Bilaga
Spam|Reklamhög|Skräpmapp
Emoji|Ansiktsuttryck|Gul färg
Chatt|Samtalsbubbla|Tangentknatter
Videosamtal|Webbkamera|Bildtelefon
Skärmdump|Fotografi|Fryst ögonblick
App|Verktygslåda|Mobiltelefon
Uppdatering|Verkstadsbesök|Omstart
Nedladdning|Wifi|Filstorlek
Säkerhetskopia|Reservnyckel|Minnesförlust
Papperskorg|Ångrat klick|Städning
Virus|Smitta|Skyddsprogram
Brandvägg|Dörrvakt|Nättrafik
Bluetooth|Trådlösa lurar|Bilradio
GPS|Satellit|Bilnavigator`,
  'Naturfenomen': `
Eko|Papegoja|Bergvägg
Tidvatten|Måne|Badstrand
Havsvåg|Vindpust|Surfbräda
Jordbävning|Tallriksskrammel|Spruckna hus
Lavin|Räddningshund|Rullande snöboll
Ras|Varningsskylt|Stenhög
Erosion|Sandpapper|Nedsliten klippa
Förvittring|Sprucken klippa|Isbit
Översvämning|Gummistövel|Källarpump
Skogsbrand|Rökpelare|Grillförbud
Årstid|Garderobsbyte|Kalender
Soluppgång|Väckarklocka|Morgonrock
Solnedgång|Vykort|Kvällspromenad
Solförmörkelse|Skuggteater|Månskiva
Månförmörkelse|Jordskugga|Röd färg
Tyngdkraft|Äppelfall|Badrumsvåg
Magnetism|Skrotkran|Kompassnål
Friktion|Varma handflator|Bromsspår
Statisk elektricitet|Stående hår|Ballong
Ljud|Vibration|Öronproppar`,
  'Landskap och mark': `
Dal|Bergssidor|Skålform
Kulle|Pulkatur|Utsikt
Slätt|Pannkaka|Sädesfält
Åker|Mjölpåse|Traktorspår
Hage|Staket|Gräsklippande djur
Hed|Ljung|Buskmark
Myr|Hjortron|Blöt tvättsvamp
Dunge|Fågelbo|Liten skog
Ravin|Djupt sår|Vattenflöde
Kanjon|Flodspår|Djup klyfta
Halvö|Kustlinje|Landbrygga
Skärgård|Båtluffning|Öhoppning
Vik|Båthamn|Badbrygga
Udde|Spjutspets|Fyrplats
Rev|Skeppsbrott|Korall
Sanddyn|Sandlåda|Vindpust
Oas|Vattenpaus|Palmblad
Bäck|Porlande|Liten bro
Damm|Grodrom|Spegelyta
Källa|Brunn|Grundvatten`,
  'Trädgård och odling': `
Vattenkanna|Tekanna|Duschmunstycke
Trädgårdsslang|Orm|Vattenkran
Vattenspridare|Dusch|Gräsmatta
Gräsklippare|Frisör|Fårhage
Häcksax|Hårklippning|Grön vägg
Sekatör|Sax|Rosbuske
Odlingslåda|Sängram|Jord under naglarna
Kompost|Matrester|Kretslopp
Gödsel|Stallgolv|Växtmat
Frö|Müsli|Fågelmatare
Lökväxt|Matförråd|Vårblomning
Grodd|Böna|Fuktigt papper
Rot|Sugrör|Trädfäste
Stam|Pelare|Årsringar
Gren|Fågelbänk|Släktträd
Blad|Solpanel|Höstfärg
Blomma|Parfymflaska|Bukett
Pollen|Nysning|Bifötter
Nektar|Saftglas|Honungsburk
Frukt|Fröpaket|Syltburk`,
  'Sagor och fantasifigurer': `
Troll|Broavgift|Skogsfigur
Enhörning|Häst|Partyhatt
Vampyr|Blodgivning|Vitlöksrädsla
Spöke|Lakan|Genomskinligt glas
Häxa|Sopborste|Kittel
Sjöjungfru|Fiskstjärt|Sjömanssaga
Jätte|Skyskrapa|Stora portioner
Tomte|Grötfat|Julstrumpa
Fe|Önskning|Trollstav
Älva|Fjärilsvingar|Sagobok
Riddare|Konservburk|Hästhovar
Prinsessa|Ärta|Kungakrona
Pirat|Ögonlapp|Skattkarta
Zombie|Stapplande steg|Skräckfilm
Varulv|Fullmåne|Hundpäls
Mumie|Bandage|Pyramid
Dvärg|Snövit|Gruvarbete
Kung|Schackbräde|Tron
Drottning|Bikupa|Schackbräde
Magiker|Kortlek|Försvinnande kanin`
};

export const words = Object.entries(groups).flatMap(([category, rows]) =>
  rows.trim().split('\n').map(row => {
    const [word, ...hints] = row.split('|');
    return { word, hints, category: mergeCategory(category) };
  })
);
