import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { UserFactory } from '#database/factories/user_factory'

export default class RunFactory extends BaseCommand {
  static commandName = 'run:factory'
  static description = 'Run factory to create new users'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  async run() {
    const numberOfUsers = await this.prompt.ask('How many users do you want to create?', {
      validate: (value) => {
        const num = Number.parseInt(value)
        if (Number.isNaN(num) || num <= 0) {
          return 'Please enter a valid positive number greater than 0.'
        }
        return true
      },
    })

    this.logger.info(`Creating ${numberOfUsers} users...`)

    try {
      await UserFactory.createMany(Number(numberOfUsers))
      this.logger.success(`Successfully created ${numberOfUsers} users`)
    } catch (error) {
      this.logger.error(`Failed to create users: ${error.message}`)
      this.error(error)
    }
  }
}
