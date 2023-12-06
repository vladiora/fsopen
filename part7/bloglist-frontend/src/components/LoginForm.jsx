import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			dispatch(
				loginUser(
					event.target.username.value,
					event.target.password.value
				)
			)
			navigate('/')
		} catch (exception) {
			dispatch(
				setNotification(
					{
						notif: 'wrong username or password',
						style: 'error',
					},
					5
				)
			)
		}
	}

	return (
		<Container
			className="mt-5"
			style={{
				backgroundColor: '#f0f0f0',
				padding: '20px',
				borderRadius: '8px',
				maxWidth: '300px',
			}}
		>
			<h2>Log in to application</h2>
			<Form onSubmit={handleLogin}>
				<Form.Group>
					<Form.Label>username:</Form.Label>
					<Form.Control
						type="text"
						name="username"
						className="small-input"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>password:</Form.Label>
					<Form.Control
						type="password"
						name="password"
						className="small-input"
					/>
				</Form.Group>

				<div className="mt-3">
					<Button variant="primary" type="submit">
						login
					</Button>
				</div>
			</Form>
		</Container>
	)
}

export default LoginForm
