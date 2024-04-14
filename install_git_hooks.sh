#!/bin/bash
set -e
for FILE in git_hooks/*; do
    if [ -f "$FILE" ]; then
      FILENAME=$(basename "$FILE")

      cp "$FILE" .git/hooks/
      chmod +x .git/hooks/"$FILENAME"
    fi
done
