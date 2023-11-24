const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const User = require('../models/user')

const getTokenFrom = request => {

	const authorization = request.get('authorization')

	if (authorization && authorization.startsWith('Bearer '))
	  	return authorization.replace('Bearer ', '')

	return null
}

blogsRouter.get('/', async (request, response) => {

	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

	const body = request.body

	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken.id)
	  	return response.status(401).json({ error: 'token invalid' })

	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		user: user._id,
		likes: body.likes
	})

	const returnedObject = await blog.save()

	user.blogs = user.blogs.concat(returnedObject.id)
	await user.save()

	response.status(201).json(returnedObject)
})

module.exports = blogsRouter
