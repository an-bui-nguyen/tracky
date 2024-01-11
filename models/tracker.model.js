export default (sequelize, Sequelize) => {
  const Tracker = sequelize.define('tracker', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    note: {
      type: Sequelize.STRING
    }
  })

  return Tracker
}