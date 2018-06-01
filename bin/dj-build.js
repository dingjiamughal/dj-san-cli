/**
 * @Author: Dingjia
 * @Date:   2018-05-31T23:02:21+08:00
 * @Last modified by:   Dingjia
 * @Last modified time: 2018-05-31T23:36:14+08:00
 */

#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const program = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');

program.version('0.0.1').option('-i, init [name]', '初始化dj-san-tpl项目').parse(process.argv);

if (program.init) {
  const spinner = ora('正在从github下载dj-san-cli').start();
  download('dingjiamughal/dj-san-tpl', program.init, function(err) {
    if (!err) {
      //
      console.info(chalk.blueBright('下载成功~'));
    } else {
      // 可以输出一些项目失败的信息
      console.info(chalk.blueBright('下载失败！！！'));
    }
  })
}
