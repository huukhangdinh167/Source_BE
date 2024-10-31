import jwt from 'jsonwebtoken';
require("dotenv").config();

const nonSecurePaths = ['/', '/login', '/register', '/account'];
const CreateJWT = (payload) => {
    // let payload = { name: "Hukhen", value: "cutedeptrai" }
    let key = process.env.JWT_SECRET
    let token = null;
    try {
        token = jwt.sign(payload, key);

    } catch (error) {
        console.log(error)
    }

    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let decoded = null;
    try {
        decoded = jwt.verify(token, key)

    } catch (err) {
        console.log("checke", err)
    }
    return decoded;


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

const checkUserJwt = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;

    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        let decoded = verifyToken(token)
        if (decoded) {
            req.user = decoded;
            next()
        } else {
            return res.status(401).json({
                EC: -1,
                EM: 'Note authenticated the user',
                DT: ''

            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: 'Note authenticated the user',
            DT: ''

        })
    }
}

const checkPermission = async(req, res, next) => {
   
   if ( nonSecurePaths.includes(req.path)) return next();

    if (req.user) {
        let email = req.user.email
        let role = await req.user.groupWithRole.Roles
        let currentUrl = req.path;
        if (!role || role.length === 0) {
            return res.status(403).json({
                EC: -1,
                EM: 'Your do not have permission to access this resource...',
                DT: ''

            })
        }
        let canAcess = await role.some(item => item.url === currentUrl)
        
        if (canAcess === true) {
            next();
        } else {
            return res.status(403).json({
                EC: -11,
                EM: 'Your do not have permission to access this resource...',
                DT: ''

            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: 'Note authenticated the user',
            DT: ''

        })
    }
}

module.exports = {
    CreateJWT, verifyToken, checkUserJwt, checkPermission
}