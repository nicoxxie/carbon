'use strict';

const chalk = require('chalk');
const filesize = require('filesize');
const Table = require('cli-table');

const percentChange = (prev, current) => {
  const change = Math.floor((current - prev) / prev * 100);
  if (change > 0) {
    if (change === Infinity) {
      return chalk.gray('N/A');
    }
    return chalk.red.bold(`+${change} %`);
  } else if (change <= 0) {
    return chalk.green.bold(change + ' %');
  }
};

function printBundleSizes(stats) {
  const table = new Table({
    head: [
      chalk.gray.yellow('Bundle'),
      chalk.gray.yellow('Prev Size'),
      chalk.gray.yellow('Current Size'),
      chalk.gray.yellow('Diff'),
      chalk.gray.yellow('Prev Gzip'),
      chalk.gray.yellow('Current Gzip'),
      chalk.gray.yellow('Diff'),
    ],
  });

  stats.forEach(stat => {
    const { size, gzip } = stat;
    const prevSize = stat.prevSize !== undefined ? stat.prevSize : 0;
    const prevGzip = stat.prevGzip !== undefined ? stat.prevGzip : 0;
    table.push([
      chalk.white.bold(stat.key),
      chalk.gray.bold(filesize(prevSize)),
      chalk.white.bold(filesize(size)),
      percentChange(prevSize, stat.size),
      chalk.gray.bold(filesize(prevGzip)),
      chalk.white.bold(filesize(gzip)),
      percentChange(prevGzip, stat.gzip),
    ]);
  });

  // eslint-disable-next-line no-console
  console.log(table.toString());
}

module.exports = printBundleSizes;
