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
Överraskning|Presentpapper|Hjärtklappning`,
  'Däggdjur': `
Kanin|Trollhatt|Påskägg
Hamster|Ekorrhjul|Kindpåse
Marsvin|Höbur|Försökslaboratorium
Råtta|Avloppsrör|Ostfälla
Mus|Datorbord|Litet hål
Chinchilla|Pälsjacka|Sandbad
Iller|Långsmal kropp|Husdjurshängmatta
Åsna|Envishet|Packning
Kamel|Fettreserv|Ökenkaravan
Dromedar|Sanddyn|Fartgupp
Noshörning|Pansarplåt|Tjurhorn
Flodhäst|Gäspning|Afrikansk flod
Gorilla|Brösttrumma|Människosläkting
Schimpans|Verktygslåda|Djungelforskare
Orangutang|Röd frisyr|Trädkoja
Sengångare|Långsam hiss|Hängande vardag
Koala|Eukalyptus|Sömnbehov
Känguru|Studsmatta|Magficka
Panda|Bamburör|Svartvit film
Tvättbjörn|Ögonmask|Soptunnelock`,
  'Hav och vatten': `
Lax|Rosa färg|Motström
Abborre|Randig tröja|Metspö
Gädda|Vassa tänder|Vassrugge
Torsk|Fiskpinne|Skäggtråd
Sill|Julbord|Konservburk
Makrill|Tomatsås|Randig rygg
Tonfisk|Konservöppnare|Sushimeny
Sjöhäst|Schackpjäs|Krökt hals
Sjöstjärna|Julgranstopp|Havsbotten
Krabba|Sidosteg|Nypa
Hummer|Skaldjursfest|Nötknäppare
Räka|Cocktailglas|Smörgåstårta
Mussla|Gångjärn|Strandfynd
Ostron|Pärlhalsband|Hårt skal
Korall|Undervattensstad|Dyksemester
Säl|Badboll|Klipphäll
Valross|Mustasch|Elfenben
Utter|Vattenrutschkana|Fiskmiddag
Bäver|Timmerman|Översvämning
Ål|Ormform|Slingrande rörelse`,
  'Frukt och grönt': `
Ananas|Taggig frisyr|Tropisk juice
Mango|Stor kärna|Tropisk smoothie
Kiwi|Fågelnamn|Grönt tvärsnitt
Persika|Sammetsyta|Sommarfrukt
Plommon|Torkad frukt|Trädgårdsträd
Körsbär|Örhänge|Sten i mitten
Vindruva|Vinkällare|Klase
Melon|Vattenförråd|Sommarpicknick
Granatäpple|Rubiner|Små frökammare
Fikon|Småkärnor|Ostbricka
Dadlar|Oas|Ramadan
Russin|Skrynklig hud|Glöggkopp
Tranbär|Röd juice|Myrmark
Lingon|Skogspromenad|Köttbullstallrik
Hjortron|Guldfärg|Myrmark
Rabarber|Grimas|Pajform
Rödbeta|Fingerfärg|Inlagd burk
Blomkål|Vitt moln|Grönsaksland
Purjolök|Kikare|Soppskål
Selleri|Grön stjälk|Knaster`,
  'Mat och måltider': `
Ärtsoppa|Torsdagsmeny|Baljväxt
Fiskpinne|Geometrisk form|Remouladsås
Fiskgratäng|Potatismos|Ugnsvärme
Kebab|Snurrande pelare|Nattmat
Burrito|Sovsäck|Inpackad lunch
Quesadilla|Smält ost|Halvmåne
Paella|Stor stekpanna|Saffransfärg
Couscous|Små korn|Nordafrika
Hummus|Falafeltallrik|Kikärtor
Guacamole|Grön röra|Tortillachips
Pesto|Mortel|Grön pastasås
Ratatouille|Tecknad råtta|Grönsaksgryta
Chili con carne|Hetta|Bönburk
Gulasch|Paprikapulver|Värmande gryta
Schnitzel|Hammarslag|Frasig yta
Kroppkaka|Potatisåker|Fyllt paket
Pyttipanna|Restfest|Tärningsform
Raggmunk|Rivjärn|Lingonburk
Surströmming|Klädnypa|Svullen burk
Smörgåstårta|Bygglager|Kall festmat`,
  'Bakverk och efterrätter': `
