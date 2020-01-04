#!/bin/bash
# ------------------------------------------------------------------
# [Author] Joseph Haddad
#          Start the node server
# ------------------------------------------------------------------
cd /usr/src/massari-server && sudo npm install forever --global
DISCORD_WEBHOOK_URL=$DISCORD_WEBHOOK_URL forever start src/index.js
