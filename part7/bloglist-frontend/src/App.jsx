import { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initialStateBlogs } from './reducers/blogReducer'
import { initialStateUser } from './reducers/userReducer'
import Users from './components/Users'
import { Route, Routes, useMatch } from 'react-router-dom'
import User from './components/User'
import Menu from './components/Menu'

const App = () => {
	const dispatch = useDispatch()

	const blogList = useSelector(({ blogs }) => {
		return blogs
	})

	const activeUser = useSelector(({ user }) => {
		return user
	})

	const usersList = useSelector(({ users }) => {return users})

	useEffect(() => {
		dispatch(initialStateBlogs())
	}, [])

	useEffect(() => {
		dispatch(initialStateUser())
	}, [])

	const matchUser = useMatch('/users/:id')
	const matchBlog = useMatch('/blogs/:id')

  	const userRoute = matchUser ? usersList.find(u => u.id === matchUser.params.id) : null
	const blogRoute = matchBlog ? blogList.find(b => b.id === matchBlog.params.id) : null

	if (!activeUser)
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification />
				<LoginForm />
			</div>
		)

	return (
		<div>
			<Menu />
			<h2>blogs</h2>
			<Notification />

			<Routes>
				<Route path='/blogs/:id' element={<Blog blog={blogRoute} />} />
				<Route path="/users/:id" element={<User user={userRoute} />} />
				<Route path='/' element={
					<div>
						<BlogForm />

						{blogList
							.toSorted((a, b) => b.likes - a.likes)
							.map((blog) => (
								<Blog
									key={blog.id}
									blog={blog}
									preview={true}
								/>
							))}
					</div>
				} />
				<Route path='/users' element={<Users />} />
			</Routes>
		</div>
	)
}

export default App
