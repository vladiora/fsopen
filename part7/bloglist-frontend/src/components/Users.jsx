import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialStateUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
	const dispatch = useDispatch()
	const usersList = useSelector(({ users }) => {
		return users
	})

	useEffect(() => {
		dispatch(initialStateUsers())
	}, [])

	return (
		<div>
			<h1>Users</h1>
			<Table striped>
				<thead>
					<tr>
						<th></th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>
					{usersList.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>
									{user.name}
								</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default Users
