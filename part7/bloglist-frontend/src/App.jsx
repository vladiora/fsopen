import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const dispatch = useDispatch()

	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then((returnedBlogs) => setBlogs(returnedBlogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

		if (loggedUserJSON) {
			const loggedUser = JSON.parse(loggedUserJSON)

			setUser(loggedUser)
			blogService.setToken(loggedUser.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const loggedUser = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem(
				'loggedBlogAppUser',
				JSON.stringify(loggedUser)
			)

			setUser(loggedUser)
			blogService.setToken(loggedUser.token)

			setUsername('')
			setPassword('')
		} catch (exception) {

			dispatch(setNotification(
				{
					notif: 'wrong username or password',
					style: 'error',
				},
				5
			))
		}
	}

	const onLogout = function () {
		window.localStorage.removeItem('loggedBlogAppUser')
		setUser(null)
	}

	const createBlog = (newBlog) => {
		blogFormRef.current.toggleVisibility()

		blogService
			.create(newBlog)
			.then((returnedBlog) => {

				setBlogs(blogs.concat(returnedBlog))

				dispatch(setNotification(
					{
						notif: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
						style: 'success',
					},
					5
				))
			})
			.catch((error) => {

				dispatch(setNotification(
					{
						notif: error.response.data.error,
						style: 'error',
					},
					5
				))
			})
	}

	const addLike = (updatedBlog) => {
		blogService
			.update(updatedBlog.id, updatedBlog)
			.then((returnedBlog) => {
				setBlogs(
					blogs.map((b) =>
						b.id !== updatedBlog.id
							? b
							: { ...b, likes: returnedBlog.likes }
					)
				)
			})
			.catch((error) => {

				dispatch(setNotification(
					{
						notif: error.response.data.error,
						style: 'error',
					},
					5
				))

				setBlogs(blogs.filter((b) => b.id !== updatedBlog.id))
			})
	}

	const removeBlog = (id) => {
		blogService
			.remove(id)
			.then(() => setBlogs(blogs.filter((b) => b.id !== id)))
			.catch((error) => {
				dispatch(setNotification(
					{
						notif: error.response.data.error,
						style: 'error',
					},
					5
				))

				setBlogs(blogs.filter((b) => b.id !== id))
			})
	}

	if (user === null)
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification />
				<LoginForm
					username={username}
					password={password}
					handleLogin={handleLogin}
					setUsername={setUsername}
					setPassword={setPassword}
				/>
			</div>
		)

	return (
		<div>
			<h2>blogs</h2>
			<Notification />
			<p>
				{user.name} logged in<button onClick={onLogout}>logout</button>
			</p>

			<Togglable buttonLabel="create new blog" ref={blogFormRef}>
				<BlogForm createBlog={createBlog} />
			</Togglable>

			{blogs
				.toSorted((a, b) => b.likes - a.likes)
				.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						addLikes={addLike}
						removeBlog={removeBlog}
					/>
				))}
		</div>
	)
}

export default App
