import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Menu = () => {

	const dispatch = useDispatch()

	const activeUser = useSelector(({ user }) => {
		return user
	})

	const linkStyle = {
	  paddingRight: 5,
	  color: '#0077cc',
	  textDecoration: 'none',
	  transition: 'color 0.3s ease',
	}

	return (
	  <div>
		<Link style={linkStyle} to="/">blogs</Link>
		<Link style={linkStyle} to="/users">users</Link>
			{activeUser.name} logged in
			<button
				onClick={() => {
					dispatch(logout())
				}}
			>
				logout
			</button>
	  </div>
	)
}

export default Menu