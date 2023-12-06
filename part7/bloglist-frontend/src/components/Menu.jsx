import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { Navbar, Container, Nav, NavbarText } from 'react-bootstrap'

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

	if (!activeUser)
		return (
			<div>
				<Navbar bg="dark" variant="dark" expand="lg">
					<Container>
						<Nav className="ml-auto">
							<Nav.Link href="#" as="span">
								<Link style={linkStyle} to="/login">
									Login
								</Link>
							</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
			</div>
		)

	return (
		<div>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container>
					<Nav className="ml-auto">
						<Nav.Link href="#" as="span">
							<Link style={linkStyle} to="/">
								Blogs
							</Link>
						</Nav.Link>
						<Nav.Link href="#" as="span">
							<Link style={linkStyle} to="/users">
								Users
							</Link>
						</Nav.Link>
					</Nav>
					<NavbarText>
						<em>{activeUser.name} logged in</em>
					</NavbarText>
					<Nav className="ml-auto">
						<Nav.Link
							onClick={() => {
								dispatch(logout())
							}}
							href="#"
							as="span"
						>
							<Link style={linkStyle} to="/login">
								Logout
							</Link>
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</div>
	)
}

export default Menu