Prinsesstårta|Kungakrona|Grön kupol
Morotskaka|Snögubbe|Vit glasyr
Cheesecake|Ostbricka|Smulbotten
Äppelpaj|Höstskörd|Vaniljsås
Chokladboll|Rullning|Kokosflingor
Muffins|Papperskjol|Bakpulver
Croissant|Halvmåne|Fransk frukost
Wienerbröd|Smörlager|Konditori
Donut|Livboj|Glasyr
Bagel|Hål i mitten|Frukostmacka
Scones|Brittisk paus|Bakpulver
Baguette|Svärdfäktning|Papperspåse
Knäckebröd|Knaster|Hålkaka
Skorpa|Doppning|Brödsmulor
Polkagris|Randig käpp|Gränna
Geléhallon|Fruktbuske|Mjukt godis
Nougat|Nötknäppare|Chokladask
Tryffel|Kakaopulver|Lyxkonfekt
Sorbet|Fruktjuice|Frysfack
Pannacotta|Dallrande yta|Gräddkanna`,
  'Kryddor och tillbehör': `
Smör|Gräddkanna|Smältpunkt
Ost|Musfälla|Mjölkgård
Yoghurt|Frukostskål|Bakteriekultur
Grädde|Visp|Tårtdekoration
Ägg|Maräng|Påskmålning
Mjöl|Dammoln|Sädesfält
Jäst|Ballongexperiment|Luftigt bröd
Bakpulver|Vulkanexperiment|Ugnshöjd
Kanel|Bark|Juldoft
Kardemumma|Bageridoft|Kryddkvarn
Saffran|Luciakrona|Gul färg
Gurkmeja|Gul fläck|Kryddhylla
Ingefära|Rotknöl|Vinterdryck
Basilika|Pesto|Italiensk doft
Oregano|Pizzakartong|Örtkruka
Dill|Kräftskiva|Färskpotatis
Persilja|Grön kvist|Kryddträdgård
Rosmarin|Barrliknande blad|Örtkruka
Timjan|Små blad|Kryddträdgård
Mynta|Tuggummi|Tandkräm`,
  'Småsaker hemma': `
Fjärrkontroll|Soffkudde|Batterijakt
Väckarklocka|Snooze|Måndagsångest
Blomkruka|Fat|Jord under naglarna
Galge|Axlar|Kemtvätt
Klädnypa|Krokodilmun|Vårvind
Tvättkorg|Försvunna strumpor|Veckotvätt
Soptunna|Måsbesök|Sophämtning
Återvinningspåse|Glasflaskor|Sortering
Dörrmatta|Leriga skor|Välkomsthälsning
Ringklocka|Oväntat besök|Hundskall
Brevinkast|Reklamblad|Hallgolv
Kuvert|Frimärke|Hemligt meddelande
Frimärke|Saliv|Vykort
Kalender|Väggspik|Födelsedagsminne
Fotoalbum|Släktträff|Tidsresa
Ram|Kantlinje|Familjeporträtt
Ljus|Romantisk middag|Strömavbrott
Tändsticka|Skogsbrand|Plån
Tändare|Gnista|Gasbehållare
Brandvarnare|Bränt bröd|Batteripip`,
  'Badrum och hygien': `
