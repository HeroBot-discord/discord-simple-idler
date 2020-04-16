FROM node as tsbuild

WORKDIR /build
RUN apt-get update && apt-get install python g++ make
COPY . .
RUN yarn global add typescript && yarn && yarn build

FROM node
ENV NODE_ENV=ptb
COPY --from=tsbuild /build/dist .
COPY --from=tsbuild /build/node_modules ./node_modules

ENTRYPOINT ["node"]