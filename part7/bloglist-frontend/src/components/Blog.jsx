import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, remove } from '../reducers/blogReducer'

const Blog = ({ blog, preview}) => {

	if (!blog)
		return null

	const dispatch = useDispatch()

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	if (preview)
		return (
			<div className="blog" style={blogStyle}>
				<Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
			</div>
		)

	const addLike = () => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id,
		}
		dispatch(likeBlog(updatedBlog))
	}

	const onRemove = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
			dispatch(remove(blog.id))
	}

	const canRemove =
		JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).name ===
		blog.user.name

	const removeBtn = () => (
		<div>
			<button className="red-button" onClick={onRemove}>
				remove
			</button>
		</div>
	)

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
			<p>{blog.user.name}</p>
			{canRemove && removeBtn()}
		</div>
	)
}

export default Blog
