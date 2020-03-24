const CrudService = require('./crud');
const validator = require('./validator');

class OfficesService extends CrudService{
  constructor(officesRepository, agentsRepository, errors){
    this.officesRepository = officesRepository;
    this.agentsRepository = agentsRepository;
    this.errors = errors;
  }

  async readChunk(options) {
    return await super.readChunk(options);
  }

  async read(id) {
    return await super.read(id);
  }

  async create(data) {
    const validationResult = validator.check('office', data);
    let office = {};

    if (validationResult.error) {
      throw this.errors.createOffice;
    }else{
      office = {
        title: data.title,
        website: data.website,
        address: data.address
      };
    }

    return super.create(office);
  }

  async update(id, data) {
    const validationResult = validator.check('office', data);
    let office = {};

    if (validationResult.error){
      throw this.errors.updateOffice;
    }else{
      office = {
        title: data.title,
        website: data.website,
        address: data.address
      };
    }

    return super.update(data.id, office);
  }

  async delete(id) {
    const agents = await this.agentsRepository.readByOfficeId(id, null);

    agents.forEach((item, i) => {
      await this.agentsRepository.unlink(item.id);
    });

    return super.delete(id)
  }

  async readAgents(id, options){
    const agents = await this.agentsRepository.readByOfficeId(id, options);
    return agents;
  }
}
