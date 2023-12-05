import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
	name: 'user',
	initialState: '',
	reducers: {
		setUser(state, action) {
			return action.payload
		},

		removeUser() {
			return ''
		},
	},
})

export const { setUser, removeUser } = userSlice.actions

export const initialStateUser = () => {
	return (dispatch) => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

		if (loggedUserJSON) {
			const loggedUser = JSON.parse(loggedUserJSON)

			dispatch(setUser(loggedUser))
			blogService.setToken(loggedUser.token)
		}
	}
}

export const loginUser = (username, password) => {
	return async (dispatch) => {
		const loggedUser = await loginService.login({
			username,
			password,
		})

		window.localStorage.setItem(
			'loggedBlogAppUser',
			JSON.stringify(loggedUser)
		)

		dispatch(setUser(loggedUser))
		blogService.setToken(loggedUser.token)
	}
}

export const logout = () => {
	return (dispatch) => {
		window.localStorage.removeItem('loggedBlogAppUser')
		dispatch(removeUser())
	}
}

export default userSlice.reducer
