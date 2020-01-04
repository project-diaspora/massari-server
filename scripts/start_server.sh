#!/bin/bash
# ------------------------------------------------------------------
# [Author] Joseph Haddad
#          Start the node server
# ------------------------------------------------------------------
sudo npm install pm2 --global
pm2 stop all
DISCORD_WEBHOOK_URL=$DISCORD_WEBHOOK_URL pm2 start /var/www/html/massari-server/src/index.js
