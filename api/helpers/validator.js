// to be specific in the error messages i have have separates each type of messages separatly

// body request
export function inputValidator(req, res, next) {
  const {
    firstName, lastName, email, address, phoneNumber, password, isAdmin,
  } = req.body;
  try {
    const firstname = firstName.match(/^[a-zA-Z]{3,30}$/);
    const lastname = lastName.match(/^[a-zA-Z]{3,30}$/);
    const mail = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const Address = address.match(/^[a-zA-Z0-9]{3,30}$/);
    const phone = phoneNumber.match(/^[0-9]{10,13}$/);
    const Password = password.match(/^[a-zA-Z0-9]{5,30}$/);
    const str = [firstname, lastname, Address, Password];
    for (let i = 0; i < str.length; i++) {
      if (!str[i]) {
        return res.status(400).send({
          error: 400,
          message: 'Use valid characters with minimum of 3',
        });
      }
    }
    if (!mail) {
      return res.status(400).send({
        error: 400,
        message: 'Please provide a valid email address',
      });
    }
    if (!phone) {
      return res.status(400).send({
        error: 400,
        message: 'phone number should be numeric with length of 10 to 13',
      });
    }
    if (typeof isAdmin !== 'boolean') {
      return res.status(400).send({
        error: 400,
        message: 'isAdmin field should be a boolean',
      });
    }
    next();
  } catch (error) {
    if (error.message.match('undefined')) return res.status(400).send({ error: 400, message: 'All fields are required' });
    error.message = error.message.replace('.match is not a function', '');
    return res.status(400).send({ error: 400, message: `Your ${error.message} is invalid make it a string` });
  }
}

// Property validation
export function propertyValidator(req, res, next) {
  const {
    price, address, city, state, type, imageUrl,
  } = req.body;
  if (typeof price !== 'number') {
    return res.status(400).send({
      error: 400,
      message: 'price should be a number',
    });
  }
  // input fields
  try {
    const Type = type.match(/^[a-zA-Z0-9]{3,30}$/);
    const Address = address.match(/^[a-zA-Z0-9]{3,30}$/);
    const City = city.match(/^[a-zA-Z0-9]{3,30}$/);
    const State = state.match(/^[a-zA-Z0-9]{5,30}$/);
    const image = imageUrl.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|webp|gif))/i);
    const strFeilds = [Type, Address, City, State];
    for (let i = 0; i < strFeilds.length; i++) {
      if (!strFeilds[i]) {
        return res.status(400).send({
          error: 400,
          message: 'Type, Address, City, State  Use valid characters with minimum of 3',
        });
      }
    }
    if (!image) {
      return res.status(400).send({
        error: 400,
        message: 'provide a supported image format like .jpg .jpeg .png .gif .webp',
      });
    }
    next();
  } catch (error) {
    if (error.message.match('undefined')) return res.status(400).send({ error: 400, message: 'All fields are required' });
    error.message = error.message.replace('.match is not a function', '');
    return res.status(400).send({ error: 400, message: `Your ${error.message} is invalid make it a string` });
  }
}
