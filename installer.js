const os = require('os');
const { exec } = require('pkg');

const fs = require('fs');

const env = require('dotenv').config();
const expand = require('dotenv-expand');

expand(env);

const appDir = process.env.APP_DIR || `${os.homedir()}/vim-adventures`;
const appName = process.env.APP_NAME || 'vim-adventures';
const appPath = `${appDir}/${appName}`;

// Install the package into the directory. Using the host system and the node version installed on the machine.
async function install() {
  try {
    console.log('Creating application directories', appDir);
    fs.mkdirSync(`${appDir}/saved`, { recursive: true });

    console.log('Copying environment variables');
    fs.copyFileSync(`${__dirname}/.env`, `${appDir}/.env`);

    console.log('Creating binaries');
    if (!process.env.DOCKER) await exec(['.', '--target', 'host', '--output', appPath]);

    console.log('Vim adventures successfully installed!');
  } catch (error) {
    const message = error.message || error;
    
    if (error.code === 'EEXIST') { 
      console.log('The application is already installed please backup your data and remove the application and try again.');
    } else {
      fs.rmdirSync(appPath) };
      console.error('An error occurred while setting up vim adventures.', message);
    }

  }

install();
