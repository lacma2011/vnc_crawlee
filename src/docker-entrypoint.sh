#!/bin/bash

# Start the VNC server
sh -c "/usr/bin/vncserver :1 -geometry 1280x800 -depth 24"
#/usr/bin/vncserver :1 -geometry 1280x800 -depth 24

# Run the Crawlee script
node ./src/script.js

# Keep the container running
tail -f /dev/null
