import Header from './Header'
import Content from './Content'

const Course = (props) => {
	const { course } = props

	const count = course.parts.reduce((a, b) => a + b.exercises, 0)

	return (
	  <div>
		<Header key={course.id} course={course.name} />
		{course.parts.map(part =>
			<Content key={part.id} part={part} />
		)}
		<p><b>total of {count} exercises</b></p>
	  </div>
	)
}

export default Course