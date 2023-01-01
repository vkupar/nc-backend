import Joi from 'joi'

const createOrUpdate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
})

export default { createOrUpdate }