Handduk|Frotté|Blött hår
Badkar|Russinfingrar|Skumbubblor
Dusch|Konstgjort regn|Kakelfog
Toalett|Avloppsrör|Låst dörr
Handfat|Tandkrämsfläck|Vattenlås
Toalettpapper|Pappersbruk|Tom rulle
Tandborste|Igelkottsrygg|Morgonrutin
Tandkräm|Pepparmynta|Skum i munnen
Tandtråd|Sytråd|Mellanrum
Schampo|Skumbad|Hårbotten
Balsam|Tovutredning|Silkeskänsla
Deodorant|Omklädningsrum|Svettlukt
Parfym|Blomsteräng|Minnesspår
Rakapparat|Gräsklippare|Skäggstubb
Rakhyvel|Skridskoskena|Raklödder
Nagelsax|Manikyr|Halvmåne
Hårborste|Igelkott|Trassel
Kam|Tandrad|Mittbena
Plåster|Skavsår|Sårskorpa
Förbandslåda|Rött kors|Utflyktsväska`,
  'Klädesplagg': `
Regnrock|Vattendroppar|Gul färg
Väst|Ärmlöshet|Kostym
Kavaj|Jobbintervju|Innerficka
Kostym|Bröllopsgäst|Kemtvätt
Frack|Pingvin|Nobelmiddag
Pyjamas|Tandborstning|Sovmorgon
Nattlinne|Godnattsaga|Sängvärme
Badrock|Hotellfrukost|Frotté
Baddräkt|Klorlukt|Simskola
Bikini|Solränder|Strandväska
Shorts|Sommarknän|Fotpall
Leggings|Stretch|Gympapåse
Overall|Sandlåda|Snöängel
Förkläde|Mjölmoln|Klädskydd
Skärmmössa|Solögon|Baseboll
Öronmuffar|Vintervind|Hörlursform
Hängslen|Axlar|Byxfall
Bröstnäsduk|Kavajficka|Vikt tyg
Manschettknapp|Skjortärm|Smyckesask
Brosch|Säkerhetsnål|Kavajslag`,
  'Verkstad och fästen': `
Spik|Tumme|Väggtavla
Skruv|Spiraltrappa|Platta möbler
Mutter|Gängor|Cykelreparation
Bricka|Tryckfördelning|Hål i mitten
Gångjärn|Knarr|Öppningsrörelse
Krok|Fisketur|Jackhängning
Karbinhake|Klätterrep|Snabbkoppling
Säkerhetsnål|Första förband|Trasiga kläder
Gem|Pappershög|Böjd tråd
Häftapparat|Kontorsbord|Metallklammer
Hålslag|Konfetti|Pärm
Sandpapper|Len yta|Träflisor
Fil|Tandrad|Metallspån
Hyvel|Lockiga spån|Slät bräda
Mejsel|Stenhuggare|Hammarslag
Skiftnyckel|Rörmokare|Justerbar käft
Insexnyckel|Möbelkartong|Sexhörning
Färgroller|Tapetbyte|Väggkulör
Pensel|Hårstrån|Färgfläck
Skottkärra|Balans|Jordlass`,
  'Material': `
Trä|Årsringar|Pappersbruk
Papper|Skogsavverkning|Vikta flygplan
Kartong|Flyttdag|Pappersinsamling
Glas|Sandtag|Skärvor
Metall|Skrothög|Klang
Järn|Rostfläck|Magnet
Stål|Besticklåda|Skyskrapa
Koppar|Elledning|Grön ärg
Aluminium|Läskburk|Ugnsfolie
Guld|Prispall|Vigselring
Silver|Andraplats|Smyckeskrin
Plast|Oljefält|Återvinningssymbol
Gummi|Bildäck|Sudd
Läder|Skoputs|Sadel
Ull|Fårhage|Vintervärme
Siden|Kokong|Handelsväg
Linne|Linblomma|Skrynkligt tyg
Betong|Cementblandare|Motorvägsbro
Tegel|Lertag|Skorsten
Keramik|Lertag|Brännugn`,
  'Byggnader och byggdelar': `
