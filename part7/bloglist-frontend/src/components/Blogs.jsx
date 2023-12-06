import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blogs = () => {
	const blogList = useSelector(({ blogs }) => {
		return blogs
	})

	return (
		<Table striped>
			<tbody>
				{blogList
					.toSorted((a, b) => b.likes - a.likes)
					.map((blog) => (
						<tr key={blog.id}>
							<td>
								<Link to={`/blogs/${blog.id}`}>
									{blog.title}
								</Link>
							</td>
							<td>{blog.author}</td>
						</tr>
					))}
			</tbody>
		</Table>
	)
}

export default Blogs
