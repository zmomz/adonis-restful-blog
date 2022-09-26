import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Blog from "App/Models/Blog";

export default class BlogsController {
    public async index(){
        const blogs = await Blog.all()
        return blogs.map(blog => blog.serialize({fields:['id','title','cover']}))
    }

    public async store({request, response}:HttpContextContract){
        Blog.create({title:request.input('title'),
                     status:request.input('status'),
                     text:request.input('text'),
                     cover:request.input('cover')})
                     return response.created({'created':true})
    }

    public async update({request, response, params}:HttpContextContract){
        const blog = await Blog.findOrFail(params.id)
        blog.title = request.input('title')
        blog.status = request.input('status')
        blog.text = request.input('text')
        blog.cover = request.input('cover')
        blog.save()
        return response.status(202).send(blog)
    }
}