Tak|Paraply|Regnvatten
Golv|Fotsteg|Skurhink
Vägg|Tapet|Insynsskydd
Skorsten|Sotare|Röksignal
Balkong|Blomlåda|Höjdrädsla
Veranda|Gungstol|Kaffebricka
Vindsvåning|Snedtak|Högt läge
Källare|Potatisförråd|Marknivå
Garage|Oljefläck|Verktygsbänk
Carport|Paraply|Parkeringsplats
Staket|Tomtgräns|Hundrastning
Grind|Gångjärn|Trädgårdsentré
Port|Stadsnyckel|Stor öppning
Mur|Borgförsvar|Tegelbruk
Borg|Riddarrustning|Vallgrav
Skyskrapa|Hisskö|Höjdrädsla
Stuga|Vedbod|Myggkväll
Växthus|Kondens|Tomatodling
Lekstuga|Låtsasfamilj|Minimöbler
Igloo|Snöängel|Värmeisolering`,
  'Arbetsplatser och ärenden': `
Bageri|Jästdoft|Morgonskift
Konditori|Glasmonter|Födelsedagsbeställning
Restaurang|Dricks|Bordsbokning
Kafé|Lattekonst|Pausmöte
Pizzeria|Kartonghög|Ostdoft
Matsal|Brickvagn|Lunchrast
Butik|Köplust|Kvittorulle
Kiosk|Småpengar|Lördagsgodis
Varuhus|Rulltrappa|Shoppingpåse
Marknad|Prutning|Torgstånd
Bondgård|Gryningsarbete|Mjölkleverans
Stall|Hölukt|Skottkärra
Verkstad|Oljiga händer|Skyddsglasögon
Fabrik|Löpande band|Skiftarbete
Kontor|Kaffepaus|Skrivbordsstol
Bank|Ränta|Spargris
Postkontor|Frimärke|Paketvåg
Frisörsalong|Avklippta hår|Väntestol
Tvätteri|Klädhögar|Strykbord
Återvinningscentral|Släpvagn|Sorteringsskylt`,
  'Yrken': `
Lärare|Rödpenna|Sommarlov
Läkare|Väntrum|Receptblock
Sjuksköterska|Nattskift|Blodtryck
Tandläkare|Borrljud|Gapande
Veterinär|Hundkoppel|Väntrum
Brandman|Rökdykning|Hjälm
Polis|Handbojor|Trafikdirigering
Pilot|Höjdmätare|Cockpit
Sjökapten|Brygga|Navigering
Lokförare|Tidtabell|Förarhytt
Busschaufför|Hållplats|Ratt
Taxichaufför|Adress|Taxameter
Apotekare|Receptblock|Pillerburk
Bonde|Väderoro|Traktor
Bagare|Mjölfläck|Gryningsarbete
Kock|Vass kniv|Vit mössa
Servitör|Brickbalans|Dricks
Snickare|Träspån|Tumstock
Elektriker|Proppskåp|Spänning
Rörmokare|Vattenläcka|Skiftnyckel
Målare|Färgstänk|Stege
Murare|Tegelstapel|Vattenpass
Arkitekt|Modellhus|Ritningsrulle
Ingenjör|Problemlösning|Konstruktion
Bibliotekarie|Bokvagn|Viskning
Journalist|Anteckningsblock|Deadline
Fotograf|Röda ögon|Bröllopsminne
Författare|Tomt papper|Bokmässa
Skådespelare|Lånad identitet|Replikminne
Dansare|Taktkänsla|Scengolv
Sångare|Stämband|Mikrofonstativ
Musiker|Notställ|Repetition
Dirigent|Trafikpolis|Taktpinne
Domare|Visselpipa|Rättvisa
Advokat|Lagbok|Försvarstal
Forskare|Frågetecken|Experiment
Astronaut|Tyngdlöshet|Frystorkad mat
Arkeolog|Jordlager|Gammal kruka
Brevbärare|Tidiga steg|Kuvert
Sotare|Svarta händer|Takstege`,
  'Skolsaker': `
