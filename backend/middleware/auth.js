const jwt = require("jsonwebtoken")
const auth = (req, res, next)=> {
    const token = req.header("x-auth-token")
    if (!token) {
        return res.status(401).json({message : "access denied. No token provided"})
    }
    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message : "access denied. Invalid token"})
    }
}

module.exports = auth