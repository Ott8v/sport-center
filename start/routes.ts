/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('#controllers/users_controller')
const CoursesController = () => import('#controllers/courses_controller')
const BooKingsController = () => import('#controllers/bookings_controller')

router.post('login', '#controllers/auth_controller.login')
router.post('register', '#controllers/auth_controller.register')

router
  .group(() => {
    router.resource('bookings', BooKingsController).only(['store'])
    router
      .group(() => {
        router.get('users/:instructorId/courses', [CoursesController, 'getCourseByInstrtuctorId'])
        router.get('users/bookings', [BooKingsController, 'getBookingsCountForUsers'])
        router.resource('users', UsersController).apiOnly()
        router.resource('courses', CoursesController).apiOnly()
        router
          .resource('bookings', BooKingsController)
          .apiOnly()
          .only(['index', 'show', 'update', 'destroy'])
      })
      .use(middleware.userRole(['staff']))
  })
  .use([middleware.auth()])
