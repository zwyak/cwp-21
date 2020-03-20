class CrudService {
  constructor(repository, errors) {
    this.repository = repository;
    this.errors = errors;

    this.defaults = {
      readChunk: {
        limit: 10,
        page: 1,
        order: 'asc',
        orderField: 'id'
      }
    };
  }

  async readChunk(options) {
    options = Object.assign({}, this.defaults.readChunk, options);

    let limit = options.limit;
    let offset = (options.page - 1) * options.limit;
    
    return await this.repository.findAll({
      limit: limit,
      offset: offset,
      order: [[options.orderField, options.order.toUpperCase()]],
      raw: true
    });
  }

  async read(id) {
    id = parseInt(id);

    if (isNaN(id)) throw this.errors.invalidId;

    const item = await this.repository.findById(
      id,
      { raw: true }
    );

    if (!item) {
      throw this.errors.notFound;
    }

    return item;
  }

  async create(data) {}

  async update(id, data) {}

  async delete(id) {}
}

module.exports = CrudService;
