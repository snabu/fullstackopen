import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            countries : [],
            filter: ''
        }

        this.handleFilterChange = this.handleFilterChange.bind(this)

    }

    componentWillMount() {
        console.log('componentWillMount')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('response received')
                this.setState({ countries: response.data })
            })
    }
    handleFilterChange = (event) => {
        const handler = (event) =>{
            console.log("in handleFilterChange")
            this.setState({filter: event.target.value})
        }
        return handler
    }

    render() {
        return (
            <div>
                <Filter handler = {this.handleFilterChange} filter = {this.state.filter}/>
                <Countries countries = {this.state.countries} filter = {this.state.filter}/>
            </div>
        )
    }


}

const Countries  = ({countries, filter}) => {
    const filteredCountries = [...countries.filter(country => (country.name.toLowerCase().includes(filter)))]
    console.log("number of filtered countries ", filteredCountries.length)
    return (
        filteredCountries.length > 10 ? <p>too many matches, specify another filter</p> :
            filteredCountries.length === 1 ? <Country country ={filteredCountries[0]}/> : <CountryList countries = {filteredCountries}/>
    )
}

const CountryList = ({countries}) => {
    return (
        countries.map(country => <p>{country.name}</p>)
    )
}

const Country = ({country}) => {
    console.log('Country is ', country)
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <img src = {country.flag} height="110" width="180" alt = "flag of {country.name}"/>
        </div>
    )
}

const Filter = ({filter, handler}) => {
    return (
        <div>
            find countries <input
            onChange={handler()}
            value={filter}
        />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
