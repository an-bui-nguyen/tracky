export default (sequelize, Sequelize) => {
  const Option = sequelize.define('option', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return Option
}