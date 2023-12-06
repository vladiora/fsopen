const User = ({ user }) => {
	if (!user) return null

	return (
		<div>
			<h1>{user.name}</h1>
			<h2>Added blogs</h2>
			<ul>
				{user.blogs.map((blog, index) => (
					<li key={index}>{blog.title}</li>
				))}
			</ul>
		</div>
	)
}

export default User
