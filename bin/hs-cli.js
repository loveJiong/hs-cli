#!/usr/bin/env node

var program = require('commander')

program
  .version(require('../package.json').version) // 版本号
  .usage('[command]') // 还不知道干嘛用的，好像就是看看的

program
  .command('init [projectName]') // 创建一个command
  .description('init a new vue') // 它的描述
  .action((projectName) => { // 它的回调
    require('../commands/init')(projectName)
  })

program.parse(process.argv) // 解析命令行输入的参数

if(!program.args.length){
  program.help()
}