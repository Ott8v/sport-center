import User from '#models/user'
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare intructorId: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare startTime: DateTime

  @column()
  declare endTime: DateTime

  @column()
  declare maxParticipants: number

  @column()
  declare isFull: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare instructor: BelongsTo<typeof User>
}
