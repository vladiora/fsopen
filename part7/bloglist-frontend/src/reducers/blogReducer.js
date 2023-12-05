import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		createBlog(state, action) {
			state.push(action.payload)
		},

		setBlogs(state, action) {
			return action.payload
		},

		updateBlog(state, action) {
			const changedBlog = action.payload

			return state.map((blog) =>
				blog.id !== changedBlog.id ? blog : changedBlog
			)
		},

		removeBlog(state, action) {
			const id = action.payload

			return state.filter((b) => b.id !== id)
		},
	},
})

export const { createBlog, setBlogs, updateBlog, removeBlog } =
	blogSlice.actions

export const initialStateBlogs = () => {
	return (dispatch) => {
		blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
	}
}

export const createNew = (newBlog) => {
	return (dispatch) => {
		blogService
			.create(newBlog)
			.then((returnedBlog) => {
				dispatch(createBlog(returnedBlog))

				dispatch(
					setNotification(
						{
							notif: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
							style: 'success',
						},
						5
					)
				)
			})
			.catch((error) => {
				dispatch(
					setNotification(
						{
							notif: error.response.data.error,
							style: 'error',
						},
						5
					)
				)
			})
	}
}

export const likeBlog = (updatedBlog) => {
	return (dispatch) => {
		blogService
			.update(updatedBlog.id, updatedBlog)
			.then((returnedBlog) => {
				dispatch(updateBlog(returnedBlog))
			})
			.catch((error) => {
				dispatch(
					setNotification(
						{
							notif: error.response.data.error,
							style: 'error',
						},
						5
					)
				)

				dispatch(removeBlog(updateBlog.id))
			})
	}
}

export const remove = (id) => {
	return (dispatch) => {
		blogService
			.remove(id)
			.then(() => dispatch(removeBlog(id)))
			.catch((error) => {
				dispatch(
					setNotification(
						{
							notif: error.response.data.error,
							style: 'error',
						},
						5
					)
				)

				dispatch(removeBlog(id))
			})
	}
}

export default blogSlice.reducer
