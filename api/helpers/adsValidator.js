// Property validation
export function adsValidator(req, res, next) {
    const {price, address, city, state, type, imageUrl} = req.body;
    if (typeof price !== 'number') return res.status(400).send({error: 400,message: 'price should be a number'});
    // input fields
    try {
      const Type = type.match(/^[a-zA-Z0-9]{3,30}$/);
      const Address = address.match(/^[a-zA-Z0-9]{3,30}$/);
      const City = city.match(/^[a-zA-Z0-9]{3,30}$/);
      const State = state.match(/^[a-zA-Z0-9]{5,30}$/);
      const image = imageUrl.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|webp|gif))/i);
      const strFeilds = [Type, Address, City, State];
      for (let i = 0; i < strFeilds.length; i++) {
        if (!strFeilds[i]) return res.status(400).send({error: 400,message: 'Type, Address, City, State  Use valid characters with minimum of 3',});
      }
      if (!image) return res.status(400).send({error: 400,message: 'provide a supported image format like .jpg .jpeg .png .gif .webp' });
      next();
    } catch (error) {
      if (error.message.match('undefined')) return res.status(400).send({ error: 400, message: 'All fields are required' });
      error.message = error.message.replace('.match is not a function', '');
      return res.status(400).send({ error: 400, message: `Your ${error.message} is invalid make it a string` });
    }
  }