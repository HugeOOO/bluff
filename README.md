# Bluff

En lokal PWA-grund för ett svenskt Word Imposter-spel. En runda går genom spelordning, regler, privata rollkort, spelstart och resultat.

## Starta appen

Kör från projektmappen:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Öppna <http://localhost:8765/>. Webbversionen har inga externa paket. Android-paketeringen använder Capacitor.

- Lägg till spelare, välj regler och dela ut korten. Håll på kortet (eller håll ned mellanslag eller Enter med knappen fokuserad), släpp och gå vidare till nästa spelare.
- Använd **Installera appen** när knappen visas eller webbläsarens installationsmeny om den finns. På iPhone öppnar du en HTTPS-version i Safari och använder **Dela → Lägg till på hemskärmen**.
- Offlineläget förbereds automatiskt vid första besöket. Ladda om sidan efter första besöket, stoppa sedan servern med Ctrl+C och ladda om igen för att prova offlineläget.

För att prova PWA-funktioner på en annan enhet, servera innehållet i `dist/` över HTTPS. Webbläsaren kräver en säker webbkontext för service workers, med undantag för lokala adresser som `localhost`.

## Bygg vidare

Appens HTML, CSS och JavaScript finns i `dist/` och serveras direkt därifrån. När du ändrar cachade filer, höj versionsnumret i `dist/sw.js`. Stäng alla öppna Bluff-fönster och öppna appen igen för att låta den nya versionen ta över.

## Android / APK

Android-projektet ligger i `android/`. App-id är `se.hugeooo.bluff`. Alla filer i `dist/` följer med i APK:n, så ingen webbserver behövs och spelet fungerar offline direkt. Webbversionen fortsätter fungera som PWA.

Knappar och val ger kort haptisk återkoppling via Capacitors Haptics-plugin. Slidern tickar när värdet ändras, även under momentum, och spelarnas draghandtag ger återkoppling vid grepp, byte av plats och släpp på en ny plats. Webbversionen använder `navigator.vibrate` där webbläsaren stöder det. Den fysiska känslan behöver provas på en telefon med vibrationsmotor.

### Första installationen på CachyOS / Arch

```sh
sudo pacman -S --needed jdk21-openjdk android-tools
yay -S android-studio
```

Öppna Android Studio och slutför dess installation. I **SDK Manager** installerar du **Android SDK Platform 36**, **Android SDK Build-Tools**, **Android SDK Platform-Tools** och **Android SDK Command-line Tools (latest)**. Läs och acceptera SDK-licenserna i installationsguiden. SDK:n kan ligga på standardplatsen `~/Android/Sdk`; annars anger du dess plats med `ANDROID_HOME`.

### Bygg en installerbar test-APK

Från projektmappen:

```sh
npm ci
npm run android:apk
```

Byggskriptet hittar Java 21 och SDK:n, synkar webbappen och kör `assembleDebug`. Det kan behöva hämta Gradle och Android-bibliotek första gången. Den färdiga filen blir **`artifacts/bluff-debug.apk`**. Efter ändringar i webbappen räcker det att köra `npm run android:apk` igen.

Vill du använda Android Studio kör du `npm run android:open` efter att ha synkat med `npm run android:sync`.

### Installera på telefonen via USB

Aktivera utvecklaralternativ och USB-felsökning i telefonen, anslut med USB och godkänn datorn på telefonen. Kör sedan:

```sh
adb devices
adb install -r artifacts/bluff-debug.apk
```

APK:n är en debug-version för test och delning, inte en färdig Google Play-release. För publicering behövs en egen signeringsnyckel och en signerad release/AAB. Nycklar, byggfiler och lokala SDK-sökvägar ignoreras av Git.

Kontroller som återstår på en riktig Android-enhet: namnredigering med tangentbordet öppet, håll/släpp på hemliga rollkort, dragning och momentum, systemets tillbaka-knapp, säkerhetsmarginaler och kallstart i flygplansläge.
