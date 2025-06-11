import Booking from '#models/booking'
import type { HttpContext } from '@adonisjs/core/http'

export default class BookingsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const status = request.qs().status
    if (status) {
      return await Booking.query()
        .where('status', status)
        .preload('user')
        .preload('course')
        .orderBy('createdAt', 'desc')
    }

    const bookings = await Booking.query()
      .preload('user')
      .preload('course')
      .orderBy('createdAt', 'desc')

    return bookings
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const id = auth.user?.id
    const data = request.body()
    const newBooking = await Booking.create({ ...data, userId: id })
    return newBooking
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const booking = await Booking.query()
      .where('id', params.id)
      .preload('user')
      .preload('course')
      .firstOrFail()

    return booking
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const booking = await Booking.findOrFail(params.id)
    const data = request.body()
    booking.merge(data)
    await booking.save()
    return booking
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const booking = await Booking.findOrFail(params.id)
    await booking.delete()
    return { message: 'Booking deleted successfully' }
  }

  async getBookingsCountForUsers({}: HttpContext) {
    const bookingsCount = await Booking.query()
      .select('userId')
      .count('* as bookingsCount')
      .groupBy('userId')

    return bookingsCount.map((result) => ({
      userId: result.userId,
      bookingsCount: Number(result.$extras.bookingsCount),
    }))
  }
}
