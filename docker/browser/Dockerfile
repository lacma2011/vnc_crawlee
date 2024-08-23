FROM dorowu/ubuntu-desktop-lxde-vnc

# Install dependencies and add the Google public key
# RUN apt-get update && \
#     apt-get install -y wget gnupg2 ca-certificates && \
#     wget -qO - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google.gpg && \
#     echo "deb [signed-by=/usr/share/keyrings/google.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list
RUN curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
RUN rm google-chrome-stable_current_amd64.deb 

# Install Chromium browser
RUN apt-get update && \
    apt-get install -y chromium-browser

# Expose VNC and HTTP ports
EXPOSE 5900
EXPOSE 6080
