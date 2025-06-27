FROM node:20-alpine

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# 수정 (/app -> /FE)
WORKDIR /FE
COPY ./package*.json .
RUN npm install

COPY . .
RUN NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL npm run build
# RUN npm run build
CMD ["npm", "run", "start"]