Blyertspenna|Diamant|Träspån
Kulspetspenna|Bläckfläck|Namnteckning
Suddgummi|Ångra|Smulor
Linjal|Raka vägen|Centimeter
Passare|Cirkel|Vass spets
Gradskiva|Tårtbitar|Vinkelmått
Pennvässare|Spånhög|Vass spets
Pennfodral|Skolväska|Småsaksförvaring
Skrivbok|Marginal|Rutnät
Anteckningsblock|Minneshjälp|Rivkant
Pärm|Ringar|Pappersordning
Mapp|Sortering|Pappersficka
Whiteboard|Suddbara tankar|Mötesrum
Krittavla|Dammiga fingrar|Skolsal
Krita|Regnskur|Asfaltskonst
Projektor|Ljuskägla|Mörkt klassrum
Jordglob|Fotboll|Världsresa
Världskarta|Vikveck|Reseplan
Skolväska|Tunga böcker|Axelband
Gympapåse|Svettiga kläder|Omklädningsrum`,
  'Lek och spel': `
Lego|Fotplåga|Bygglov
Docka|Låtsasförälder|Minikläder
Nalle|Nattvakt|Tröst
Gosedjur|Sängvakt|Mjukt sällskap
Leksaksbil|Vardagsrumsrally|Bordsparkering
Modelljärnväg|Miniatyrstad|Spårbyte
Bilbana|Elektrisk fart|Hårnålskurva
Jojo|Återkomst|Snörtrick
Snurra|Balanspunkt|Rotation
Kula|Glasblåsning|Sandgrop
Tärning|Slump|Prickmönster
Domino|Kedjereaktion|Vita prickar
Memory|Parbildning|Minnesgympa
Monopol|Hyresvärd|Fängelsebesök
Fia med knuff|Hemväg|Utkastad gäst
Yatzy|Sannolikhet|Protokoll
Bingo|Nummerrop|Spelbricka
Lotto|Vinstdröm|Sifferkombination
Rubiks kub|Färgsortering|Vridning
Korthus|Andningspaus|Rasrisk`,
  'Utelek och rörelse': `
Gunga|Pendel|Fjärilar i magen
Rutschkana|Tyngdkraft|Fart i byxan
Studsmatta|Fjäderkraft|Höjdhopp
Sandlåda|Miniatyrslott|Hinkform
Gungbräda|Hävstång|Balansbråk
Karusell|Centrifugalkraft|Yrsel
Hopprep|Boxningsträning|Fotarbete
Rockring|Midjegymnastik|Planetbana
Frisbee|Flygande tallrik|Parkgräs
Drake|Vindstyrka|Snörtrassel
Såpbubbla|Regnbågshinna|Utandning
Vattenpistol|Sommarbråk|Blöta kläder
Slangbella|Spänd kraft|Busstreck
Pilbåge|Robin Hood|Fjäderkraft
Kubb|Träklossar|Kungafall
Krocket|Trädgårdsbågar|Träklubba
Kurragömma|Blundande|Tystnad
Kull|Jaktlek|Snabb vändning
Brännboll|Skolgård|Rundtur
Dragkamp|Lagarbete|Friktion`,
  'Resor': `
Pass|Gränskontroll|Dåligt porträtt
Biljett|Kontrollant|Entré
Resväska|Övervikt|Hotellgolv
Handbagage|Hyllplats|Vätskepåse
Bagageband|Återförening|Snurrande väntan
Säkerhetskontroll|Avtagna skor|Röntgenbild
Tull|Gräns|Deklaration
Vägtull|Betalstation|Bilkö
Rondell|Cirkelrörelse|Väjningsplikt
Övergångsställe|Zebra|Väntande fot
Trafikljus|Paprikafärger|Stopp
Vägskylt|Metallstolpe|Navigering
Parkering|Papperslapp|Backning
Tankstation|Kaffestopp|Bränslepris
Rastplats|Picknickbord|Stela ben
Campingvagn|Rullande sovrum|Sommarkö
Husbil|Semesterkök|Parkeringsplats
Släpvagn|Flyttdag|Backningsproblem
Lift|Höjdskillnad|Skidsemester
Linbana|Hängande transport|Bergstopp`,
  'Friluftsliv': `
