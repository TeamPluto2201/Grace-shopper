const jwt = require('jsonwebtoken')

// JOE CR: What was the plan here?
const requireAuth = (req, res, next) => {
    // const token = req.cookies.jwt
    console.log('req',req)
    // check if json web token exists and is verifed
        // if(token) {
        //     jwt.verify(token, process.env.JWT, (err, decodedToken) => {
        //         if(err) {
        //             console.log(err.message)
        //             res.redirect('/login')
        //         } else {
        //             console.log(decodedToken)
        //             next()
        //         }
        //     })
        // } else {
        //     res.redirect('/login')
        // }
}

module.exports = { requireAuth };