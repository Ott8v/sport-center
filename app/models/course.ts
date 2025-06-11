import User from '#models/user'
import Booking from '#models/booking'
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'instructor_id' })
  declare instructorId: number

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

  @belongsTo(() => User, {
    foreignKey: 'instructorId',
  })
  declare instructor: BelongsTo<typeof User>

  @hasMany(() => Booking)
  declare bookings: HasMany<typeof Booking>
}
