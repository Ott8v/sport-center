import User from '#models/user'
import Course from '#models/course'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CoursePolicy extends BasePolicy {
  update(user: User, course: Course): AuthorizerResponse {
    return user.id === course.instructorId || user.role === 'admin'
  }

  delete(user: User, course: Course): AuthorizerResponse {
    return user.id === course.instructorId || user.role === 'admin'
  }
}
