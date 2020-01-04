#!/bin/bash
# ------------------------------------------------------------------
# [Author] Joseph Haddad
#          Start the node server
# ------------------------------------------------------------------
forever stopall
cd /var/www/html/massari-server/src
DISCORD_WEBHOOK_URL=$DISCORD_WEBHOOK_URL forever start index.js
