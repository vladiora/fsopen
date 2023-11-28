const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {

	const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })

	if (blog)
		response.json(blog)
	else
		response.status(404).end()
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

	const body = request.body
	const user = request.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		user: user._id,
		likes: body.likes ?? 0
	})

	const returnedObject = await blog.save()

	user.blogs = user.blogs.concat(returnedObject.id)
	await user.save()

	returnedObject.user = user

	response.status(201).json(returnedObject)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

	const user = request.user
	const blog = await Blog.findById(request.params.id)

	if (blog.user.toString() !== user._id.toString())
		return response.status(400).json({ error: 'Blog can be deleted only by the user who added the blog.' })

	await Blog.findByIdAndDelete(request.params.id)

	const index = user.blogs.indexOf(request.params.id);
	user.blogs.splice(index, 1)
	await user.save()

  	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

	const { title, author, user, url, likes } = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, user, likes }, { new: true, runValidators: true, context: 'query' })

	response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