Tält|Daggdroppar|Knuten rygg
Sovsäck|Kokong|Stjärnhimmel
Liggunderlag|Kall mark|Luftmadrass
Termos|Värmeisolering|Skidutflykt
Stormkök|Bränsleflaska|Frystorkad middag
Kåsa|Lägereld|Bärplockning
Fältflaska|Törst|Vandringsled
Vandringsstav|Extra ben|Balanshjälp
Flytväst|Kork|Säkerhetssele
Livboj|Donut|Räddningslina
Ankare|Broms|Havsbotten
Åra|Bäversvans|Muskelkraft
Paddel|Vattenmotstånd|Bäversvans
Segel|Vindfång|Lakan
Fiskespö|Tålamod|Böjd pinne
Håv|Fjärilsjakt|Nätpåse
Kikare|Läktarplats|Fågelräkning
Förstoringsglas|Detektiv|Solstråle
Lupp|Frimärkssamling|Detaljgranskning
Pannlampa|Fria händer|Mörkerlöpning`,
  'Kroppen': `
Hjärta|Pumpstation|Alla hjärtans dag
Lunga|Blåsbälg|Syrebehov
Hjärna|Kontrollrum|Valnötsform
Mage|Kurrande|Fjärilar
Tarm|Labyrint|Näringsupptag
Lever|Reningsverk|Blodflöde
Njure|Kaffefilter|Blodrening
Skelett|Byggställning|Halloween
Muskel|Motor|Styrketräning
Hud|Skyddskläder|Solbränna
Hår|Isolering|Frisörsax
Nagel|Gitarrspel|Fingertopp
Tand|Pärlrad|Karies
Tunga|Smakprov|Räckutgest
Öga|Kamera|Pupill
Öra|Parabol|Konsert
Näsa|Parfymprov|Nysning
Hand|Verktygslåda|Fingeravtryck
Fot|Måttenhet|Balans
Knä|Gångjärn|Skrapsår`,
  'Kroppens vardag': `
Hicka|Rytmfel|Plötsligt ljud
Gäspning|Sömnbrist|Smittsam gest
Nysning|Pepparkvarn|Pollenprognos
Hosta|Halstablett|Kall luft
Snarkning|Nattkonsert|Störd granne
Svett|Kylsystem|Träningspass
Tår|Lökhackning|Sorg
Saliv|Frimärke|Hundens mun
Blod|Röd färg|Donation
Puls|Trumslag|Handled
Andning|Blåsbälg|Dykpaus
Skratt|Magträning|Skämt
Leende|Gruppfoto|Munvinkel
Rodnad|Strålkastare|Pinsamt ögonblick
Gåshud|Plockad fågel|Kall vind
Fräknar|Stjärnhimmel|Prickmönster
Rynka|Kartlinje|Årsringar
Ärr|Gammalt äventyr|Hudminne
Blåmärke|Färgskiftning|Bordskant
Träningsvärk|Trappångest|Dagen efter`,
  'Tid och rutiner': `
