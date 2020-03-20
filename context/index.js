module.exports = (Sequelize, config) => {
  const options = {
    host: config.db.host,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      paranoid: true,
      defaultScope: {
        where: { deletedAt: { $eq: null } }
      }
    }
  };
  ...
};
