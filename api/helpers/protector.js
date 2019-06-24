export function verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') return res.status(403).send({error:403, message:'provide a token to get our services'});
      const bearer = bearerHeader.split(' ');
      // get token from array
      const bearerToken = bearer[1];
      res.locals.token = bearerToken;
      next();
      console.log('passed 1');
}