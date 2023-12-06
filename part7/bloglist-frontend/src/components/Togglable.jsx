import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div className="mb-3">
			<div style={hideWhenVisible}>
				<Button variant="secondary" onClick={toggleVisibility}>
					{props.buttonLabel}
				</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button variant="secondary" onClick={toggleVisibility}>
					cancel
				</Button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
