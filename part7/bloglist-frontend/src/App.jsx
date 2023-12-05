import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initialStateBlogs, likeBlog, remove } from './reducers/blogReducer'
import { initialStateUser, logout } from './reducers/userReducer'

const App = () => {
	const dispatch = useDispatch()

	const blogList = useSelector(({ blogs }) => {
		return blogs
	})

	const activeUser = useSelector(({ user }) => {
		return user
	})

	useEffect(() => {
		dispatch(initialStateBlogs())
	}, [])

	useEffect(() => {
		dispatch(initialStateUser())
	}, [])

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
	)
}

export default App
