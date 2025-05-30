# vim-adventure

> 本篇章为原版README
>
> this page is original README

![create-release](https://github.com/09wattry/vim-adventures/workflows/create-release/badge.svg)
![create-release](https://github.com/09wattry/vim-adventures/workflows/publish-binaries/badge.svg)

# Vim Adventures

A reverse engineered Node.js version of the Vim Adventures game.

This is not my property and is not to be used for commercial purposes this is just an experiment into how to better design commercial online games to protect creator IP.

This is a great game and if you do use it, please head to the [vim adventures](https://vim-adventures.com) page and pay the creator if you enjoy the game.

## Contents

1. [Install Vim Adventures](#install)
   * [NodeJS](#node)
   * [Docker](#docker)
2. [Options](#options)
   * [Environment variables](#environment)
3. [Running Vim Adventures](#run)

## <span id="install">Install Vim Adventures</span>

To run using NodeJS locally or install game you need to have NodeJS version 12 or higher installed. Behavior with older versions of NodeJS cannot be guaranteed.

To use [Docker](https://docs.docker.com/get-docker/) you'll need to have it installed.

## Usage

There are several ways to run Vim Adventures locally. To make it easier for users we have included [pkg](https://github.com/zeit/pkg) to allow them to create an executable without trying to use NodeJS. This project can also be run in [Docker](#docker).

1. <span id="node">Node</span>
   You can create a binary file for your operating system by running ```npm run setup```, by default this will create a directory in your home directory called vim-adventures where the executable and saved games will be stored. Make sure you update the [.env file options](#environment) if you want to change the application defaults. When you're ready navigate to the install directory and run ```./vim-adventures```

2. <span id="docker">Docker</span>
   To make this process easier you can use ```docker-compose build``` to create the container for you, you will only need to run this once. When you're ready to play run ```docker-compose up``` this will run the application on port 80 by default. If you don't want to use ```docker compose``` you can build the image yourself (kindly provided by [@slmg](https://github.com/slmg)):

```docker build --build-arg APP_DIR=./ -t vim-adventures:latest .```

```docker container run -p 127.0.0.1:80:80 vim-adventures```

> Note: If you build manually ensure you change the .env APP_DIR value matches the APP_DIR build argument above.

> *Warning: If you delete or rebuild this container you will lose all of your saved progress.*


## <span id="options">Options</span>

There are environment variables you can use to change the default application directory and name, and the port which the application runs.

### <span id="environment">Environment variables</span>

Before the install, from the project root directory, you can modify the .env the following:

* ```HOST``` - the hostname you'd like to use to access the application on. Default - localhost. You'll have to update your hosts file if you want a custom host.
* ```APP_DIR``` - the directory the application must be installed. Default - $HOME/vim-adventures for NodeJS and ./ for Docker.
* ```APP_NAME``` - name you would like to export for the application. Default - vim-adventures
* ```PORT``` - the port that you want the application to run on localhost. - Default - 80

This .env file will be copied to the install install directory i.e. APP_DIR and can be updated from there after installation.

## <span id="run">Running Vim Adventures</span>

If you changed the default directories navigate there instead of the directories explained below.

* On Windows you can navigate to your user directory and right click on the vim-adventures.exe and run as administrator if you want to access the default port 80.
* On Unix systems cd to the save location and run ```./vim-adventure``` from the terminal. You may have to sudo the command to elevate the port access. Unix systems restrict access to lower ports under 1024.

If you don't want to run the application as sudo. [dotenv](https://github.com/motdotla/dotenv#readme) package is included you can modify the .env file in the install directory (APP_DIR, default $HOME/vim-adventures) and change the PORT variable for example: PORT=8080 will set the port to 8080 and you can access the application server at http://localhost:8080.

Have fun!
