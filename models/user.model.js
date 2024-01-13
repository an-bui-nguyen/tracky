import { DataTypes } from 'sequelize'

export default (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING(64),
    }
  })

  return User
}
