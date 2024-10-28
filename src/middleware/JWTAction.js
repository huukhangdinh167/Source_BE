import jwt from 'jsonwebtoken';
require("dotenv").config();

const CreateJWT = () => {
    let payload = { name: "Hukhen", value: "cutedeptrai" }
    let key = process.env.JWT_SECRET
    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log(token)
    } catch (error) {
        console.log(error)
    }

    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let data = null;

    try {
        let decoded = jwt.verify(token, key)
        data = decoded;
    } catch (err) {
        console.log(err)
    }
    return data;


    // jwt.verify(token, key, function (err, decoded) {
    //     if (err) {
    //         console.log(err)
    //         return data
    //         /*
    //           err = {
    //             name: 'TokenExpiredError',
    //             message: 'jwt expired',
    //             expiredAt: 1408621000
    //           }
    //         */
    //     }

    //     return decoded;
    // });
}
module.exports = {
    CreateJWT, verifyToken
}