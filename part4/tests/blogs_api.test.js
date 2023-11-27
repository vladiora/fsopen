const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./helper_functions')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('tests for blogs', () => {

	beforeEach(async () => {

        await Blog.deleteMany({})

		await helper.createTestUser()

        for (const blog of helper.initialBlogs) {

            const blogObject = new Blog(blog)
            await blogObject.save()
        }
    })

	test('blog list application returns the correct amount of JSON blog posts', async () => {

        const result = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

		expect(result.body).toHaveLength(helper.initialBlogs.length)
	})

	test('blog has an valid id field', async () => {

		const blogsInDb = await helper.blogsInDb()

        const result = await api.get(`/api/blogs/${blogsInDb[0].id}`).expect(200).expect('Content-Type', /application\/json/)

		expect(result.id).toBeDefined()
	})

	test('HTTP POST request successfully creates a new blog post', async () => {

		const blogsInDb = await helper.blogsInDb()

		const newBlog = {
			title: 'Byte Byte Go',
			author: 'Alex Xu',
			url: 'https://blog.bytebytego.com/',
			likes: 10
		}

		const loginResult = await api.post('/api/login').send(helper.testUser)

		await api
			.post('/api/blogs')
			.set('Authorization', 'Bearer ' + loginResult.token)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		// one blog is added
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsInDb.length + 1)

		// there is blog with a valid title in the end blog list
		const titles = blogsAtEnd.map(b => b.title)
		expect(titles).toContain(
			'Byte Byte Go'
		)

	})

	test('blog without likes has 0 likes', async () => {

		const blogsInDb = await helper.blogsInDb()

		const newBlog = {
			title: 'Blog without likes',
			author: 'Unknown',
			url: 'https://www.example.com/'
		}

		const loginResult = await api.post('/api/login').send(helper.testUser)

		await api
			.post('/api/blogs')
			.set('Authorization', 'Bearer ' + loginResult.token)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		// one blog is added
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsInDb.length + 1)

		// blog without likes has 0 likes
		for (const blog of blogsAtEnd) {
			if (blog.title === 'Blog without likes') {
				expect(blog.likes).toBe(0)
				break
			}
		}

	})

	test('title is missing', async () => {

		const blogsInDb = await helper.blogsInDb()

		const newUser = {
			author: 'Unknown',
			url: 'https://www.example.com/',
			likes: 5
		}

		const loginResult = await api.post('/api/login').send(helper.testUser)

		const result = await api
			.post('/api/blogs')
			.set('Authorization', 'Bearer ' + loginResult.body.token)
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		// expect correct error message
		expect(result.body.error).toContain('Blog validation failed: title: Path `title` is required.')

		// number of existing blogs should not change
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsInDb.length)

	})

	test('url is missing', async () => {

		const blogsInDb = await helper.blogsInDb()

		const newUser = {
			title: 'Some title',
			author: 'Unknown',
			likes: 5
		}

		const loginResult = await api.post('/api/login').send(helper.testUser)

		const result = await api
			.post('/api/blogs')
			.set('Authorization', 'Bearer ' + loginResult.body.token)
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		// expect correct error message
		expect(result.body.error).toContain('Blog validation failed: url: Path `url` is required.')

		// number of existing blogs should not change
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsInDb.length)

	})

})

afterAll(async () => {
	await mongoose.connection.close()
})