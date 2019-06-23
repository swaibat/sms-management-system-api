export function verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      // get token from array
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    }
    res.status(403).send({error:403, message:'provide a token to get our services'});
}