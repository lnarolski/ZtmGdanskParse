# ztmGdanskDepartureBoardParser
Skrypt tworzący w znaczniku HTML DIV tabelę z aktualnymi komunikatami i estymowanymi czasami odjazdu pojazdów dla wybranego *stopId*.<br/>

**Do działania wymagana jest biblioteka jQuery (testowano na wersji v3.5.1), która musi zostać załadowana przed użyciem skryptu ztmGdanskDepartureBoardParser.js**
<br/>

![Screenshot](https://raw.githubusercontent.com/lnarolski/ztmGdanskDepartureBoardParser/main/screenshots/screenshot1.png)
<br/>

# Działanie
Skrypt parsuje dane udostępniane w formacie JSON w ramach "Otwartych danych ZTM w Gdańsku" na platformie CKAN.
<br/>
W wywołaniu funkcji należy podać 4 parametry:
```javascript
setDepartureBoard: function (divTableId, stopId, stopName, displayCode)
```
gdzie:<br/>
*divTableId* - Id znacznika DIV, w którym ma zostać umieszczona wygenerowana tabela<br/>
*stopId* - Id przystanku, dla którego mają być pobierane estymowane czasu przyjazdu (do sprawdzenia [tutaj](http://ckan.multimediagdansk.pl/dataset/tristar/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b))<br/>
*stopName* - nazwa przystanku w postaci ciągu znaków wyświetlanego w nagłówku tabeli<br/>
*displayCode* - displayCode tablicy, dla której mają być pobierane komunikaty (do sprawdzenia [tutaj](https://ckan.multimediagdansk.pl/dataset/tristar/resource/ee910ad8-8ffa-4e24-8ef9-d5a335b07ccb))<br/>

np. dla przystanku "Dworzec Główny" i znacznika DIV o ID *tableDeparturesBoard* wywołanie może wyglądać w następującej postaci:
```javascript
ztmGdanskDepartureBoardParser.setDepartureBoard("tableDeparturesBoard", 1013, "Dworzec Główny", 18);
```

Skrypt nadaje odpowiednim fragmentom tabeli parametry *Id* i *Class* dzięki czemu możliwe jest dostosowanie wyglądu do własnych potrzeb, np. za pomocą kaskadowych arkuszy stylów.

# Przykład
Do skryptu został dołączony przykład (widoczny na zrzucie ekranu), który generuje tabelę dla poniższych wartości parametrów:<br/>
*divTableId* - **"tableDeparturesBoard"**<br/>
*stopId* - **1013**<br/>
*stopName* - **"Dworzec Główny"**<br/>
*displayCode* - **18**<br/>

# Otwarte dane ZTM w Gdańsku
Więcej informacji na temat "Otwartych danych ZTM w Gdańsku" można znaleźć [tutaj](https://ckan.multimediagdansk.pl/dataset/tristar).
