const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./helper_functions')
const app = require('../app')
const api = supertest(app)

describe('ensure invalid users are not created', () => {

	beforeEach(async () => {
		await helper.createTestUser()
	})

	test('when creating user without username', async () => {

		const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'Matti Luukkainen',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

	})

	test('when creating user with short username', async () => {

		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'ma',
			name: 'Matti Luukkainen',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('User validation failed: username: Path `username` (`ma`) is shorter than the minimum allowed length (3).')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

	})

	test('when creating user with username that already exists', async () => {

		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'hellas',
			name: 'Matti Luukkainen',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('User validation failed: username: Error, expected `username` to be unique. Value: `hellas`')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

	})

	test('when creating user without password', async () => {

		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'matti',
			name: 'Matti Luukkainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('Password is required and it should be at least 3 characters long.')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

	})

	test('when creating user with short password', async () => {

		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'matti',
			name: 'Matti Luukkainen',
			password: 'no'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('Password is required and it should be at least 3 characters long.')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

	})

})

afterAll(async () => {
	await mongoose.connection.close()
})
