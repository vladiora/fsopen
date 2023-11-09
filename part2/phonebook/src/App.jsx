import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ( props ) => {

	return (
		<div>filter shown with: <input value={props.filter} onChange={props.onChangeFilter}/></div>
	)
}

const PersonForm = (props) => {

	return (
		<form onSubmit={props.addPerson} >
		<div>
			name: <input
				value={props.personName}
				onChange={props.onChangeName}
			/>
		</div>
		<div>
			number: <input
				value={props.personNumber}
				onChange={props.onChangeNumber}
			/></div>
		<div>
			<button type="submit">add</button>
		</div>
		</form>
	)
}

const Persons = (props) => {

	return (
		<div>
			{props.personsToShow.map(person =>
				<p key={person.id}>{person.name} {person.number}</p>
			)}
		</div>
	)
}

const App = () => {

	const [persons, setPersons] = useState([])
	const [newPerson, setNewPerson] = useState({name: '', number: ''})
	const [filter, setFilter] = useState('');

	const hook = () => {

		const eventHandler = response => {
			setPersons(response.data)
		}

		const promise = axios.get('http://localhost:3001/persons')
		promise.then(eventHandler)
	}

	useEffect(hook, [])

	const addPerson = (event) => {

		event.preventDefault()

		if (persons.some(person => person.name === newPerson.name)) {

			alert(`${newName} is already added to phonebook`)
			return
		}

		setPersons(persons.concat(newPerson))
		setNewPerson({name: '', number: ''})
	}

	const onChangeName = function (event) {

		const newNumber = newPerson.number
		setNewPerson({name: event.target.value, number: newNumber, id: persons.length + 1})
	}

	const onChangeNumber = function (event) {

		const newName = newPerson.name
		setNewPerson({name: newName, number: event.target.value, id: persons.length + 1})
	}

	const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

	return (
	<div>
		<h2>Phonebook</h2>
		<Filter filter={filter} onChangeFilter={() => {setFilter(event.target.value)}} />
		<h3>add a new</h3>
		<PersonForm addPerson={addPerson} personName={newPerson.name} onChangeName={onChangeName} personNumber={newPerson.number} onChangeNumber={onChangeNumber} />
		<h3>Numbers</h3>
		<Persons personsToShow={personsToShow} />
	</div>
	)
}

export default App
