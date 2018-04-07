import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    name: 'Arto Hellas',
                    id: '9557bbc7-e952-2ad0-2118-44aec6569877',
                    number: '09123456789'
                }
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }



    addPerson = (event) => {
        const guid = () => {
            const s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }

        event.preventDefault()
        console.log('addPerson')
        console.log(event.target)

        if (this.state.persons.filter(person => (person.name.toLowerCase() === this.state.newName.toLowerCase())).length > 0){
            console.log("nimi on jo luettelossa: ",this.state.newName)
            alert("Nimi on jo luettelossa")
            return
        }
        const newPerson = {name: this.state.newName, number: this.state.newNumber, id : guid()}
        const persons = this.state.persons.concat(newPerson)
        this.setState({persons, newName: '', newNumber: ''})
    }


    handleNameChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }


    handleNumberChange = (event) => {
        console.log(event.target.value)
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        console.log("handleFilterChange ", event.target.value)
        this.setState({filter: event.target.value})
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <div>
                    rajaa nätettäviä <input
                    onChange={this.handleFilterChange}
                    value={this.state.filter}
                    />
                </div>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi: <input
                        onChange={this.handleNameChange}
                        value = {this.state.newName}
                    />
                    <div>
                        numero: <input
                        onChange = {this.handleNumberChange}
                        value = {this.state.newNumber}
                        />
                    </div>
                    </div>
                    <div>
                        <button type="submit" disabled={!this.state.newName||!this.state.newNumber}>lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <Persons persons = {this.state.persons} filter ={this.state.filter}/>
            </div>
        )
    }
}


const Persons = ({persons, filter}) => {
    const filtered = [...persons.filter(person => (person.name.toLowerCase().startsWith(filter)))]
    return (filtered.length === 0 ? <p>ei nimiä</p> : filtered.map(person => <p key={person.id}>{person.name} {person.number}</p>))
}

export default App


ReactDOM.render(<App />, document.getElementById('root'));

