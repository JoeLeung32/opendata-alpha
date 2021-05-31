const {FTP} = require('./classes/ftp')
const {FS} = require('./classes/fs')

class Core {
    #source
    #ftp
    #fs

    constructor() {
        this.#ftp = new FTP()
        this.#fs = new FS()
    }

    run(path) {
        this.#source = path
        this.#fs.setDateMarker(this.#source)
        this.#ftp.autoDeploy(this.#fs.scan(this.#source))
    }
}

module.exports = {
    Core
}
