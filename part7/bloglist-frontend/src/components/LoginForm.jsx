import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
	const dispatch = useDispatch()

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			dispatch(
				loginUser(
					event.target.username.value,
					event.target.password.value
				)
			)
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
		<div>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input type="text" name="username" />
				</div>
				<div>
					password
					<input type="password" name="password" />
				</div>
				<button id="login-button" type="submit">
					login
				</button>
			</form>
		</div>
	)
}

export default LoginForm
