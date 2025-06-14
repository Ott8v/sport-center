import Course from '#models/course'
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
  async store({ request, auth, response }: HttpContext) {
    const id = auth.user?.id
    const data = request.body()
    const bookingExists = await Booking.findBy({ courseId: data.courseId, userId: id })
    if (bookingExists) {
      return response.status(400).json({ message: 'Booking already exists for this course' })
    }

    const course = await Course.findOrFail(data.courseId)
    if (course.isFull) {
      return response.status(400).json({ message: 'Course is full' })
    }

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
  async update({ params, request, response }: HttpContext) {
    const id = params.id
    const booking = await Booking.findOrFail(id)
    const data = request.body()
    const course = await Course.findOrFail(booking.courseId)
    if (course.isFull && data.status === 'confirmed') {
      response.badRequest('Course is full')
    }
    booking.status = data.status
    await booking.save()
    const coursePopulate = await Course.query()
      .where('id', booking.courseId)
      .preload('bookings', (bookingsQuery) => {
        bookingsQuery.where('status', 'confirmed')
      })
    console.log(coursePopulate[0].bookings)
    if (coursePopulate[0].bookings.length === coursePopulate[0].maxParticipants) {
      course.isFull = true
      await course.save()
    } else {
      course.isFull = false
      await course.save()
    }

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
