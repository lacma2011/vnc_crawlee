FROM dorowu/ubuntu-desktop-lxde-vnc

# Install dependencies for Puppeteer and X11

RUN curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
RUN rm google-chrome-stable_current_amd64.deb 

#wget gnupg2 \
RUN apt-get update && \
    apt-get install -y \
    libnss3 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libatk1.0-0 \
    libatk-bridge2.0-0 libxrandr2 libgbm1 libasound2 libpangocairo-1.0-0 libpango-1.0-0 \
    libcups2 libxss1 libgtk-3-0 libdrm2 libdbus-1-3 libxcb-dri3-0 xdg-utils

# Install Node.js and npm
RUN apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# # Install Playwright dependencies
# RUN apt-get install -y \
#     wget gnupg2 \
#     && wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - \
#     && apt-get update && \
#     apt-get install -y \
#     nodejs \
#     npm \
#     && npm install -g playwright

# Install Playwright and its dependencies
RUN npx playwright install && \
    npx playwright install-deps

# Install Crawlee or your script dependencies
WORKDIR /app
COPY ../../src/package*.json ./
RUN npm install

