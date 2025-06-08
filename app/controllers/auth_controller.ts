import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')
    const user = await User.verifyCredentials(email, password)
    if (!user) {
      return response.unauthorized('Invalid credentials')
    }
    const token = await User.accessTokens.create(user)
    return { user, token }
  }

  async register({ request, response }: HttpContext) {
    const { email, password, name, surname } = request.all()
    try {
      const user = await User.create({
        email,
        password,
        name,
        surname,
      })
      const token = await User.accessTokens.create(user)
      return { user, token }
    } catch (error) {
      return response.badRequest('Registration failed')
    }
  }
}
