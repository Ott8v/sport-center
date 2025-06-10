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
    router.resource('users', UsersController)
    router.resource('courses', CoursesController)
    router.resource('bookings', BooKingsController)
  })
  .use([middleware.auth(), middleware.userRole(['staff'])])
