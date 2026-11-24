// Each hint takes an indirect but explainable route to the word.
// Format: secret word | hint | alternative hint. Categories remain broad.
const groups = {
  'Mat': `
Popcorn|Förtexter|Ljudnivå
Pizza|Kartong|Geometri
Pasta|Studentbudget|Vattenräkning
Sushi|Precision|Stilla havet
Tacos|Fredagssoffa|Byggsats
Hamburgare|Drive-through|Våningshus
Pannkaka|Akrobatik|Torsdag
Våffla|Hjärter|Vårdagjämning
Omelett|Resthantering|Hotellmorgon
Lasagne|Bygglager|Garfield
Risotto|Tålamod|Norra Italien
Falafel|Kikärtsfält|Nattbuss
Köttbullar|Möbelvaruhus|Mormor
Korv|Halvtid|Termos
Soppa|Termos|Sörplande
Gröt|Tomte|Tapetklister
Sallad|Växthus|Lunchlåda
Smörgås|Picknick|Två våningar
Pommes frites|Belgien|Fingertoppar
Dumpling|Veck|Ångmoln`,
  'Råvaror': `
Potatis|Källare|Brännvin
Morot|Mörkerseende|Snögubbe
Lök|Simmarglasögon|Tårkanal
Vitlök|Folktro|Andedräkt
Tomat|Ketchupfläck|Växthus
Gurka|Ögonlock|Vattenhalt
Paprika|Trafikljus|Pulver
Broccoli|Miniatyrskog|Skolbespisning
Spenat|Seriefigur|Järnrykte
Svamp|Höstpromenad|Mycel
Avokado|Handskada|Brunch
Citron|Batteriexperiment|Grimas
Apelsin|Halvtidsvila|Juldoft
Banan|Slapstick|Kalium
Äpple|Gravitation|Skoldator
Päron|Glödlampa|Familjeslang
Jordgubbe|Midsommar|Självplock
Blåbär|Vasalopp|Tungfärg
Hallon|Fingerborg|Busksnår
Kokosnöt|Öde ö|Fallhjälm`,
  'Smaker och sötsaker': `
Choklad|Belöning|Handfläck
Glass|Hjärnfrys|Sommarlön
Lakrits|Tandfärg|Finland
Marsipan|Figurverkstad|Bröllop
Karamell|Tandläkarräkning|Termometer
Kanelbulle|Fastighetsvisning|Snäckskal
Semla|Februari|Mustasch
Pepparkaka|Arkitektur|Snällhetsrykte
Kladdkaka|Misslyckad gräddning|Diskberg
Maräng|Moln|Äggvisp
Sockervadd|Tivoli|Isolering
Honung|Pollinering|Bärnstensfärg
Sylt|Källarhylla|Pannkakstorsdag
Marmelad|Brittisk morgon|Glasburk
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
Smoothie|Motorljud|Träningsväska
Varm choklad|Skidstuga|Gräddmustasch
Mineralvatten|Rapning|Berggrund
Lemonad|Gatustånd|Sommarhetta
Espresso|Fingerborg|Sömnbrist
Cappuccino|Mjölkmustasch|Latinkvarter
Matcha|Bamburedskap|Japansk ceremoni
Chai|Kryddhylla|Monsun
Kombucha|Bakteriekultur|Glasflaska
Cider|Fruktträdgård|Jäsning
Öl|Humleodling|Skumgräns
Vin|Källarvalv|Årgång
Champagne|Prispall|Tryckvåg
Milkshake|Femtiotal|Tjockt sugrör`,
  'Djur': `
Katt|Internetfilm|Kartong
Hund|Dörrklocka|Bajspåse
Häst|Förmögenhet|Skoputs
Ko|Metan|Frukostbord
Gris|Tryffeljakt|Sparande
Får|Sömnlöshet|Stickning
Get|Klippvägg|Ostbricka
Höna|Väckarklockans granne|Frukostprotein
Anka|Badrum|Brödsmulor
Gås|Gammal penna|Romarriket
Uggla|Examen|Nattpass
Örn|Riksvapen|Termik
Kråka|Problemlösning|Soptunna
Papegoja|Piratskepp|Eko
Pingvin|Frack|Sydpolsexpedition
Flamingo|Balansövning|Räkcocktail
Påfågel|Fåfänga|Ögonmönster
Struts|Fjäderboa|Sprint
Svan|Balett|Kunglig park
Kolibri|Helikopter|Sockervatten`,
  'Vilda djur': `
Elefant|Minnesmästare|Elfenben
Giraff|Höjdrädsla|Akacia
Zebra|Övergångsställe|Streckkod
Lejon|Filmstudio|Kungakrona
Tiger|Golfnamn|Kamouflage
Leopard|Modeplagg|Trädgren
Björn|Börsfall|Ide
Varg|Rödluvan|Fullmåne
Räv|List|Hönshus
Älg|Trafikskylt|Jaktlag
Ren|Julafton|Lav
Hare|Påsk|Spårsnö
Ekorre|Vinterförråd|Elledning
Igelkott|Robotgräsklippare|Lövhög
Fladdermus|Ekolod|Vindsvåning
Delfin|Ekolod|Livboj
Val|Plankton|Fontän
Haj|Skräckmusik|Tandbyte
Bläckfisk|Arbetsintervju|Bläckpatron
Manet|Ättika|Badförbud`,
  'Smådjur': `
Fjäril|Förvandling|Kaosteori
Bi|Fruktodling|Vaxljus
Geting|Sensommar|Picknickpanik
Myra|Logistik|Barrhög
Spindel|Skräckfilm|Vävstol
Mygga|Sömnstörning|Blodgivning
Fluga|Fönsterkarm|Soprum
Nyckelpiga|Prickig tur|Bladlöss
Trollslända|Helikopter|Dammkant
Gräshoppa|Fiolspel|Längdhopp
Humla|Vårtecken|Pälsjacka
Snigel|Ölfälla|Trädgårdsilska
Snäcka|Husbil|Spiraltrappa
Dagmask|Kompost|Mete
Fästing|Knäveck|Vaccination
Skalbagge|Pansarbil|Bilmodell
Kackerlacka|Nattkök|Hyresproblem
Skorpion|Stjärnhimmel|Ökenstövel
Tusenfoting|Skobudget|Fuktig källare
Loppa|Loppmarknad|Cirkusnummer`,
  'Natur': `
Sand|Fönster|Timglas
Berg|Kontinentaldrift|Syrebrist
Skog|Pappersbruk|Svampkorg
Sjö|Myggkväll|Skridskotur
Flod|Civilisation|Delta
Hav|Containrar|Saltstänk
Ö|Färjetidtabell|Robinson
Vulkan|Flygstopp|Bördig jord
Glaciär|Havsnivå|Urminne
Grotta|Eko|Pannlampa
Öken|Temperaturskillnad|Hägring
Strand|Metalldetektor|Badhandduk
Vattenfall|Turbiner|Ljudmatta
Träsk|Gummistövel|Myggnät
Äng|Pollen|Slåtter
Klippa|Klätterrep|Lunnefågel
Sten|Njursmärta|Slangbella
Lera|Drejskiva|Fotspår
Mossa|Norrsida|Juldekoration
Lava|Evakuering|Ny mark`,
  'Väder och rymd': `
Regn|Doft av asfalt|Inställd picknick
Snö|Ljuddämpning|Försenad buss
Hagel|Bilförsäkring|Golfboll
Dimma|Färjehorn|Siktproblem
Åska|Rädd hund|Överspänningsskydd
Blixt|Fotograf|Franklin
Regnbåge|Skattjakt|Prisma
Vind|Elräkning|Frisyrproblem
Storm|Nedfallen ledning|Färjestopp
Torka|Bevattningsförbud|Skördepris
Frost|Bilskrapa|Morgongräs
Dagg|Spindelnät|Våta skor
Moln|Serverhall|Bomull
Sol|D-vitamin|Elproduktion
Måne|Tidvatten|Sömngångare
Stjärna|Önskning|Hotellbetyg
Planet|Omloppsbana|Skolmodell
Komet|Dinosaurierädsla|Långt återbesök
Meteor|Önskning|Krater
Norrsken|Solstorm|Nattfotograf`,
  'Växter': `
Ros|Ursäkt|Alla hjärtans dag
Tulpan|Nederländerna|Finansbubbla
Solros|Matolja|Fröpåse
Kaktus|Semesterbevattning|Western
Orkidé|Fönsterbräda|Vanilj
Maskros|Önskning|Asfaltsspricka
Nässla|Hudutslag|Vårsoppa
Lavendel|Linneskåp|Provence
Bambu|Byggställning|Pandameny
Ek|Vinfat|Skeppsvarv
Björk|Bastu|Pollenprognos
Gran|Vardagsrumsbarr|Julgransfot
Tall|Möbelvirke|Kåda
Pil|Cricketträ|Flätad korg
Palm|Vykort|Kokosvatten
Lönn|Kanadas flagga|Sirap
Murgröna|Husfasad|Universitetsmur
Klöver|Lyckoamulett|Kortlek
Ljung|Höstkruka|Hedlandskap
Vass|Stråtak|Fågelgömsle`,
  'Hemmet': `
Soffa|Fjärrkontroll|Flyttbråk
Fåtölj|Läshörna|Pensionär
Säng|Väckarklocka|Drömtydning
Bord|Förhandling|Dukning
Stol|Hela havet stormar|Talarplats
Bokhylla|Bildningsfasad|Flyttkartong
Garderob|Narnia|Säsongsbyte
Spegel|Vampyr|Självbild
Matta|Flygande transport|Dammallergi
Gardin|Premiär|Insyn
Kudde|Nackspärr|Hotellval
Täcke|Temperaturbråk|Spöklik figur
Lampa|Serietidningsidé|Nattfjäril
Ljusstake|Decemberfönster|Stearinfläck
Vas|Försoning|Stilleben
Tavla|Auktionsklubba|Spikhål
Klocka|Snooze|Deadline
Dörr|Integritet|Tröskel
Fönster|Sand|Insyn
Trappa|Vardagsmotion|Flygeltransport`,
  'Kök och städning': `
Kylskåp|Magnetturist|Nattätande
Frys|Mammut|Storkok
Ugn|Brandvarnare|Jäsning
Mikrovågsugn|Kontorslunch|Exploderat ägg
Brödrost|Smulbricka|Morgonstress
Vattenkokare|Brittisk paus|Kalkavlagring
Diskmaskin|Relationsbråk|Vattenglas
Kastrull|Studentmössa|Induktion
Stekpanna|Slapstick|Brandvarnare
Durkslag|Rymdhjälm|Pastavatten
Visp|Luftbubblor|Träningsvärk
Rivjärn|Knograp|Parmesan
Skärbräda|Bakteriejakt|Knivmärken
Kavel|Pepparkakshus|Tecknat gräl
Mortel|Apotekssymbol|Krydddoft
Dammsugare|Kattskräck|Borttappat lego
Mopp|Halkskylt|Skurhink
Tvättmaskin|Försvunnen strumpa|Centrifugalkraft
Strykjärn|Hotellrum|Brännmärke
Sopborste|Häxa|Höstlöv`,
  'Kläder och tillbehör': `
Jacka|Garderobsavgift|Aprilväder
Kappa|Detektiv|Höstpromenad
Tröja|Julklappsbesvikelse|Statisk elektricitet
Skjorta|Anställningsintervju|Strykbräda
Byxor|Knälagning|Plånboksficka
Jeans|Guldgrävare|Indigo
Klänning|Nobelmiddag|Provrum
Kjol|Skotskt högland|Marilyn Monroe
Strumpa|Ensamt par|Torktumlare
Sko|Askungen|Skavsår
Stövel|Lerpöl|Katt i saga
Sandal|Turistfoto|Solbrända remmar
Hatt|Trollkonst|Diplomati
Mössa|Frisyrkollaps|Värmeläckage
Halsduk|Supporter|Kall vind
Vante|Snöbollskrig|Borttappad partner
Slips|Fars dag|Knutproblem
Bälte|Säkerhetskontroll|Svart examen
Glasögon|Imma|Näsavtryck
Ryggsäck|Skolstart|Skavsår`,
  'Verktyg och saker': `
Hammare|Tumme|Auktionssal
Skruvmejsel|Batterilucka|Platta möbler
Såg|Årsringar|Musiknummer
Borrmaskin|Grannkonflikt|Betongdamm
Tång|Tandläkare|Hummerklo
Yxa|Vedbod|Skogsskräck
Spade|Arkeologi|Skattkarta
Kratta|Höstträdgård|Slapstick
Stege|Svart katt|Äppelplockning
Måttband|Skräddare|Hemrenovering
Vattenpass|Bubbla|Tavelhängning
Ficklampa|Strömavbrott|Spökhistoria
Kompass|Magnetfält|Skattkarta
Paraply|Cocktailglas|Mary Poppins
Nyckel|Låssmed|Under dörrmattan
Hänglås|Kärleksbro|Gymväska
Sax|Invigning|Pappersfigur
Tejp|Julklappspanik|Brottsplats
Lim|Modellbygge|Kladdiga fingrar
Rep|Dragkamp|Sjömansknop`,
  'Transport': `
Cykel|Byxklämma|Tour de France
Bil|Köbildning|Besiktning
Buss|Dragspel|Månadskort
Tåg|Spårbyte|Förseningsersättning
Spårvagn|Göteborg|Ledningsnät
Tunnelbana|Gatumusik|Underjordisk konst
Flygplan|Tomatjuice|Säkerhetsbälte
Helikopter|Fröspridning|Räddningsaktion
Båt|Bottenfärg|Sjösjuka
Färja|Taxfree|Tidtabell
Ubåt|Periskop|Ekolod
Segelbåt|Vindprognos|Knopar
Kanot|Myggsjö|Tyst framfart
Kajak|Grönland|Sittbrunn
Motorcykel|Skinnställ|Insektsvisir
Moped|Femtonårsdag|Tvåtaktsdoft
Traktor|Skördetid|Landsvägskö
Lastbil|Rastplats|Logistik
Ambulans|Blåljus|Fri väg
Luftballong|Champagnefrukost|Vindriktning`,
  'Platser och byggnader': `
Bibliotek|Viskning|Förseningsavgift
Museum|Larmbåge|Dammet från förr
Biograf|Dejtkväll|Prasselilska
Teater|Viskande hjälp|Röda sammetsstolar
Sjukhus|Nattpass|Handdesinfektion
Apotek|Kölapp|Recept
Skola|Sommarlov|Korridorspring
Universitet|Studieskuld|Avhandling
Kyrka|Akustik|Risgryn
Slott|Arvstvist|Turistbuss
Fängelse|Randigt tyg|Besöksdag
Brandstation|Glidstång|Nattlarm
Fyr|Ensamhet|Sjöfart
Bro|Trollsaga|Tullavgift
Tunnel|Radioavbrott|Bergsprängning
Flygplats|Vätskepåse|Avsked
Tågstation|Stor klocka|Återförening
Hamnen|Måsar|Tullkontroll
Camping|Myggnät|Gemensam dusch
Hotell|Liten schampoflaska|Frukostbuffé`,
  'Sport och fritid': `
Fotboll|Offsidebråk|Orange halvtid
Tennis|Jordgubbar med grädde|Domarstol
Golf|Affärsmöte|Dresscode
Basket|Parkettgnissel|Lång person
Volleyboll|Sand i skorna|Nätkonflikt
Ishockey|Tandlucka|Utvisningsbås
Simning|Klorlukt|Russinfingrar
Löpning|Skoskav|Nummerlapp
Cykling|Rakade ben|Klungtaktik
Skidåkning|Vallabod|Blåbärssoppa
Snowboard|Liftkö|Sidledes
Skridskor|Varm choklad|Balansnummer
Klättring|Kritdamm|Förtroende
Boxning|Tandskydd|Ringklocka
Brottning|Blomkålsöra|Matta
Fäktning|Elkontakt|De tre musketörerna
Bowling|Låneskor|Ränna
Biljard|Grön duk|Geometri
Dart|Brittisk pub|Huvudräkning
Schack|Kalla kriget|Drottningoffer`,
  'Musik och kultur': `
Piano|Flyttfirma|Elfenben
Gitarr|Lägereld|Nagellängd
Trumma|Grannklagomål|Marsch
Fiol|Hästtagel|Orkesterdike
Flöjt|Ormtjusare|Andningskontroll
Trumpet|Militär revelj|Kindmuskler
Saxofon|Rökig källare|Nattklubb
Harpa|Änglavingar|Strängbrott
Dragspel|Skärgårdsdans|Bussmodell
Mikrofon|Rundgång|Talarskräck
Hörlurar|Trassel|Pendlingsbubbla
Högtalare|Grannfest|Membran
Skivspelare|Loppisfynd|Nålbyte
Radio|Sjörapport|Licenshistoria
Kamera|Rödögd|Mörkrum
Bok|Trädfiber|Vikta hörn
Tidning|Fiskpaket|Trycksvärta
Serietidning|Pratbubbla|Samlarskick
Pussel|Försvunnen bit|Regnsemester
Kortlek|Las Vegas|Trolleri`,
  'Teknik': `
Mobiltelefon|Risburk|Nackvärk
Dator|Fläktdamm|Kontorsrygg
Tangentbord|Smulor|Blindskrift
Datormus|Handledsvärk|Klickfarm
Skärm|Fyrkantiga ögon|Fingeravtryck
Skrivare|Pappersstopp|Dyr vätska
Router|Blinkande nattljus|Omstart
Laddare|Lånad för alltid|Hotellglömska
Batteri|Citronexperiment|Vinterproblem
Solcell|Takläggare|Molnprognos
Glödlampa|Idé i serietidning|Varmt glas
Robot|Industrigolv|Framtidsoro
Drönare|Flygförbud|Bröllopsfilm
Satellit|Väderkarta|Fotbollssändning
Teleskop|Balkongnatt|Galileo
Mikroskop|Lökhinna|Laborationsrock
Termometer|Sjukfrånvaro|Kvicksilver
Miniräknare|Matteprov|Solcell
USB-minne|Nyckelknippa|Glömd presentation
Hårddisk|Familjealbum|Magnetism`,
  'Vardag och upplevelser': `
Semester|Autosvar|Packningslista
Födelsedag|Ålderskris|Utandning
Bröllop|Risregn|Sittordning
Begravning|Svart slips|Arv
Jul|Barr i strumpan|Övertid på posten
Påsk|Fjäderkvist|Äggkartong
Midsommar|Myggbett|Blomsterkrans
Nyår|Hundoro|Brutna löften
Halloween|Tandläkare|Ringklocka
Karneval|Konfetti|Venedig
Picknick|Myrbesök|Rutig filt
Utflykt|Sittunderlag|Termos
Fiske|Tålamod|Gummistövel
Trädgård|Knävärk|Jord under naglarna
Bastu|Björkris|Finsk vana
Massage|Träningsvärk|Lugn musik
Dröm|Dagbok|Ologisk handling
Kö|Nummerlapp|Svensk disciplin
Hemlighet|Viskning|Lillfinger
Överraskning|Släckt rum|Hjärtklappning`
};

export const words = Object.entries(groups).flatMap(([category, rows]) =>
  rows.trim().split('\n').map(row => {
    const [word, ...hints] = row.split('|');
    return { word, hints, category };
  })
);
