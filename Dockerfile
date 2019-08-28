#Download base image ubuntu 16.04
FROM ubuntu:16.04

# Install Node and NPM
RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y build-essential
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs

# Install Metapixel
RUN apt-get install metapixel -y

WORKDIR /app
VOLUME /app

# keep container running
CMD tail -f /dev/null