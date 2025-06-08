import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'

export default class CreateUser extends BaseCommand {
  static commandName = 'create:user'
  static description = 'Create a new user in the database'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  async run() {
    this.logger.info('Creating a new user...')
    const name = await this.prompt.ask('Enter user name')
    const surname = await this.prompt.ask('Enter user surname')
    const email = await this.prompt.ask('Enter user email')
    const password = await this.prompt.secure('Enter user password', {
      validate: (value) => {
        if (value.length < 8) {
          return 'Password must be at least 8 characters long'
        }
        return true
      },
    })
    const role = await this.prompt.choice(
      'Enter user role (admin, staff, user)',
      ['admin', 'staff', 'user'],
      {
        default: 'user',
      }
    )

    const trx = await db.transaction()

    try {
      const user = await User.create(
        {
          name,
          surname,
          email,
          password,
          role,
        },
        { client: trx }
      )

      await trx.commit()
      this.logger.success(`User created successfully: ${user.email}`)
    } catch (error) {
      await trx.rollback()

      this.logger.error('Failed to create user')
    }

    this.logger.info('User creation process completed.')
  }
}
