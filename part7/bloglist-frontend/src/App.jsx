import { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initialStateBlogs } from './reducers/blogReducer'
import { initialStateUser } from './reducers/userReducer'
import Users from './components/Users'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import User from './components/User'
import Menu from './components/Menu'
import Blogs from './components/Blogs'

const App = () => {
	const dispatch = useDispatch()

	const blogList = useSelector(({ blogs }) => {
		return blogs
	})

	const usersList = useSelector(({ users }) => {
		return users
	})

	useEffect(() => {
		dispatch(initialStateBlogs())
	}, [])

	useEffect(() => {
		dispatch(initialStateUser())
	}, [])

	const matchUser = useMatch('/users/:id')
	const matchBlog = useMatch('/blogs/:id')

	const userRoute = matchUser
		? usersList.find((u) => u.id === matchUser.params.id)
		: null
	const blogRoute = matchBlog
		? blogList.find((b) => b.id === matchBlog.params.id)
		: null

	return (
		<div className="container">
			<Menu />
			<Notification />

			<Routes>
				<Route path="/blogs/:id" element={<Blog blog={blogRoute} />} />
				<Route path="/users/:id" element={<User user={userRoute} />} />
				<Route
					path="/"
					element={
						<div>
							<h2>Blogs</h2>
							<BlogForm />
							<Blogs />
						</div>
					}
				/>
				<Route path="/users" element={<Users />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</div>
	)
}

export default App
