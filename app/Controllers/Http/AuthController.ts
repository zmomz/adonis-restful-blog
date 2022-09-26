import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RegistersController {

    public async register({request,response}:HttpContextContract){
        const validations = await schema.create({
            email:schema.string({},[
                rules.email(),
                rules.unique({table:'users', column:'email'})
            ]),
            password:schema.string({},[
                rules.confirmed()
            ])
        })
        const data = await request.validate({schema:validations})
        const user = await User.create(data)
        return response.created(user)
    }

    public async login({request, auth}:HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        const token = await auth.attempt(email, password)

        return token.toJSON()
    }
}
