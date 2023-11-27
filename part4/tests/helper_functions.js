const User = require('../models/user')
const Blog = require('../models/blog')

const bcrypt = require('bcrypt')

const initialBlogs = [
    {
		title: "The Pragmatic Engineer",
		author: "Gergely Orosz",
		url: "https://newsletter.pragmaticengineer.com/",
		likes: 10
	}
]

const testUser = { username: 'hellas', password: 'newPass123' }

const blogsInDb = async () => {

	const blogs = await Blog.find({})
	return blogs.map(u => u.toJSON())
}

const usersInDb = async () => {

	const users = await User.find({})
	return users.map(u => u.toJSON())
}

const createTestUser = async () => {

	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('newPass123', 10)
	const user = new User({ username: 'hellas', name: 'Arto Hellas', passwordHash })

	await user.save()
}

module.exports = {
	initialBlogs,
	testUser,
	usersInDb,
	blogsInDb,
	createTestUser
}
