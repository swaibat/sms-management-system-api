// to be specific in the error messages i have have separates each type of messages separatly
// categories are,
/**
 * @required fields (all fields should appear)
 * @typeof data either string boolean or number
 * @input content type (no invalid characters allowed)
 */
export function inputValidator(req, res, next) {
  const {firstName, lastName, email, address, phoneNumber, password,} = req.body;
  const authSchema = [firstName, lastName, email, address, phoneNumber, password];
  // required fields
  if (!firstName || !lastName || !email || !address || !phoneNumber || !password) return res.status(400).send({
          error: 400,
          message: 'All field are  required'
      })
      // input fields validation
  for (let i = 0; i < authSchema.length; i++) {
      if (typeof authSchema[i] !== "string") return res.status(400).send({
          error: 400,
          message: `fields  should be in string fomat`
      })
  }
  const firstname = firstName.match(/^[a-zA-Z]{3,30}$/)
  const lastname = lastName.match(/^[a-zA-Z]{3,30}$/)
  const mail = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  const Address = address.match(/^[a-zA-Z0-9]{3,30}$/)
  const phone = phoneNumber.match(/^[0-9]{10,13}$/)
  const Password = password.match(/^[a-zA-Z0-9]{5,30}$/)
  if (!firstname || !lastname || !Address || !Password) return res.status(400).send({
      error: 400,
      message: 'all names should contain only aphabets minimum 3 characters'
  })
  if (!mail) return res.status(400).send({
      error: 400,
      message: 'Please provide a valid email address'
  })
  if (!phone) return res.status(400).send({
      error: 400,
      message: 'phone number should be numeric with length of 10 to 13'
  })
  next()
}

export function propertyValidator(req, res, next) {
  const { price, address, city, state, type, imageUrl } = req.body;
  const schema = [address, city, state, type, imageUrl];
  // required fields
  if (!price || !address || !city || !state || !imageUrl || !type) return res.status(400).send({
          error: 400,
          message: 'All fields are  required'
      })
      // validate type of data
  if (typeof price !== 'number') return res.status(400).send({
      error: 400,
      message: 'price should be a number'
  })

  for (let i = 0; i < schema.length; i++) {
      if (typeof schema[i] !== "string") return res.status(400).send({
          error: 400,
          message: `Address, City, State, Type, ImageUrl should be a string`
      })
  }
  // input fields
  const Type = type.match(/^[a-zA-Z0-9]{3,30}$/);
  const Address = address.match(/^[a-zA-Z0-9]{3,30}$/);
  const City = city.match(/^[a-zA-Z0-9]{3,30}$/);
  const State = state.match(/^[a-zA-Z0-9]{5,30}$/);
  const image = imageUrl.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|webp|gif))/i);
  if (!Type || !Address || !City || !State) return res.status(400).send({
      error: 400,
      message: 'Make your fields Strings with no special characters & min 3'
  })
  if (!image) return res.status(400).send({
      error: 400,
      message: 'provide a supported image format like .jpg .jpeg .png .gif .webp'
  })
  next()
}