import { useSelector } from 'react-redux'

const Notification = () => {
	const { notif, style } = useSelector(({ notification }) => {
		return notification
	})

	if (notif) {
		return <div className={style}>{notif}</div>
	}
}

export default Notification
