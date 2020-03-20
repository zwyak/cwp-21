const CrudService = require('./crud');
const validator = require('./validator');

class PropertiesService extends CrudService{
  async readChunk(options) {
    return super.readChunk(options);
  }

  async read(id) {
    return super.read(id);
  }

  async create(data) {
    const validationResult = validator.check('createProperty', data);
    let property = {};
    if (validationResult.error) {
      throw this.errors.createProperty;
    }else{
      property = {
        heading: data.heading,
        price: data.price,
        currency: data.currency,
        location: data.location
      };
    }

    return super.create(property);
  }
}

module.exports = PropertiesService;