Morgon|Tandborstning|Väckning
Kväll|Låg sol|Godnattsaga
Natt|Skiftarbete|Stjärnhimmel
Gryning|Tuppsång|Första ljuset
Skymning|Gatulampor|Lång skugga
Vår|Pollenprognos|Fågelkvitter
Sommar|Myggnät|Långa dagar
Höst|Kratta|Skördekorg
Vinter|Bilskrapa|Mörka morgnar
Helg|Sovmorgon|Lördagsgodis
Måndag|Väckarklocka|Ny arbetsvecka
Fredag|Tacobord|Helgkänsla
Lunch|Halvdagspaus|Brickvagn
Frukost|Hotellbuffé|Tom mage
Middag|Dukning|Kvällssamtal
Mellanmål|Skolväska|Fruktpaus
Fika|Kaffekopp|Arbetsrast
Rast|Skolgård|Sträckta ben
Läggdags|Tandborstning|Släckt lampa
Deadline|Tidspress|Kalenderlarm`,
  'Musik och scen': `
Notblad|Flugprickar|Musikställ
Metronom|Pendel|Taktkänsla
Plektrum|Plastbit|Strängknäpp
Stråke|Hästsvans|Friktion
Stämgaffel|Vibration|Bestämd ton
Kör|Gemensam andning|Många röster
Orkester|Lagarbete|Notställ
Konsert|Öronproppar|Biljettkö
Festival|Leriga skor|Tältgranne
Opera|Stämband|Orkesterdike
Balett|Tåspetsar|Svan
Musikal|Repliker|Dansnummer
Karaoke|Textruta|Modprov
Applåd|Handflator|Tacksamhet
Ridå|Hemlig start|Sammet
Scen|Strålkastare|Nervositet
Kuliss|Låtsasvägg|Bakgrund
Strålkastare|Ljuskon|Bilfront
Discokula|Mosaik|Ljusprickar
Biljettlucka|Köbildning|Kvällsplan`,
  'Konst och skapande': `
Staffli|Tre ben|Ateljé
Palett|Färgblandning|Handhål
Akvarell|Vattenpöl|Genomskinlig färg
Oljefärg|Lång torktid|Ateljédoft
Kolteckning|Grillglöd|Svarta fingrar
Skiss|Första tanke|Lösa linjer
Porträtt|Identitet|Modell
Landskapsmålning|Utsikt|Horisont
Skulptur|Tre dimensioner|Sockel
Staty|Duva|Torg
Mosaik|Pussel|Kakelbit
Origami|Vikveck|Pappersfågel
Broderi|Textilbild|Små stygn
Stickning|Fårhage|Maskor
Virkning|Garnnystan|Krok
Vävning|Spindelnät|Trådkorsning
Symaskin|Pedal|Raka sömmar
Garn|Fårhage|Kattbus
Nål|Höstack|Akupunktur
Fingerborg|Minirustning|Sömnad`,
  'Digital vardag': `
Webbläsare|Fönsterflikar|Adressfält
Sökmotor|Bibliotekarie|Frågetecken
Webbsida|Adress|Klickväg
Lösenord|Dörrnyckel|Minnesprov
Användarnamn|Namnskylt|Inloggning
E-post|Kuvert|Bilaga
Spam|Överfull brevlåda|Skräpmapp
Emoji|Ansiktsuttryck|Bildspråk
Chatt|Samtalsbubbla|Tangentknatter
Videosamtal|Webbkamera|Avståndsmöte
Skärmdump|Bevisbild|Fryst ögonblick
App|Fickverktyg|Startikon
Uppdatering|Ny version|Omstart
Nedladdning|Väntestapel|Filhämtning
Säkerhetskopia|Reservnyckel|Minnesförlust
Papperskorg|Ångrat klick|Städning
Virus|Smitta|Skyddsprogram
Brandvägg|Dörrvakt|Nättrafik
Bluetooth|Trådlösa lurar|Parkoppling
GPS|Satellit|Vilse`,
  'Naturfenomen': `
