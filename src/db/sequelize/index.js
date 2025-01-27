import Sequelize, { DataTypes } from 'sequelize'
import Config from '../../Config'
import QueryInterface from './QueryInterface'

const db = {}

export default db

export function bootstrap () {
  const config = Config.get().sequelize

  db.sequelize = config.sequelize || new Sequelize(
    config.database, config.user, config.password, config.options
  )

  'DataSet Layer Point'
    .split(' ')
    .forEach((file) => {
      const model = require('./' + file).default(db.sequelize, DataTypes)
      db[model.name] = model
    })

  db.DataSet.hasMany(db.Layer, { as: 'layers' })
  db.Layer.hasMany(db.Point, { as: 'points' })

  db.query = new QueryInterface(db)

  db.sequelize.sync({ force: false })

  return db
}

export function disconnect () {
  return db.sequelize.close()
}
