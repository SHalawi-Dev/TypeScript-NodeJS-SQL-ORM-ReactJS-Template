import { Request } from 'express'
import { Item } from 'src/database/entities/Item'

export const paramMissingError =
  'One or more of the required parameters was missing.'

export interface ItemRequest extends Request {
  body: {
    data: Item
  }
}
