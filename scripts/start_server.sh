#!/bin/bash
# ------------------------------------------------------------------
# [Author] Joseph Haddad
#          Start the node server
# ------------------------------------------------------------------
cd /var/www/html/massari-server && sudo npm install forever --global
forever stopall
DISCORD_WEBHOOK_URL=$DISCORD_WEBHOOK_URL forever start src/index.js
