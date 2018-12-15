# Moosaik

More infos coming soon!

## Heroku Deployment

Add "Apt" buildpack to install Metapixel: `heroku buildpacks:add --index 1 heroku-community/apt -a {your-app-name}`

Metapixel have some issues on Ubuntu 18, so it's preferable to set Heroku stack on Ubuntu 16: `heroku stack:set ubuntu-16 -a {your-app-name}`

Logs are available with this command: `heroku logs --tail -a {your-app-name}`