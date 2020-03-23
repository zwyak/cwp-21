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
      throw this.errors.updateAgent;
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
    const properties = await this.propertiesRepository.readByAgentId(id, null);

    properties.forEach((item, i) => {
      await this.propertiesRepository.unlink(item.id);
    });

    return super.delete(id)
  }

  async link(id, officeId){
    id = parseInt(id);
    officeId = parseInt(agentId);
    const agent = await this.repository.findById(id);

    if (!agent) {
      throw this.errors.notFound;
    }

    return super.update(id, {officeId: agentId})
  }

  async unlink(id){
    id = parseInt(id);

    const agent = await this.repository.findById(id);

    if (!agent) {
      throw this.errors.notFound;
    }

    return super.update(id, {officeId: null})
  }

  async readProperties(id, options){
    const properties = await this.propertiesRepository.readByAgentId(id, options);
  }
}
