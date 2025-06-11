import Course from '#models/course'
import CoursePolicy from '#policies/course_policy'
import type { HttpContext } from '@adonisjs/core/http'

export default class CoursesController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const notFull = request.qs().notFull
    if (notFull) {
      return await Course.query()
        .where('isFull', false)
        .preload('instructor')
        .orderBy('createdAt', 'desc')
    } else {
      return await Course.query().preload('instructor').orderBy('createdAt', 'desc')
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const id = auth.user?.id
    const data = request.body()
    const course = await Course.create({ ...data, intructorId: id })
    return course
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const course = await Course.query().where('id', params.id).preload('instructor').firstOrFail()
    return course
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    const course = await Course.findOrFail(params.id)
    if (await bouncer.with(CoursePolicy).denies('update', course)) {
      return response.forbidden('You do not have permission to update this course.')
    }
    const data = request.body()
    course.merge(data)
    await course.save()
    return course
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    const course = await Course.findOrFail(params.id)
    if (await bouncer.with(CoursePolicy).denies('delete', course)) {
      return response.forbidden('You do not have permission to delete this course.')
    }
    await course.delete()
    return { message: 'Course deleted successfully' }
  }

  async getCourseByInstrtuctorId({ params }: HttpContext) {
    const courses = await Course.query()
      .where('intructorId', params.id)
      .preload('instructor')
      .orderBy('createdAt', 'desc')

    if (courses.length === 0) {
      return { message: 'No courses found for this instructor.' }
    }
    return courses
  }
}
