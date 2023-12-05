import { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initialStateBlogs, likeBlog, remove } from './reducers/blogReducer'
import { initialStateUser, logout } from './reducers/userReducer'
import Users from './components/Users'
import { Route, Routes, useMatch } from 'react-router-dom'
import User from './components/User'

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

	const match = useMatch('/users/:id')

  	const userRoute = match ? usersList.find(u => u.id === match.params.id) : null

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
			<h2>blogs</h2>
			<Notification />
			<p>
				{activeUser.name} logged in
				<button
					onClick={() => {
						dispatch(logout())
					}}
				>
					logout
				</button>
			</p>

			<Routes>
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
									addLikes={(updatedBlog) => {
										dispatch(likeBlog(updatedBlog))
									}}
									removeBlog={(id) => {
										dispatch(remove(id))
									}}
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