Eko|Papegoja|Bergvägg
Tidvatten|Måne|Blottad havsbotten
Havsvåg|Vindkraft|Gungande båt
Jordbävning|Tallriksskrammel|Byggsäkerhet
Lavin|Räddningshund|Snömassor
Ras|Varningsskylt|Instabil mark
Erosion|Sandpapper|Tidens spår
Förvittring|Sprucken klippa|Frost
Översvämning|Gummistövel|Källarpump
Skogsbrand|Rökpelare|Grillförbud
Årstid|Klädbyte|Jordaxel
Soluppgång|Väckarklocka|Kompass
Solnedgång|Vykort|Kompass
Solförmörkelse|Himmelsk skugga|Skyddsglasögon
Månförmörkelse|Jordskugga|Röd färg
Tyngdkraft|Äppelfall|Badrumsvåg
Magnetism|Kylskåpsdörr|Kompassnål
Friktion|Varma handflator|Bromsspår
Statisk elektricitet|Stående hår|Ballongtrick
Ljud|Vibration|Öronproppar`,
  'Landskap och mark': `
Dal|Mellanrum|Bergssidor
Kulle|Utsikt|Pulkatur
Slätt|Horisont|Sädesfält
Åker|Mjölpåse|Traktorspår
Hage|Staket|Betande djur
Hed|Ljung|Öppen mark
Myr|Hjortron|Våta strumpor
Dunge|Fågelbo|Skuggplats
Ravin|Djup spricka|Vattenerosion
Kanjon|Flodspår|Stup
Halvö|Nästan avskild|Kustlinje
Skärgård|Båtluffning|Klipphällar
Vik|Lä|Badbrygga
Udde|Spetsig kust|Utsiktspunkt
Rev|Skeppsbrott|Grund
Sanddyn|Vindskulptur|Ökenvandring
Oas|Vattenpaus|Palmblad
Bäck|Porlande|Gummistövel
Damm|Grodrom|Vattenyta
Källa|Grundvatten|Uppflöde`,
  'Trädgård och odling': `
Vattenkanna|Elefantsnabel|Duschmunstycke
Trädgårdsslang|Ormform|Vattentryck
Vattenspridare|Konstgjort regn|Sommarlek
Gräsklippare|Frisör|Lördagsljud
Häcksax|Frisyr|Grön vägg
Sekatör|Knips|Rosbuske
Odlingslåda|Minifält|Jord under naglarna
Kompost|Matrester|Kretslopp
Gödsel|Växtmat|Stalldoft
Frö|Startpaket|Framtida skog
Lökväxt|Underjordiskt förråd|Vårblomning
Grodd|Första början|Fuktigt papper
Rot|Sugrör|Trädfäste
Stam|Pelare|Årsringar
Gren|Fågelbänk|Familjeträd
Blad|Solpanel|Höstfärg
Blomma|Pollinatör|Bukett
Pollen|Nysning|Bifötter
Nektar|Saftglas|Biflygning
Frukt|Fröpaket|Trädgårdsskörd`,
  'Sagor och fantasifigurer': `
Troll|Broavgift|Skogssaga
Enhörning|Regnbågsfärg|Partyhatt
Vampyr|Spegelproblem|Vitlöksrädsla
Spöke|Lakan|Hemsökt hus
Häxa|Sopborste|Kittel
Sjöjungfru|Simfena|Sjömanssaga
Jätte|Skyskrapa|Stora portioner
Tomte|Grötfat|Julstrumpa
Fe|Önskning|Trollstav
Älva|Dimäng|Vingar
Riddare|Plåtrustning|Hästhovar
Prinsessa|Ärta|Kungakrona
Pirat|Ögonlapp|Skattkarta
Zombie|Stapplande steg|Skräckfilm
Varulv|Fullmåne|Förvandling
Mumie|Bandage|Pyramid
Dvärg|Snövit|Gruvarbete
Kung|Schackbräde|Tron
Drottning|Bikupa|Schackbräde
Magiker|Kortlek|Försvinnande kanin`
};

export const words = Object.entries(groups).flatMap(([category, rows]) =>
  rows.trim().split('\n').map(row => {
    const [word, ...hints] = row.split('|');
    return { word, hints, category };
  })
);
