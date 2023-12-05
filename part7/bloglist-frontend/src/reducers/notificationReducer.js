import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		createNotification(state, action) {
			return action.payload
		},

		clearNotification() {
			return ''
		},
	},
})

export const { createNotification, clearNotification } =
	notificationSlice.actions

export const setNotification = (content, timeout) => {
	return (dispatch) => {
		dispatch(createNotification(content))

		setTimeout(() => {
			dispatch(clearNotification())
		}, timeout * 1000)
	}
}

export default notificationSlice.reducer
