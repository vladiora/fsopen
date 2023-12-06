import Togglable from './Togglable'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

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
			<Togglable buttonLabel="Create new blog" ref={blogFormRef}>
				<h2>Create new Blog</h2>
				<Form onSubmit={addBlog}>
					<Form.Group>
						<Form.Label>title:</Form.Label>
						<Form.Control
							type="text"
							name="title"
							className="medium-input"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>author:</Form.Label>
						<Form.Control
							type="text"
							name="author"
							className="medium-input"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>url:</Form.Label>
						<Form.Control
							type="text"
							name="url"
							className="medium-input"
						/>
					</Form.Group>

					<div className="mt-3">
						<Button variant="primary" type="submit">
							create
						</Button>
					</div>
				</Form>
			</Togglable>
		</div>
	)
}

export default BlogForm
