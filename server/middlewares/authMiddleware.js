const jwt = require('jonwebtoken');

const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(e){
        res.status(401).json({ message: 'Token is invalid' });
    }
}

module.exports = protect;