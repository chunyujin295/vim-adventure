const express = require('express');
const moment = require('moment');

const router = express.Router();
const fs = require('fs');
const path = require('path');

// The user could have an appDir and not appName so we have to make sure we get the full path.
const appDir = process.env.APP_DIR;

const appName = 'vim-adventures';
const appPath = path.resolve(`${appDir}/${appName}`);
const saveDir = path.resolve(appDir, 'saved');
const appResources = path.resolve(`${__dirname}/..`);

console.log('Application path: ', appPath);
console.log('Save directory: ', saveDir);
console.log('Application resources: ', appResources);

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Vim Adventures'
  });
});

router.get('/levels/:level', (req, res) => {
  try {
    const levelData = fs.readFileSync(
      `${appResources}/levels/new/${req.params.level}.json`,
      'utf8'
    );

    return res.send(levelData);
  } catch (error) {
    console.error('An error occurred while trying to load level', req.params.level, error);

    if (error.code === 'ENOENT') return res.status(401).send('The level you chose is invalid!');

    return res.status(500).send(error.message);
  }
});

router.get('/levels/load/:level', (req, res) => {
  const { level } = req.params;

  try {
    const savedData = fs.readFileSync(`${appResources}/levels/load/${level}.json`, 'utf8');

    return res.send(savedData);
  } catch (error) {
    console.error(`An error occurred while trying to retrieve level: ${level}.json`, error);

    if (error.code === 'ENOENT') return res.status(401).send('The level you chose is invalid!');

    return res.status(500).send(error.message);
  }
});

router.get('/saved/:name', (req, res) => {
  const { name } = req.params;
  try {
    const savedData = fs.readFileSync(`${saveDir}/${name}.json`, 'utf8');

    return res.send(savedData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res
        .status(401)
        .send('Unable to find the save provided. Please check your saves and try again.');
    }

    return res.status(500).send(error.message);
  }
});

router.post('/saved/:name', (req, res) => {
  try {
    const { name } = req.params;
    const { state_string } = req.body;

    fs.writeFileSync(`${saveDir}/${name}.json`, state_string, 'utf8');

    res.sendStatus(201);
  } catch (error) {
    const message = error.message || error;

    console.error('An error occurred while trying to save.', error);

    res.status(500).send(message);
  }
});

router.get('/saves', (req, res) => {
  try {
    const saveFiles = fs.readdirSync(`${saveDir}`, 'utf8', true);
    let template = fs.readFileSync(`${appResources}/templates/saved-games.txt`, 'utf8');
    template += `Save location: ${saveDir}\n\r`;
    template += `${'NAME'.padEnd(20)}DATE\n\r`;
    // Sort saved data by newest to oldest
    saveFiles.sort(
      (a, b) =>
        fs.statSync(`${saveDir}/${b}`).birthtimeMs - fs.statSync(`${saveDir}/${a}`).birthtimeMs
    );

    if (saveFiles !== undefined) {
      saveFiles.forEach(fileName => {
        const fileData = fs.statSync(`${saveDir}/${fileName}`, 'utf8');
        // Remove the .json and concat the date created for each file.
        template += `\r\n${fileName.slice(0, fileName.indexOf('.')).padEnd(20)} ${moment(
          fileData.birthtimeMs
        ).format('LLLL')}`;
      });
    }

    return res.send(template);
  } catch (error) {
    console.error(`An error occurred while trying to get saved game list: `, error);
    // If there is no save file we need to tell the user what happened.
    if (error.code === 'ENOENT')
      return res.send('No saves available! Please make a save to use this option.');

    return res.send(error.message);
  }
});

router.delete('/saved/:name', (req, res) => {
  const { name } = req.params;

  try {
    fs.unlinkSync(`${saveDir}/${name}.json`, 'utf8');

    return res.status(200).send(`${name} save deleted successfully!`);
  } catch (error) {
    console.error(`An error occurred while trying to delete  game: ${name}`, error);

    if (error.code === 'ENOENT') {
      return res
        .status(401)
        .send('Unable to find the save provided. Please check your saves and try again.');
    }

    return res.send(`An error occurred deleting save. Check logs for more information`);
  }
});

module.exports = router;
