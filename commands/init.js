'use strict'
const exec = require('child_process').exec // node子线程
const co = require('co') // 自行git一波
const prompt = require('co-prompt') // 命令行提示输入的插件
const config = require('../config') // 配合文件(tpl地址等)
const chalk = require('chalk') // 就是打印文字的颜色的插件
module.exports = (projectName) => {
    co(function *() {
        // 输入需要创建的模板 目前只有一个所以注释掉
        // let tplName = yield prompt('Template name(vue): ')
        let tplName = 'vue'

        // 项目名称
        projectName = projectName || (yield prompt('Project name(hs-vue): '))
        projectName = projectName || 'hs-vue'
        
        //分支名称 项目地址
        let branch
        let gitUrl

        if (!config.tpl[tplName]) {
            console.log(chalk.red('\n × Template does not exit!'))
            process.exit()
        }
        gitUrl = config.tpl[tplName].url
        branch = config.tpl[tplName].branch

        let cloneStr = `git clone -b ${branch} ${gitUrl} ${projectName}`
        let rmStr = `rm -rf ${projectName}/.git`

        console.log(chalk.white('\n Start generating...'))

        // clone对应地址的模板
        exec(cloneStr, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                process.exit()
            }
            // 删除目录下的.git文件夹
            exec(rmStr, () => {
                console.log(chalk.green('\n √ Generation completed!'))
                console.log(`\n cd ${projectName} && npm install \n`)
                process.exit()
            })
        })
    })
}