import { DataTypes } from 'sequelize'

export default (sequelize, Sequelize, Options, Trackers) => {
  const Entry = sequelize.define('entry', {
    OptionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Options,
        key: 'id'
      }
    },
    TrackerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Trackers,
        key: 'id'
      }
    }
  })

  return Entry
}