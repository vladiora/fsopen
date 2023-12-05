import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createNew, initialStateBlogs, likeBlog, remove } from './reducers/blogReducer'

const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const dispatch = useDispatch()

	const blogList = useSelector(({ blogs }) => {
		return blogs
	})

	const blogFormRef = useRef()

	useEffect(() => {
		dispatch(initialStateBlogs())
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

		dispatch(createNew(newBlog))
	}

	const addLike = (updatedBlog) => {
		console.log(updatedBlog)
		dispatch(likeBlog(updatedBlog))
	}

	const removeBlog = (id) => {
		dispatch(remove(id))
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

			{blogList
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
