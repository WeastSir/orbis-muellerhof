#!/bin/bash
# Doppelklick auf diese Datei → Webseite wird automatisch zu GitHub gepusht
# Erstellt für Orbis Müllerhof

cd "$(dirname "$0")"

echo ""
echo "================================================"
echo "  ORBIS MÜLLERHOF — Webseite hochladen"
echo "================================================"
echo ""

# Schritt 0: Stale Lock-Files aufräumen (falls vorhanden)
if [ -f ".git/index.lock" ]; then
  echo "🧹 Entferne altes Lock-File..."
  rm -f .git/index.lock
fi

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

COMMIT_OUTPUT=$(git commit -m "Update vom $TIMESTAMP" 2>&1)
COMMIT_STATUS=$?

if [ $COMMIT_STATUS -ne 0 ]; then
  echo "❌ Commit gescheitert:"
  echo "$COMMIT_OUTPUT"
  echo ""
  echo "(Schliesse dieses Fenster mit Cmd+W, dann nochmal probieren)"
  exit 1
fi

echo "$COMMIT_OUTPUT"
echo ""
echo "📤 Lade hoch zu GitHub..."
echo ""
git push 2>&1
PUSH_STATUS=$?

# Ergebnis
if [ $PUSH_STATUS -eq 0 ]; then
  echo ""
  echo "================================================"
  echo "  ✅ FERTIG! Webseite ist in ~1 Min aktualisiert."
  echo "  → https://weastsir.github.io/orbis-muellerhof/"
  echo "================================================"
  echo ""
else
  echo ""
  echo "================================================"
  echo "  ❌ Push gescheitert. Screenshot machen + senden."
  echo "================================================"
  echo ""
fi

echo "(Schliesse dieses Fenster mit Cmd+W)"
