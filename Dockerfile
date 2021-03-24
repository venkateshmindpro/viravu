FROM node:12
RUN mkdir -p /app
WORKDIR /app
RUN useradd app
COPY app/ .
RUN npm install
RUN chown -R app:app /app
USER app
EXPOSE 7000
CMD [ "npm", "start" ]