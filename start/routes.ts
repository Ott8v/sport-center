/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
const CoursesController = () => import('#controllers/courses_controller')

router.post('login', '#controllers/auth_controller.login')
router.post('register', '#controllers/auth_controller.register')

router.resource('courses', CoursesController).only(['index', 'show'])
router.resource('courses.users', CoursesController).only(['index', 'show'])

router.group(() => {
  router.resource('users', UsersController).only(['index', 'show'])
})
