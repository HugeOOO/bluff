// Editorial rule: the route may be indirect; every link must be familiar and solid.
// Use materials, mechanisms, consequences, shared shapes or well-known stories.
// Reject niche uses, shaky trivia, misconceptions and invented personal scenarios.
// Judge the association, not just whether it is technically possible.
// Format: secret word | hint | alternative hint. Categories remain broad.
const groups = {
  'Mat': `
Popcorn|Förtexter|Ljudnivå
Pizza|Kartong|Geometri
Pasta|Studentbudget|Bränsle
Sushi|Akvarium|Japan
Tacos|Fredagssoffa|Byggsats
Hamburgare|Drive-through|Våningshus
Pannkaka|Akrobatik|Torsdag
Våffla|Kortlek|Strykjärn
Omelett|Resthantering|Hotellmorgon
Lasagne|Våningshus|Garfield
Risotto|Tålamod|Stärkelse
Falafel|Hummus|Baljväxt
Köttbullar|Möbelvaruhus|Julbord
Korv|Halvtid|Termos
Soppa|Termos|Halsont
Gröt|Tomte|Tapetklister
Sallad|Växthus|Kaninbur
Smörgås|Picknick|Brödsmulor
Pommes frites|Jordkällare|Fingertoppar
Dumpling|Presentpaket|Ångmoln`,
  'Råvaror': `
Potatis|Källare|Brännvin
Morot|Kaninbur|Snögubbe
Lök|Simmarglasögon|Tårkanal
Vitlök|Huggtänder|Andedräkt
Tomat|Ketchupfläck|Växthus
Gurka|Ögonlock|Vattenhalt
Paprika|Trafikljus|Pulver
Broccoli|Miniatyrskog|Skolbespisning
Spenat|Seriefigur|Klorofyll
Svamp|Höstpromenad|Paraply
Avokado|Smörkonsistens|Brunch
Citron|Batteriexperiment|Grimas
Apelsin|C-vitamin|Juldoft
Banan|Slapstick|Kalium
Äpple|Gravitation|Tandavtryck
Päron|Glödlampa|Föräldramöte
Jordgubbe|Midsommar|Självplock
Blåbär|Vasalopp|Tungfärg
Hallon|Fingerborg|Syltburk
Kokosnöt|Öde ö|Palmblad`,
  'Smaker och sötsaker': `
Choklad|Belöning|Handfläck
Glass|Hjärnfrys|Solvärme
Lakrits|Tandfärg|Godispåse
Marsipan|Mandelträd|Bröllop
Karamell|Tandläkarräkning|Smältpunkt
Kanelbulle|Jäsning|Snäckskal
Semla|Februari|Mustasch
Pepparkaka|Arkitektur|Snällhetsrykte
Kladdkaka|Tandpetare|Kakaoböna
Maräng|Moln|Äggvisp
Sockervadd|Tivoli|Isolering
Honung|Pollinering|Bärnstensfärg
Sylt|Källarhylla|Pannkakstorsdag
Marmelad|Rostat bröd|Glasburk
Senap|Julskinka|Gult fält
Ketchup|Vit skjorta|Barnmeny
Salt|Vinterväg|Konservering
Peppar|Nysning|Kvarnsten
Socker|Tandläkare|Energikick
Vanilj|Orkidé|Parfym`,
  'Drycker': `
Kaffe|Rastavtal|Sömnlöshet
Te|Storbritannien|Doppning
Mjölk|Mustasch|Kalcium
Juice|Frukostbuffé|Citruspress
Läsk|Tandemalj|Rapning
Saft|Barnkalas|Utspädning
Smoothie|Mixerljud|Fruktträdgård
Varm choklad|Skidstuga|Gräddmustasch
Mineralvatten|Rapning|Berggrund
Lemonad|Gatustånd|Sommarhetta
Espresso|Fingerborg|Sömnbrist
Cappuccino|Mjölkmustasch|Skumbad
Matcha|Tebuske|Grönt pulver
Chai|Kryddhylla|Kanelstång
Kombucha|Jäsning|Tebuske
Cider|Fruktträdgård|Jäsning
Öl|Humleodling|Skumgräns
Vin|Källarvalv|Årgång
Champagne|Prispall|Tryckvåg
Milkshake|Glasskopa|Tjockt sugrör`,
  'Djur': `
Katt|Internetfilm|Kartong
Hund|Dörrklocka|Bajspåse
Häst|Schack|Riddarrustning
Ko|Metan|Kalcium
Gris|Julskinka|Sparande
Får|Sömnlöshet|Stickning
Get|Klippvägg|Ostbricka
Höna|Maräng|Frukostprotein
Anka|Badrum|Brödsmulor
Gås|Gammal penna|Duntäcke
Uggla|Examen|Nattpass
Örn|Riksvapen|Glidflygplan
Kråka|Fågelskrämma|Soptunna
Papegoja|Piratskepp|Eko
Pingvin|Frack|Sydpolsexpedition
Flamingo|Balansövning|Sockervadd
Påfågel|Fåfänga|Solfjäder
Struts|Fjäderboa|Friidrott
Svan|Balett|Hjärta
Kolibri|Helikopter|Sugrör`,
  'Vilda djur': `
Elefant|Minnesmästare|Vattenkanna
Giraff|Höghus|Trädkronor
Zebra|Övergångsställe|Streckkod
Lejon|Filmstudio|Kungakrona
Tiger|Streckkod|Kamouflage
Leopard|Modeplagg|Fräknar
Björn|Börsfall|Ide
Varg|Rödluvan|Fullmåne
Räv|List|Hönshus
Älg|Trafikskylt|Jaktlag
Ren|Julafton|Lav
Hare|Påsk|Spårsnö
Ekorre|Vinterförråd|Nötknäppare
Igelkott|Taggtråd|Lövhög
Fladdermus|Ekolod|Vindsvåning
Delfin|Ekolod|Luftpaus
Val|Ubåt|Fontän
Haj|Skräckmusik|Tandbyte
Bläckfisk|Dammsugare|Bläckpatron
Manet|Brännskada|Gelé`,
  'Smådjur': `
Fjäril|Förvandling|Dominoeffekt
Bi|Fruktodling|Vaxljus
Geting|Sensommar|Picknickpanik
Myra|Logistik|Barrhög
Spindel|Skräckfilm|Vävstol
Mygga|Sömnstörning|Blodgivning
Fluga|Fönsterkarm|Soprum
Nyckelpiga|Prickig klänning|Bladlöss
Trollslända|Helikopter|Dammkant
Gräshoppa|Fiolspel|Längdhopp
Humla|Vårtecken|Pälsjacka
Snigel|Glidmedel|Trädgårdsilska
Snäcka|Husbil|Spiraltrappa
Dagmask|Kompost|Mete
Fästing|Blodgivning|Hundpäls
Skalbagge|Pansarbil|Bilmodell
Kackerlacka|Nattkök|Hyresproblem
Skorpion|Stjärnhimmel|Injektionsspruta
Tusenfoting|Skobudget|Fuktig källare
Loppa|Höjdhopp|Cirkusnummer`,
  'Natur': `
Sand|Fönster|Timglas
Berg|Kontinentaldrift|Syrebrist
Skog|Pappersbruk|Svampkorg
Sjö|Myggkväll|Skridskotur
Flod|Transportled|Delta
Hav|Containrar|Saltstänk
Ö|Färjetidtabell|Robinson
Vulkan|Flygstopp|Bördig jord
Glaciär|Havsnivå|Frysfack
Grotta|Eko|Pannlampa
Öken|Temperaturskillnad|Hägring
Strand|Metalldetektor|Badhandduk
Vattenfall|Turbiner|Tyngdkraft
Träsk|Gummistövel|Myggnät
Äng|Pollen|Slåtter
Klippa|Klätterrep|Stup
Sten|Bilruta|Slangbella
Lera|Drejskiva|Fotspår
Mossa|Sammetsmatta|Tvättsvamp
Lava|Evakuering|Ny mark`,
  'Väder och rymd': `
Regn|Doft av asfalt|Inställd picknick
Snö|Ljuddämpning|Försenad buss
Hagel|Bilförsäkring|Golfboll
Dimma|Färjehorn|Bilbelysning
Åska|Rädd hund|Överspänningsskydd
Blixt|Fotograf|Jordning
Regnbåge|Skattjakt|Prisma
Vind|Elräkning|Frisyrproblem
Storm|Nedfallen ledning|Färjestopp
Torka|Bevattningsförbud|Skördepris
Frost|Bilskrapa|Morgongräs
Dagg|Spindelnät|Våta skor
Moln|Serverhall|Bomull
Sol|D-vitamin|Elproduktion
Måne|Tidvatten|Kalender
Stjärna|Önskning|Hotellbetyg
Planet|Omloppsbana|Jordglob
Komet|Snöboll|Hästsvans
Meteor|Önskning|Krater
Norrsken|Solstorm|Nattfotograf`,
  'Växter': `
Ros|Ursäkt|Alla hjärtans dag
Tulpan|Nederländerna|Finansbubbla
Solros|Matolja|Fröpåse
Kaktus|Semesterbevattning|Western
Orkidé|Fönsterbräda|Symmetri
Maskros|Önskning|Asfaltsspricka
Nässla|Hudutslag|Vårsoppa
Lavendel|Doftpåse|Parfym
Bambu|Byggställning|Pandameny
Ek|Vinfat|Skeppsvarv
Björk|Bastu|Pollenprognos
Gran|Vardagsrumsbarr|Glitterlåda
Tall|Möbelvirke|Kåda
Pil|Flätad korg|Amor
Palm|Vykort|Oas
Lönn|Kanadas flagga|Sirap
Murgröna|Husfasad|Klättervägg
Klöver|Lyckoamulett|Kortlek
Ljung|Höstkruka|Hedlandskap
Vass|Stråtak|Fågelgömsle`,
  'Hemmet': `
Soffa|Fjärrkontroll|Flyttbråk
Fåtölj|Läshörna|Fotstöd
Säng|Väckarklocka|Drömtydning
Bord|Förhandling|Dukning
Stol|Hela havet stormar|Sittstrejk
Bokhylla|Trädfiber|Flyttkartong
Garderob|Narnia|Säsongsbyte
Spegel|Vampyr|Självbild
Matta|Flygande transport|Dammallergi
Gardin|Premiär|Insyn
Kudde|Nackspärr|Fjäderdräkt
Täcke|Temperaturbråk|Dunjacka
Lampa|Serietidningsidé|Nattfjäril
Ljusstake|Decemberfönster|Stearinfläck
Vas|Försoning|Stilleben
Tavla|Auktionsklubba|Spikhål
Klocka|Puls|Deadline
Dörr|Integritet|Tröskel
Fönster|Sand|Insyn
Trappa|Vardagsmotion|Flygeltransport`,
  'Kök och städning': `
Kylskåp|Magnetturist|Nattätande
Frys|Istid|Storkok
Ugn|Brandvarnare|Lerkruka
Mikrovågsugn|Kontorslunch|Exploderat ägg
Brödrost|Solbränna|Bränd doft
Vattenkokare|Brittisk paus|Kalkavlagring
Diskmaskin|Vattenstråle|Intorkade rester
Kastrull|Campingkök|Kokpunkt
Stekpanna|Slapstick|Brandvarnare
Durkslag|Duschstråle|Pastavatten
Visp|Luftbubblor|Träningsvärk
Rivjärn|Knograp|Ostbricka
Skärbräda|Bakteriejakt|Knivmärken
Kavel|Pepparkakshus|Utplattning
Mortel|Krossad peppar|Krydddoft
Dammsugare|Kattskräck|Borttappat lego
Mopp|Halkskylt|Skurhink
Tvättmaskin|Försvunnen strumpa|Centrifugalkraft
Strykjärn|Skjortkrage|Brännmärke
Sopborste|Häxa|Tandborste`,
  'Kläder och tillbehör': `
Jacka|Garderobsavgift|Aprilväder
Kappa|Detektiv|Ylle
Tröja|Garnnystan|Statisk elektricitet
Skjorta|Anställningsintervju|Strykbräda
Byxor|Knälagning|Plånboksficka
Jeans|Bomullsfält|Indigo
Klänning|Nobelmiddag|Galakväll
Kjol|Skotskt högland|Dansvirvel
Strumpa|Tåvärme|Torktumlare
Sko|Askungen|Skavsår
Stövel|Lerpöl|Katt i saga
Sandal|Turistfoto|Solbrända remmar
Hatt|Trollkonst|Hårfrisyr
Mössa|Frisyrkollaps|Värmeläckage
Halsduk|Supporter|Halsont
Vante|Snöbollskrig|Fingeravtryck
Slips|Fars dag|Knutproblem
Bälte|Säkerhetskontroll|Karate
Glasögon|Imma|Näsavtryck
Ryggsäck|Skolstart|Packåsna`,
  'Verktyg och saker': `
Hammare|Tumme|Auktionssal
Skruvmejsel|Batterilucka|Platta möbler
Såg|Årsringar|Tandrad
Borrmaskin|Grannkonflikt|Betongdamm
Tång|Tandläkare|Hummerklo
Yxa|Vedbod|Skogsskräck
Spade|Arkeologi|Skattkarta
Kratta|Höstträdgård|Slapstick
Stege|Fönsterputs|Äppelplockning
Måttband|Skräddare|Hemrenovering
Vattenpass|Bubbla|Tavelhängning
Ficklampa|Strömavbrott|Spökhistoria
Kompass|Kylskåpsdörr|Skattkarta
Paraply|Cocktailglas|Mary Poppins
Nyckel|Låssmed|Under dörrmattan
Hänglås|Kärleksbro|Gymväska
Sax|Invigning|Pappersfigur
Tejp|Julklappspanik|Luddrulle
Lim|Modellbygge|Kladdiga fingrar
Rep|Dragkamp|Sjömansknop`,
  'Transport': `
Cykel|Byxklämma|Tour de France
Bil|Köbildning|Besiktning
Buss|Dragspel|Månadskort
Tåg|Rälsljud|Förseningsersättning
Spårvagn|Göteborg|Luftledning
Tunnelbana|Gatumusik|Underjordisk konst
Flygplan|Lufttryck|Säkerhetsbälte
Helikopter|Lönnfrö|Räddningsaktion
Båt|Ankare|Sjösjuka
Färja|Bildäck|Pendling
Ubåt|Periskop|Ekolod
Segelbåt|Vindprognos|Knopar
Kanot|Bäversvans|Tyst framfart
Kajak|Balansövning|Sittbrunn
Motorcykel|Skinnställ|Hjälmfrisyr
Moped|Femtonårsdag|Hjälmkrav
Traktor|Skördetid|Landsvägskö
Lastbil|Rastplats|Logistik
Ambulans|Blåljus|Sirener
Luftballong|Skorsten|Vindriktning`,
  'Platser och byggnader': `
Bibliotek|Viskning|Förseningsavgift
Museum|Monterglas|Tidsresa
Biograf|Dejtkväll|Prasselilska
Teater|Ridåfall|Röda sammetsstolar
Sjukhus|Nattpass|Handdesinfektion
Apotek|Kölapp|Recept
Skola|Sommarlov|Korridorspring
Universitet|Studieskuld|Avhandling
Kyrka|Akustik|Bröllopslöften
Slott|Kungakrona|Vallgrav
Fängelse|Kalenderstreck|Besöksdag
Brandstation|Utryckning|Nattlarm
Fyr|Blinkers|Sjöfart
Bro|Trollsaga|Genväg
Tunnel|Radioavbrott|Bergsprängning
Flygplats|Vätskepåse|Avsked
Tågstation|Avsked|Återförening
Hamn|Måsar|Tullkontroll
Camping|Myggnät|Gemensam dusch
Hotell|Liten schampoflaska|Frukostbuffé`,
  'Sport och fritid': `
Fotboll|Offsidebråk|Gräsfläckar
Tennis|Hundpromenad|Domarstol
Golf|Gräsmatta|Mullvad
Basket|Parkettgnissel|Tvättkorg
Volleyboll|Sand i skorna|Fingertoppar
Ishockey|Tandlucka|Utvisningsbås
Simning|Klorlukt|Russinfingrar
Löpning|Skoskav|Nummerlapp
Cykling|Motvind|Klungtaktik
Skidåkning|Vallabod|Blåbärssoppa
Snowboard|Liftkö|Sidledes
Skridskor|Varm choklad|Balansnummer
Klättring|Kritdamm|Säkerhetslina
Boxning|Tandskydd|Ringklocka
Brottning|Kramkalas|Matta
Fäktning|Skyddsmask|De tre musketörerna
Bowling|Låneskor|Ränna
Biljard|Grön duk|Geometri
Dart|Brittisk pub|Huvudräkning
Schack|Tankearbete|Drottningoffer`,
  'Musik och kultur': `
Piano|Flyttfirma|Övergångsställe
Gitarr|Lägereld|Fingertoppar
Trumma|Grannklagomål|Marsch
Fiol|Hästsvans|Orkesterdike
Flöjt|Fågelkvitter|Andningskontroll
Trumpet|Väckning|Kindmuskler
Saxofon|Jazzklubb|Mässing
Harpa|Änglavingar|Vävstol
Dragspel|Folkdräkt|Bussmodell
Mikrofon|Rundgång|Talarskräck
Hörlurar|Trassel|Pendlingsbubbla
Högtalare|Grannfest|Membran
Skivspelare|Loppisfynd|Nålbyte
Radio|Sjörapport|Bilkö
Kamera|Rödögd|Mörkrum
Bok|Trädfiber|Vikta hörn
Tidning|Återvinning|Trycksvärta
Serietidning|Pratbubbla|Bildruta
Pussel|Försvunnen bit|Regnsemester
Kortlek|Las Vegas|Trolleri`,
  'Teknik': `
Mobiltelefon|Tumgymnastik|Nackvärk
Dator|Fläktdamm|Schackmästare
Tangentbord|Smulor|Piano
Datormus|Handledsvärk|Pekfinger
Skärm|Fyrkantiga ögon|Fingeravtryck
Skrivare|Pappersstopp|Bläckfläck
Router|Trafikpolis|Omstart
Laddare|Vägguttag|Batteriprocent
Batteri|Citronexperiment|Fjärrkontroll
Solcell|Takläggare|Molnprognos
Glödlampa|Idé i serietidning|Varmt glas
Robot|Industrigolv|Automatisering
Drönare|Fjärrkontroll|Fågelperspektiv
Satellit|Väderkarta|Fotbollssändning
Teleskop|Tidsresa|Förstoringsglas
Mikroskop|Lökhinna|Laborationsrock
Termometer|Sjukfrånvaro|Väderprognos
Miniräknare|Matteprov|Delad nota
USB-minne|Nyckelknippa|Glömd presentation
Hårddisk|Familjealbum|Minnesförlust`,
  'Vardag och upplevelser': `
Semester|Autosvar|Packningslista
Födelsedag|Ålderskris|Utandning
Bröllop|Risregn|Sittordning
Begravning|Svart slips|Dödsannons
Jul|Barr i strumpan|Övertid på posten
Påsk|Fjäderkvist|Äggkartong
Midsommar|Små grodorna|Blomsterkrans
Nyår|Hundoro|Brutna löften
Halloween|Tandläkare|Ringklocka
Karneval|Konfetti|Maskerad
Picknick|Myrbesök|Rutig filt
Utflykt|Sittunderlag|Termos
Fiske|Tålamod|Gummistövel
Trädgård|Ogräsrensning|Jord under naglarna
Bastu|Svettpärlor|Finsk vana
Massage|Träningsvärk|Lugn musik
Dröm|Dagbok|Ologisk handling
Kö|Nummerlapp|Väntetid
Hemlighet|Viskning|Dagbokslås
Överraskning|Presentpapper|Hjärtklappning`
};

export const words = Object.entries(groups).flatMap(([category, rows]) =>
  rows.trim().split('\n').map(row => {
    const [word, ...hints] = row.split('|');
    return { word, hints, category };
  })
);
