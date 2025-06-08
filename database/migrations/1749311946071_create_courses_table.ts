import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').notNullable()
      table
        .integer('instructor_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE')

      table.timestamp('start_time').notNullable()
      table.timestamp('end_time').notNullable()

      table.integer('max_participants').notNullable()

      table.boolean('is_full').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
