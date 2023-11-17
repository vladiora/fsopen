const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {

	test('of empty list is zero', () => {

		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})

	test('when list has only one blog equals the likes of that', () => {

		const result = listHelper.totalLikes([{
			_id: '5a422afgd4567fd4a71bfgf8',
			title: "The Pragmatic Engineer",
			author: "Gergely Orosz",
			url: "https://newsletter.pragmaticengineer.com/",
			likes: 10,
			__v: 0
		}])

		expect(result).toBe(10)
	})

	test('of a bigger list is calculated right', () => {

		const result = listHelper.totalLikes([
			{
				_id: '5a422afgd4567fd4a71bfgf8',
				title: "The Pragmatic Engineer",
				author: "Gergely Orosz",
				url: "https://newsletter.pragmaticengineer.com/",
				likes: 10,
				__v: 0
			},
			{
				_id: '4dsf546df71b54a676fds4d6f',
				title: "Some title",
				author: "New author",
				url: "url",
				likes: 5,
				__v: 0
			}, {
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 8,
				__v: 0
			}
		])

		expect(result).toBe(23)
	})

})

describe('favorite blog', () => {

	test('of empty list is empty object', () => {

		const result = listHelper.favoriteBlog([])
		expect(result).toEqual({})
	})

	test('when list has only one blog equals that blog', () => {

		const result = listHelper.favoriteBlog([{
			_id: '5a422afgd4567fd4a71bfgf8',
			title: "The Pragmatic Engineer",
			author: "Gergely Orosz",
			url: "https://newsletter.pragmaticengineer.com/",
			likes: 10,
			__v: 0
		}])

		expect(result).toEqual({title: "The Pragmatic Engineer", author: "Gergely Orosz", likes: 10})
	})

	test('of a bigger list retunrs one with most likes', () => {

		const result = listHelper.favoriteBlog([
			{
				_id: '5a422afgd4567fd4a71bfgf8',
				title: "The Pragmatic Engineer",
				author: "Gergely Orosz",
				url: "https://newsletter.pragmaticengineer.com/",
				likes: 10,
				__v: 0
			},
			{
				_id: '4dsf546df71b54a676fds4d6f',
				title: "Some title",
				author: "New author",
				url: "url",
				likes: 5,
				__v: 0
			}, {
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 18,
				__v: 0
			}
		])

		expect(result).toEqual({title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 18})
	})

})

describe('most blogs', () => {

	test('of empty list is empty object', () => {

		const result = listHelper.mostBlogs([])
		expect(result).toEqual({})
	})

	test('when list has only one blog equals that blog', () => {

		const result = listHelper.mostBlogs([{
			_id: '5a422afgd4567fd4a71bfgf8',
			title: "The Pragmatic Engineer",
			author: "Gergely Orosz",
			url: "https://newsletter.pragmaticengineer.com/",
			likes: 10,
			__v: 0
		}])

		expect(result).toEqual({author: "Gergely Orosz", blogs: 1})
	})

	test('of a bigger list returns one with most blogs', () => {

		const result = listHelper.mostBlogs([
			{
				_id: '5a422afgd4567fd4a71bfgf8',
				title: "The Pragmatic Engineer",
				author: "Gergely Orosz",
				url: "https://newsletter.pragmaticengineer.com/",
				likes: 10,
				__v: 0
			},
			{
				_id: '4dsf546df71b54a676fds4d6f',
				title: "Some title",
				author: 'Edsger W. Dijkstra',
				url: "url",
				likes: 5,
				__v: 0
			}, {
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 18,
				__v: 0
			}
		])

		expect(result).toEqual({author: "Edsger W. Dijkstra", blogs: 2})
	})

})

describe('most likes', () => {

	test('of empty list is empty object', () => {

		const result = listHelper.mostLikes([])
		expect(result).toEqual({})
	})

	test('when list has only one blog equals that blog', () => {

		const result = listHelper.mostLikes([{
			_id: '5a422afgd4567fd4a71bfgf8',
			title: "The Pragmatic Engineer",
			author: "Gergely Orosz",
			url: "https://newsletter.pragmaticengineer.com/",
			likes: 10,
			__v: 0
		}])

		expect(result).toEqual({author: "Gergely Orosz", likes: 10})
	})

	test('of a bigger list returns one with most likes (more blogs - more likes)', () => {

		const result = listHelper.mostLikes([
			{
				_id: '5a422afgd4567fd4a71bfgf8',
				title: "The Pragmatic Engineer",
				author: "Gergely Orosz",
				url: "https://newsletter.pragmaticengineer.com/",
				likes: 10,
				__v: 0
			},
			{
				_id: '4dsf546df71b54a676fds4d6f',
				title: "Some title",
				author: 'Edsger W. Dijkstra',
				url: "url",
				likes: 5,
				__v: 0
			}, {
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 18,
				__v: 0
			}
		])

		expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 23})
	})

	test('of a bigger list returns one with most likes (less blogs - more likes)', () => {

		const result = listHelper.mostLikes([
			{
				_id: '5a422afgd4567fd4a71bfgf8',
				title: "The Pragmatic Engineer",
				author: "Gergely Orosz",
				url: "https://newsletter.pragmaticengineer.com/",
				likes: 10,
				__v: 0
			},
			{
				_id: '4dsf546df71b54a676fds4d6f',
				title: "Some title",
				author: "Gergely Orosz",
				url: "url",
				likes: 5,
				__v: 0
			}, {
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 18,
				__v: 0
			}
		])

		expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 18})
	})

	test('of a bigger list with same amount of likes - returns first', () => {

		const result = listHelper.mostLikes([
			{
				_id: '5a422afgd4567fd4a71bfgf8',
				title: "The Pragmatic Engineer",
				author: "Gergely Orosz",
				url: "https://newsletter.pragmaticengineer.com/",
				likes: 10,
				__v: 0
			},
			{
				_id: '4dsf546df71b54a676fds4d6f',
				title: "Some title",
				author: "Gergely Orosz",
				url: "url",
				likes: 8,
				__v: 0
			}, {
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 18,
				__v: 0
			}
		])

		expect(result).toEqual({author: "Gergely Orosz", likes: 18})
	})

})