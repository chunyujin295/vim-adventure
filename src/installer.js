const os = require('os');
const { exec } = require('pkg');

const fs = require('fs');

const env = require('dotenv').config();
const expand = require('dotenv-expand');

expand(env);

const appDir = process.env.APP_DIR;
const appName = process.env.APP_NAME;
const appPath = `${appDir}/${appName}`;

// Install the package into the directory. Using the host system and the node version installed on the machine.
async function install() {
  try {
    console.log('Creating application directory', appDir);
    fs.mkdirSync(`${appDir}`);
    fs.mkdirSync(`${appDir}/saved`);

    console.log('Copying environment variables');
    fs.copyFileSync(`${__dirname}/.env`, `${appDir}/.env`);

    console.log('Creating binaries');
    if (!process.env.DOCKER) await exec(['.', '--target', 'host', '--output', appPath]);

    console.log('Vim adventures successfully installed!');
  } catch (error) {
    const message = error.message || error;
    console.error('An error occurred while setting up vim adventures.', message);

    if (error.code !== 'EEXIST') fs.rmdirSync(appDir, { recursive: true });
  }
}

install();
