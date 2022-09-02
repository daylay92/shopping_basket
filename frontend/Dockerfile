FROM node:16.3.0-alpine
WORKDIR /app/frontend
ENV  REACT_APP_API_URL localhost:4500
COPY  ./package*.json /app/frontend/
RUN npm install
COPY ./ /app/frontend/
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=0 /app/frontend/build/ /usr/share/nginx/html
COPY --from=0 /app/frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx","-g","daemon off;"]