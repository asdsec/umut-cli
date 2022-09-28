#!/usr/bin/env node

import yargs from 'yargs';
import take from './commands/take';

take.handle(yargs);

const argv = yargs.argv;
