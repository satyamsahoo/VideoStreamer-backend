import bcrypt from 'bcryptjs';
const saltRound = 10

const encryptPassword = async (password: string) => {
    return new Promise(function (resolve, reject) {
        return bcrypt.genSalt(saltRound, (saltError: any, salt: any) => {
            if (saltError) {
                reject(saltError)
            } else {
                return bcrypt.hash(password, salt, (hashError: any, hash: any) => {
                    if (hashError) {
                        reject(hashError)
                    } else {
                        resolve(hash)
                    }
                })
            }
        })
    })
}

const comparePassword = (password: string, hash: string) => {
    return new Promise((resolve, reject) => {
        return bcrypt.compare(password, hash, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

export default { encryptPassword, comparePassword }

