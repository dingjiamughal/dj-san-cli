#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const program = require('commander');
const inquirer = require('inquirer')
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');

program
  .version('0.1.0')
  .option('i, init', 'init dj-san-cli')

program
  .parse(process.argv);

const nameQuestion = {
  type: 'input',
  message: `product name: `,
  name: 'name',
  default: 'dj-san-cli'
};

const versionQuestion = {
  type: 'input',
  message: `product version: `,
  name: 'version',
  default: '0.0.1'
};

const portQuestion = {
  type: 'input',
  message: `server port: `,
  name: 'port',
  default: '8031'
};

if (program.init) {
  console.info('');
  inquirer.prompt([
    nameQuestion,
    versionQuestion,
    portQuestion,
  ]).then(function (answers) {
    const spinner = ora('downloading "dj-san-cli" from github').start();
    download('dingjiamughal/dj-san-tpl', answers.name, function (err) {
      if (!err) {
        spinner.clear()
        console.info('');
        console.info(chalk.green('-----------------------------------------------------'));
        console.info('');
        spinner.succeed(['project created successfully,please continue:'])
        console.info('');
        console.info(chalk.cyan(` -  cd ${answers.name}`));
        console.info(chalk.cyan(` -  npm install / yarn install`));
        console.info(chalk.cyan(` -  npm run dev`));
        console.info('');
        console.info(chalk.gray(`devServer: http://localhost:${answers.port}`));
        console.info('');
        console.info(chalk.gray('document: https://github.com/dingjiamughal/dj-san-tpl'));
        console.info('');
        console.info(chalk.green('-----------------------------------------------------'));
        console.info('');

        fs.readFile(`${process.cwd()}/${answers.name}/package.json`, (err, data) => {
          if (err) throw err;
          let _data = JSON.parse(data.toString())
          _data.name = answers.name
          _data.version = answers.version
          _data.port = answers.port
          let str = JSON.stringify(_data, null, 4);
          fs.writeFile(`${process.cwd()}/${answers.name}/package.json`, str, function (err) {
            if (err) throw err;
            process.exit()
          })
        });
      } else {
        spinner.warn(['warning，please issue in https://github.com/dingjiamughal'])
        process.exit()
      }
    })
  });
}
