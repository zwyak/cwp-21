const CrudService = require('./crud');
const validator = require('./validator');

class AgentsService extends CrudService{
  constructor(agentsRepository, propertiesRepository, errors){
    this.agentsRepository = agentsRepository;
    this.propertiesRepository = propertiesRepository;
    this.errors = errors;
  }

  async readChunk(options) {
    return super.readChunk(options);
  }

  async read(id) {
    return super.read(id);
  }

  async create(data) {
    const validationResult = validator.check('agent', data);
    let agent = {};

    if (validationResult.error) {
      throw this.errors.createAgent;
    }else{
      agent = {
        name: data.name,
        email: data.email,
        tel: data.tel,
        officeId: null
      };
    }

    return super.create(agent);
  }

  async update(id, data) {
    const validationResult = validator.check('agent', data);
    let agent = {};

    if (validationResult.error){
      throw this.errors.updateProperty;
    }else{
      property = {
        name: data.name,
        email: data.email,
        tel: data.tel,
        officeId: data.officeId
      };
    }

    return super.update(data.id, agent);
  }

  async delete(id) {
    const properties = await this.propertiesRepository.findAll({raw: true, where:{agentId: id}});

    properties.forEach((item, i) => {
      await this.propertiesRepository.unlink(item.id);
    });

    return super.delete(id)
  }
}
