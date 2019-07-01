export function inputValidator(req, res, next) {
  const {firstName, lastName, email, address, phoneNumber, password, isAdmin} = req.body;
  try {
    const firstname = firstName.match(/^[a-zA-Z]{3,30}$/);
    const lastname = lastName.match(/^[a-zA-Z]{3,30}$/);
    const mail = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const Address = address.match(/^[a-zA-Z0-9]{3,30}$/);
    const phone = phoneNumber.match(/^[0-9]{10,13}$/);
    const Password = password.match(/^[a-zA-Z0-9]{5,30}$/);
    const str = [firstname, lastname, Address, Password];
    for (let i = 0; i < str.length; i++) {
      if (!str[i]) return res.status(400).send({error: 400,message: 'Use valid characters with minimum of 3',});
    }
    if (!mail) return res.status(400).send({error: 400,message: 'Please provide a valid email address',});
    if (!phone) return res.status(400).send({error: 400,message: 'phone number should be numeric with length of 10 to 13',});
    if (typeof isAdmin !== 'boolean')return res.status(400).send({error: 400,message: 'isAdmin field should be a boolean',});
    next();
  } catch (error) {
    if (error.message.match('undefined')) return res.status(400).send({ error: 400, message: 'All fields are required' });
    error.message = error.message.replace('.match is not a function', '');
    res.status(400).send({ error: 400, message: `Your ${error.message} is invalid make it a string` });
  }
}