import { useDispatch } from 'react-redux'
import { addNewComment, likeBlog, remove } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
	if (!blog) return null

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const addLike = () => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id,
		}
		dispatch(likeBlog(updatedBlog))
	}

	const onRemove = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(remove(blog.id))
			navigate('/')
		}
	}

	const canRemove =
		JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).name ===
		blog.user.name

	const removeBtn = () => (
		<div>
			<button className="red-button" onClick={onRemove}>
				Remove blog
			</button>
		</div>
	)

	const addComment = (event) => {
		event.preventDefault()

		dispatch(addNewComment(blog.id, event.target.comment.value))
	}

	return (
		<div>
			<h1>{blog.title}</h1>
			<a href={blog.url}>{blog.url}</a>
			<p>
				likes {blog.likes}{' '}
				<button className="like-button" onClick={addLike}>
					like
				</button>{' '}
			</p>
			<p>added by {blog.user.name}</p>

			<h3>comments</h3>
			<form onSubmit={addComment}>
				<input type="text" name="comment" />
				<button type="submit">add comment</button>
			</form>

			<ul>
				{blog.comments.map((comment, index) => (
					<li key={index}>{comment}</li>
				))}
			</ul>

			{canRemove && removeBtn()}
		</div>
	)
}

export default Blog
