const Joi = require('joi');

const schemas = {
  'property': Joi.object().keys({
    price: Joi.number().greater(0),
    currency: Joi.string().valid('BYN', 'USD', 'EURO'),
    heading: Joi.string(),
    location: Joi.string(),
    agentId: Joi.number().integer().optional()
  }),

  'agent': Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string(),
    tel: Joi.string(),
    officeId: Joi.number().integer().optional()
  }),

  'office': Joi.object().keys({
    title: Joi.string(),
    website: Joi.string(),
    address: Joi.string()
  })
};

exports.check = function (schema, data) {
  if (!schemas[schema])  return {};

  return Joi.validate(data, schemas[schema], { presence: 'required' });
};
