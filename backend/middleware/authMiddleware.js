const jwt= require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers.access_token;
    if (!token) return res.status(401).send();

    try {
        req.user = jwt.verify(token, "leulabayejigu");
    } catch (error) {
        res.status(401).send()
    }

    return next();
}
