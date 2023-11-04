import { useState } from 'react'

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

	const names = [
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	];

	const [persons, setPersons] = useState(names)
	const [newPerson, setNewPerson] = useState({name: '', number: ''})
	const [filter, setFilter] = useState('');

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
