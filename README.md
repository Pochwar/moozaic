# Moosaik

Moosaik is a project about creating mosaics with images get from Twitter.

## Requirements

- Git
- NodeJs & NPM
- Metapixel
- MongoDB
- Twitter account

## How it works

### GIFTUH
GIFTUH is a script I made to get images from tweets using a specific keyword. A basic standalone version is available [here](https://github.com/Pochwar/giftuh). I adapt the original code for this program.

### Metapixel

Metapixel is a bash program made by Mark Probst that is used to generate mosaics from an original file using all the images recovered with GIFTUH. More informations [here](https://github.com/schani/metapixel)

⚠ Metapixel does not work well on Ubuntu 18, use preferably Ubuntu 16 ⚠ 

### Moosaik

Moosaik works by 'projects' you can create and that will be stored in the database. Each project is defined by a name, a summary, an original picture and a keyword.

Using GIFTUH and Metapixel, Moosaik will run and generate a mosaic for the most recent project in DB.

## Installation

- clone repository `git@github.com:Pochwar/moosaik.git`
- install dependencies `npm i`
- create '.env' file from '.env.example' `cp .env.example .env`
- set configuration in '.env' file (App password for creating projects, Mongo credentials, Twitter credentials, and some other options)

## Usage

### Create the first project

- Set 'RUN_GIFTUH' and 'RUN_METAPIXEL' to '0' in '.env' file and then run `npm start` to launch the server.
- Go to 'http://localhost:2440/create' to create yout first project

### Use Moosaik

- Once the first project has been created, you can set 'RUN_GIFTUH' and 'RUN_METAPIXEL' to '1' in '.env' file and then run `npm start` to launch the server.
- Then go to 'http://localhost:2440' to view the result

Info : Metapixel won't trigger before there are at least 50 images recovered from twitter.


## Heroku Deployment

I deploy this app on Heroku (https://moosaik.herokuapp.com).

To achieve this, I had to make some specific actions:

- Add "Apt" buildpack to install Metapixel: `heroku buildpacks:add --index 1 heroku-community/apt -a {your-app-name}`. Then, Metapixel will be automatically installed as it's referenced in the 'Aptfile'

- Metapixel have some issues on Ubuntu 18, so it's preferable to set Heroku stack on Ubuntu 16: `heroku stack:set ubuntu-16 -a {your-app-name}`

Heroku logs are available with this command: `heroku logs --tail -a {your-app-name}`