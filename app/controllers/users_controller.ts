import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const noBookings = request.qs().noBookings
    if (noBookings) {
      return await User.query()
        .where('role', 'user')
        .whereDoesntHave('bookings', () => {})
        .orderBy('createdAt', 'desc')
    }
    return await User.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const user = await User.query().where('id', params.id).firstOrFail()
    return user
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = request.body()
    user.merge(data)
    await user.save()
    return user
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return { message: 'User deleted successfully' }
  }

  async getInstructorsWithCourses({}: HttpContext) {
    const user = await User.query()
      .where('role', 'staff')
      .preload('courses')
      .orderBy('createdAt', 'desc')
    return user
  }
}
