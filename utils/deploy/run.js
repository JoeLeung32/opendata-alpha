const process = require('process')
const {Core} = require('./core')

try {
    const ArgDirname = process.argv.find(arg => arg.indexOf('--dirname') === 0)
    if (ArgDirname && ArgDirname.split('=').length) {
        const dirname = ArgDirname.split('=')[1]
        const core = new Core()
        core.run(dirname)
    }
} catch (e) {
    console.error(e)
}
