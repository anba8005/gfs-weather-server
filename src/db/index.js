import Config from '../Config'
import {
  bootstrap as mongooseBootstrap,
  disconnect as mongooseDisconnect
} from './mongoose'
import {
  bootstrap as sequelizeBootstrap,
  disconnect as sequelizeDisconnect
} from './sequelize'

let db = {}

export default db

export function bootstrap () {
  switch (Config.get().db) {
    case 'mongoose':
      Object.assign(db, mongooseBootstrap())
      break
    case 'sequelize':
      Object.assign(db, sequelizeBootstrap())
      break
  }

  return db
}

export function disconnect () {
  switch (Config.get().db) {
    case 'mongoose': return mongooseDisconnect()
    case 'sequelize': return sequelizeDisconnect()
  }
}
