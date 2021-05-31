const fs = require('fs')

class FS {
    #list = []

    setDateMarker(dirname) {
        const filename = `${dirname}/${new Date().toISOString()}.upload`
        fs.writeFileSync(filename, new Date().toLocaleString())
    }

    scan(dirname, remoteParentPath) {
        if (!fs.existsSync(dirname)) {
            throw `${dirname} not exist`
        }
        fs.readdirSync(dirname).forEach(filename => {
            const address = `${dirname}/`
            const fileLocalPath = `${address}${filename}`
            let fileRemotePath = fileLocalPath.replace(address, '')
            if (remoteParentPath) {
                fileRemotePath = [remoteParentPath, fileRemotePath].join('/')
            }
            const meta = {
                type: null,
                name: filename,
                localPath: fileLocalPath,
                remotePath: fileRemotePath,
            }
            switch (true) {
                case fs.lstatSync(fileLocalPath).isDirectory(): {
                    meta.type = 'd'
                    this.scan(fileLocalPath, fileRemotePath)
                    break
                }
                case fs.lstatSync(fileLocalPath).isFile(): {
                    meta.type = '-'
                    break
                }
            }
            this.#list.push(meta)
        })
        return this.#list
    }
}

module.exports = {
    FS
}
