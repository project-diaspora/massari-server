#!/bin/bash
# ------------------------------------------------------------------
# [Author] Joseph Haddad
#          Start the node server
# ------------------------------------------------------------------
cd /usr/src/massari-server && sudo npm install forever --global
forever start -c "npm start" ./
