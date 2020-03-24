const CrudService = require('./crud');
const validator = require('./validator');

class PropertiesService extends CrudService{
  async readChunk(options) {
    return await super.readChunk(options);
  }

  async read(id) {
    return await super.read(id);
  }

  async readByAgentId(id, options){
    options = Object.assign({}, this.defaults.readChunk, options);

    let limit = options.limit;
    let offset = (options.page - 1) * options.limit;

    const properties = await this.repository.findAll({
      limit: limit,
      offset: offset,
      order: [[options.orderField, options.order.toUpperCase()]],
      raw: true,
      where:{agentId: id}
    });

    return properties;
  }

  async create(data) {
    const validationResult = validator.check('property', data);
    let property = {};

    if (validationResult.error) {
      throw this.errors.createProperty;
    }else{
      property = {
        heading: data.heading,
        price: data.price,
        currency: data.currency,
        location: data.location,
        agentId: null
      };
    }

    return super.create(property);
  }

  async update(id, data) {
    const validationResult = validator.check('property', data);
    let property = {};

    if (validationResult.error){
      throw this.errors.updateProperty;
    }else{
      property = {
        heading: data.heading,
        price: data.price,
        currency: data.currency,
        location: data.location,
        agentId: data.agentId
      };
    }

    return super.update(data.id, property);
  }

  async delete(id) {
    return super.delete(id)
  }

  async link(id, agentId){
    id = parseInt(id);
    agentId = parseInt(agentId);
    const property = await this.repository.findById(id);

    if (!property) {
      throw this.errors.notFound;
    }

    return super.update(id, {agentId: agentId})
  }

  async unlink(id){
    id = parseInt(id);

    const property = await this.repository.findById(id);

    if (!property) {
      throw this.errors.notFound;
    }

    return super.update(id, {agentId: null})
  }
}

module.exports = PropertiesService;
