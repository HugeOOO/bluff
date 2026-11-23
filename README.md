# Bluff

En lokal PWA-grund för ett svenskt Word Imposter-spel. En runda går genom spelordning, regler, privata rollkort, spelstart och resultat.

## Starta appen

Kör från projektmappen:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Öppna <http://localhost:8765/>. Projektet har inga externa paket.

- Lägg till spelare, välj regler och dela ut korten. Håll på kortet (eller håll ned mellanslag eller Enter med knappen fokuserad), släpp och gå vidare till nästa spelare.
- Använd **Installera appen** när knappen visas eller webbläsarens installationsmeny om den finns. På iPhone öppnar du en HTTPS-version i Safari och använder **Dela → Lägg till på hemskärmen**.
- Vänta tills sidan visar **Redo att användas offline**. Stoppa sedan servern med Ctrl+C och ladda om appen för att prova offlineläget.

För att prova PWA-funktioner på en annan enhet, servera innehållet i `dist/` över HTTPS. Webbläsaren kräver en säker webbkontext för service workers, med undantag för lokala adresser som `localhost`.

## Bygg vidare

Appens HTML, CSS och JavaScript finns i `dist/` och serveras direkt därifrån. När du ändrar cachade filer, höj versionsnumret i `dist/sw.js`. Stäng alla öppna Bluff-fönster och öppna appen igen för att låta den nya versionen ta över.
