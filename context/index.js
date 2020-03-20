module.exports = (Sequelize, config) => {
  const options = {
    dialect: 'sqlite',
    logging: false,
    define: {
      timestamps: true,
      paranoid: true,
      defaultScope: {
        where: { deletedAt: { $eq: null } }
      }
    }
  };
};
