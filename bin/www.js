#!/usr/bin/env node

const env = require('dotenv').config();
const expand = require('dotenv-expand');

expand(env);

require('../src/server.js');