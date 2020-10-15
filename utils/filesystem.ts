import fs from 'fs'

class FileSystem {
    static WriteDataToFile = (filename: string, data: any) => {
        try {
            fs.writeFileSync(filename, JSON.stringify(data, null, '\t'), { encoding: 'utf8' })
        } catch (error) {
            console.log(error)
        }
    }
}

export default FileSystem