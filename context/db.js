module.exports = (Sequelize, config) => {
  const sequelize = new Sequelize(config.db.name, options);

  const Agent = require('../models/agent') (Sequelize, sequelize);
  const Office = require('../models/offices') (Sequelize, sequelize);
  const Property = require('../models/properties') (Sequelize, sequelize);

  Agent.belongsTo(Office);
  Property.belongsTo(Agent);

  sequelize.sync()
    .then(res =>{
      console.log(res);
    })
    .catch(err =>{
      console.error(err);
    })

  return {
    agents: Agent,
    offices: Office,
    properties: Property,

    sequelize,
    Sequelize
  }
};
