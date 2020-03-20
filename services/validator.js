const Joi = require('joi');

const schemas = {
  '/createProperty': Joi.object().keys({
    price: Joi.number().greater(0),
    currency: Joi.string().valid('BYN', 'USD', 'EURO'),
    heading: Joi.string(),
    location: Joi.string()
  }),
};

exports.check = function (schema, data) {
  if (!schemas[schema])  return {};

  return Joi.validate(data, schemas[schema], { presence: 'required' });
};
