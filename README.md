# Orbis Müllerhof — Webseite

> **Ein Ort. Viele Momente.**
> Webseite für die Projektarbeit SHL BWS — Betriebskonzept Orbis Müllerhof, Frick.

---

## Projekt-Übersicht

Eine mehrsprachige (DE/EN) statische Webseite für den Orbis Müllerhof mit:
- 4 Hauptbereichen: Hotel, Restaurant, Kantine, Seminare
- Bankett-Seite, Galerie, Stellen, Kontakt
- **Orbis-Karte** (Treueprogramm) mit Bestellformular
- **Full Circle / Small Circle** Seminar-Pakete + **Co-Working** Angebot
- Buchungsformulare für Zimmer, Tisch, Seminar
- **Versteckte Dokumenten-Seiten** mit QR-Code-Zugriff (für deine Projektarbeit)

---

## Ordnerstruktur

```
orbis-muellerhof/
├── index.html              Startseite mit Slogan + alle Bereiche
├── hotel.html              Hotel mit Buchungsformular
├── restaurant.html         Restaurant + Tischreservation
├── kantine.html            Kantine + Wochenmenü
├── seminare.html           Full/Small Circle + Co-Working
├── bankett.html            Bankett & Feste
├── orbis-karte.html        Treueprogramm + Bestellformular
├── galerie.html            Bildergalerie mit Lightbox
├── stellen.html            Offene Stellen
├── kontakt.html            Kontaktformular + Karte
├── impressum.html
├── datenschutz.html
├── robots.txt              Versteckt /dokumente/ vor Google
│
├── css/style.css           ← Farben, Design (Farben anpassen ganz oben)
├── js/
│   ├── translations.js     ← Texte DE/EN (hier bearbeiten)
│   └── main.js             ← Sprachumschalter, Lightbox, Forms
│
├── images/                 ← Bilder hier ablegen (JPG)
│   ├── logo.png            Dein Orbis-Logo
│   ├── hero-aussen.jpg     Aussenansicht
│   ├── zimmer-1.jpg        Hotelzimmer
│   └── ... (siehe Liste unten)
│
├── content/                ← Inhalte zum einfachen Austauschen
│   ├── menus/              Speisekarten (PDF)
│   ├── jobs/               Stelleninserate (PDF)
│   ├── pdf/                Bankett, Projektarbeit
│   └── video/              TikTok-Video
│
└── dokumente/              🔒 VERSTECKTE SEITEN (nur per QR-Code)
    ├── projektarbeit.html  Zeigt deine Projektarbeit (PDF)
    ├── tiktok-rekrutierung.html  Spielt das TikTok-Video ab
    ├── orbis-karte-digital.html  Demo der digitalen Karte
    └── qr-codes.html       ⭐ QR-CODE GENERATOR (Admin-Tool!)
```

---

## ⭐ Wichtig: Das QR-Code-System

Im Ordner `dokumente/` liegen Seiten, die **nicht im Menü verlinkt** sind. Sie sind nur über die direkte URL aufrufbar — perfekt für QR-Codes in deiner gedruckten Arbeit.

### So funktioniert es:

1. **PDF/Video hochladen** in `content/pdf/projektarbeit.pdf` und `content/video/tiktok-rekrutierung.mp4`
2. Alles auf GitHub hochladen und **GitHub Pages aktivieren**
3. **`dokumente/qr-codes.html` öffnen** — das ist dein Admin-Tool
4. Deine GitHub Pages URL eintragen (z.B. `https://maxmuster.github.io/orbis-muellerhof`)
5. Alle QR-Codes werden automatisch generiert
6. QR-Codes als PNG herunterladen oder direkt drucken
7. In deine schriftliche Arbeit einkleben

Neue versteckte Seite hinzufügen? Einfach in `dokumente/qr-codes.html` im `QR_PAGES`-Array eintragen — der QR-Code wird automatisch generiert.

---

## 📤 Auf GitHub Pages hosten (gratis!)

1. Auf [github.com](https://github.com) ein neues Repository erstellen, z.B. `orbis-muellerhof`
2. Alle Dateien aus diesem Ordner hochladen
3. Im Repo: **Settings → Pages → Source: main branch / root → Save**
4. Nach ca. 1 Minute ist deine Seite live unter:
   `https://DEIN_USERNAME.github.io/orbis-muellerhof/`

---

## ✏️ Inhalte bearbeiten

### Texte ändern (DE + EN)
→ Datei `js/translations.js` öffnen, Text bearbeiten, speichern. Fertig.

### Farben ändern
→ Datei `css/style.css`, ganz oben im `:root`-Block die Farb-Variablen anpassen.

### Bilder austauschen
→ Eigenes Foto im Ordner `images/` ablegen, mit **gleichem Dateinamen** überschreiben.

### Speisekarte oder Menü updaten
→ Neue PDF in `content/menus/` ablegen (z.B. `speisekarte.pdf` überschreiben).

### Stelleninserat hinzufügen
1. PDF in `content/jobs/` ablegen
2. In `stellen.html` einen neuen `<li class="job-item">`-Block kopieren und anpassen

---

## 🖼️ Liste der Bilder die du brauchst

Lege im Ordner `images/` Fotos mit folgenden Namen ab (JPG, ca. 1200×800 px):

| Dateiname | Wofür |
|-----------|-------|
| `logo.png` | Dein Orbis-Logo (transparent, ~400×200) |
| `hero-aussen.jpg` | Aussenansicht (Startseite Hero) |
| `zimmer-1.jpg` | Hotelzimmer (Doppelzimmer) |
| `zimmer-2.jpg` | Hotelzimmer (Einzelzimmer) |
| `restaurant-saal.jpg` | Restaurantsaal |
| `cafe.jpg` | Café-Bereich |
| `kantine.jpg` | Kantine |
| `garten.jpg` | Garten |
| `lounge.jpg` | Lounge / Suite |
| `seminarraum.jpg` | Seminarraum (Hauptbild) |
| `seminarraum-2.jpg` | Zweiter Seminarraum |
| `seminarraum-3.jpg` | Dritter Seminarraum |
| `bankettsaal.jpg` | Bankettsaal |

> Derzeit sind Platzhalter eingebaut. Sobald du echte Fotos ablegst, werden sie automatisch verwendet.

---

## 🔧 Technische Details

- **Pure HTML/CSS/JS** — kein Framework nötig, läuft überall
- **Mehrsprachig** über `data-i18n` Attribute und `js/translations.js`
- **Responsive** — funktioniert auf Handy, Tablet, Desktop
- **QR-Codes** werden über die kostenlose API `api.qrserver.com` generiert
- **Schriften** von Google Fonts (Cormorant Garamond + Inter)

---

## 🆘 Hilfe

Falls etwas nicht funktioniert oder du was anpassen willst, frag einfach!
