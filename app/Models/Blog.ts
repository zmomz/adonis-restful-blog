import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Blog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string
  @column()
  public status: string
  @column()
  public text: string
  @column()
  public cover: string

  @column.dateTime({ autoCreate: true, serialize: (value:DateTime) => value.toFormat('yyyy LLL dd') })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value:DateTime) => value.toFormat('yyyy LLL dd') })
  public updatedAt: DateTime
}