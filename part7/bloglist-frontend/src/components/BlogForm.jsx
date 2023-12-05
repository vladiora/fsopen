import Togglable from './Togglable'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/blogReducer'

const BlogForm = () => {
	const blogFormRef = useRef()
	const dispatch = useDispatch()

	const addBlog = (event) => {
		event.preventDefault()

		const newBlog = {
			title: event.target.title.value,
			author: event.target.author.value,
			url: event.target.url.value,
		}

		blogFormRef.current.toggleVisibility()

		dispatch(createNew(newBlog))
	}

	return (
		<div>
			<Togglable buttonLabel="create new blog" ref={blogFormRef}>
				<h2>create new</h2>
				<form onSubmit={addBlog}>
					<div>
						title:
						<input type="text" name="title" />
					</div>
					<div>
						author:
						<input type="text" name="author" />
					</div>
					<div>
						url:
						<input type="text" name="url" />
					</div>
					<button id="create-button" type="submit">
						create
					</button>
				</form>
			</Togglable>
		</div>
	)
}

export default BlogForm
