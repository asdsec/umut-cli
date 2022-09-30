#!/usr/bin/env node

import yargs from 'yargs';
const commands = 'commands';

yargs.commandDir(commands).demandCommand().help().strict().argv;
