const CrudService = require('./crud');
const validator = require('./validator');

class AgentsService extends CrudService{
  async readChunk(options) {
    return super.readChunk(options);
  }

  async read(id) {
    return super.read(id);
  }

  
}
