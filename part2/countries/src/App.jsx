import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Filter = ( props ) => {

	return (
		<div>find countries: <input value={props.filter} onChange={props.onChangeFilter}/></div>
	)
}

const List = ({ list, showCountry }) => {

	if (!list)
		return null

	if (list.length > 10)
		return (<p>
			Too many matches, specify another filter
		</p>)
	else
		return (list.map(country => <div key={country.name.common}> {country.name.common} <button onClick={() => {showCountry(country.name.common)}}>show</button> </div>))

}

const Country = ({ country }) => {

	if (!country)
		return null

	return (
		<div>

			<h1>{country.name.common}</h1>

			<p>capital {country.capital}</p>
			<p>area {country.area}</p>

			<p><b>languages:</b></p>
			<ul>{Object.entries(country.languages).map(lang => <li key={lang[0]}>{lang[1]}</li>)}</ul>

			<img src={country.flags.png} alt="Country flag"/>

		</div>
	)
}

function App () {

	const [countries, setCountries] = useState([])
	const [list, setList] = useState(null)
	const [country, setCountry] = useState(null)
	let filter;

	const hook = () => {
		countriesService
			.getAll()
			.then(initialCountries => {
				setCountries(initialCountries)
			})
	}

	useEffect(hook, [])

	const onChangeFilter = function (event) {

		filter = event.target.value;

		const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()));

		if (countriesToShow.length === 1) {

			countriesService.getCountry(countriesToShow[0].name.common).then(returnedCountry => {
				setCountry(returnedCountry)
			})

			setList(null)

		} else {
			setCountry(null)
			setList(countriesToShow)
		}

	}

	const showCountry = function (countryName) {

		countriesService.getCountry(countryName).then(returnedCountry => {
			setCountry(returnedCountry)

			setList(null)
		})
	}

	return (
		<div>
			<Filter filter={filter} onChangeFilter={onChangeFilter} />

			<List list={list} showCountry={showCountry}/>

			<Country country={country}/>
		</div>
	)
}

export default App
