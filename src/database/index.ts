import { User } from './entities/User'
import path = require('path')
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Category } from './entities/Category'
import { Inventory } from './entities/Inventory'
import { Item } from './entities/Item'
import { SubCategory } from './entities/SubCategory'

declare var process: {
  env: {
    db_name: string
    db_user: string
    db_pass: string
  }
}

let connection = createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.db_user,
  password: process.env.db_pass,
  database: 'ERM-1',
  entities: [Category, Inventory, Item, SubCategory, User],
  synchronize: true,
  logging: false,
})

export default connection
