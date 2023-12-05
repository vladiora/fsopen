import { createSlice } from "@reduxjs/toolkit"
import usersService from '../services/users'

const userSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload
		},
	},
})

export const { setUsers } =
	userSlice.actions

export const initialStateUsers = () => {
	return (dispatch) => {
		usersService.getAll().then((users) => dispatch(setUsers(users)))
	}
}

export default userSlice.reducer
