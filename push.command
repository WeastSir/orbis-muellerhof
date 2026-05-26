#!/bin/bash
# Doppelklick auf diese Datei → Webseite wird automatisch zu GitHub gepusht
# Erstellt für Orbis Müllerhof

cd "$(dirname "$0")"

echo ""
echo "================================================"
echo "  ORBIS MÜLLERHOF — Webseite hochladen"
echo "================================================"
echo ""

# Prüfen ob es Änderungen gibt
if [[ -z $(git status --porcelain) ]]; then
  echo "✓ Keine Änderungen vorhanden — alles ist aktuell."
  echo ""
  echo "(Schliesse dieses Fenster mit Cmd+W)"
  exit 0
fi

# Status anzeigen
echo "📝 Folgende Dateien werden hochgeladen:"
echo ""
git status --short
echo ""

# Commit + Push
TIMESTAMP=$(date +"%d.%m.%Y %H:%M")
git add . 2>&1
git commit -m "Update vom $TIMESTAMP" 2>&1
echo ""
echo "📤 Lade hoch zu GitHub..."
echo ""
git push 2>&1

# Ergebnis
if [ $? -eq 0 ]; then
  echo ""
  echo "================================================"
  echo "  ✅ FERTIG! Webseite ist in ~1 Min aktualisiert."
  echo "  → https://weastsir.github.io/orbis-muellerhof/"
  echo "================================================"
  echo ""
else
  echo ""
  echo "================================================"
  echo "  ❌ Etwas ging schief. Screenshot machen + senden."
  echo "================================================"
  echo ""
fi

echo "(Schliesse dieses Fenster mit Cmd+W)"
