import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserRoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, roles: string[]) {
    /**
     * Middleware logic goes here (before the next call)
     */
    // console.log(ctx)

    /**
     * Call next method in the pipeline and return its output
     */
    if (!roles.includes('admin')) {
      roles.push('admin')
    }

    const user = ctx.auth.user

    if (!user || !roles.includes(user.role)) {
      return ctx.response.unauthorized('Unauthorized access')
    }

    const output = await next()
    return output
  }
}
