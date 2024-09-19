FROM quay.io/lyfe00011/md:beta
RUN git clone https://github.com/Bahanack-GY/Mike-whatsapp-bot.git
WORKDIR /root/LyFE/
RUN yarn install
CMD ["npm", "start"]