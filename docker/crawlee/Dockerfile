FROM dorowu/ubuntu-desktop-lxde-vnc

# Install dependencies for Puppeteer and X11
RUN apt-get update && \
    apt-get install -y wget gnupg2 \
    libnss3 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libatk1.0-0 \
    libatk-bridge2.0-0 libxrandr2 libgbm1 libasound2 libpangocairo-1.0-0 libpango-1.0-0 \
    libcups2 libxss1 libgtk-3-0 libdrm2 libdbus-1-3 libxcb-dri3-0 xdg-utils

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Node.js and npm
RUN apt-get install -y nodejs npm

# Install Crawlee or your script dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy the Crawlee script
COPY . .

# Start the VNC server and then run Crawlee
CMD ["sh", "-c", "/usr/bin/vncserver :1 -geometry 1280x800 -depth 24 && node script.js"]
