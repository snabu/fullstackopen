import React from 'react';
import ReactDOM from 'react-dom';
import personService from './services/persons';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }

        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.addPerson = this.addPerson.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
    }

    componentWillMount() {
        console.log('componentWillMount')
        personService.getAll()
            .then(response => {
                console.log('response received')
                this.setState({ persons: response.data })
            })
    }

    deleteHandler = (id) => {
        const handler = (event) => {
            console.log("deleteHandler, id is ", id)
            const persons = [...this.state.persons]
            let index = persons.findIndex(function(person, index) {
                return person.id === id
            }, id)
            const result = window.confirm("Poistetaanko " + persons[index].name + '?');
            if (result) {
                personService.remove(id)
                    .then(response => {
                        console.log('response received')
                        persons.splice(index, 1)
                        this.setState({persons, newName: '', newNumber: ''})
                    })
            }
        }
        return handler
    }

    addPerson = (event) => {
        const handler = (event) => {
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

            if (this.state.persons.filter(person => (person.name.toLowerCase() === this.state.newName.toLowerCase())).length > 0) {
                console.log("nimi on jo luettelossa: ", this.state.newName)
                alert("Nimi on jo luettelossa")
                return
            }
            const newPerson = {name: this.state.newName, number: this.state.newNumber, id: guid()}
            personService
                .create(newPerson)
                .then(response => {
                    const persons = this.state.persons.concat(newPerson)
                    this.setState({persons, newName: '', newNumber: ''})
                })
        }
        return handler
    }


    handleNameChange = (event) => {
        const handler = (event) => {
            console.log(event.target.value)
            this.setState({newName: event.target.value})
        }
        return handler
    }


    handleNumberChange = (event) => {
        const handler = (event) => {
            console.log(event.target.value)
            this.setState({newNumber: event.target.value})
        }
        return handler
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
                <h2>Puhelinluettelo</h2>
                <Filter handler = {this.handleFilterChange} filter = {this.state.filter}/>
                <AddPerson nameChangeHandler = {this.handleNameChange} numberChangeHandler = {this.handleNumberChange}
                           addPerson = {this.addPerson} newName = {this.state.newName} newNumber = {this.state.newNumber}/>
                <h2>Numerot</h2>
                <Persons persons = {this.state.persons} filter ={this.state.filter} deleteHandler = {this.deleteHandler}/>
            </div>
        )
    }
}

const AddPerson =({nameChangeHandler, numberChangeHandler, addPerson, newName, newNumber}) => {
    return(
        <form onSubmit={addPerson()}>
            <div>
                nimi: <input
                onChange={nameChangeHandler()}
                value = {newName}
            />
                <div>
                    numero: <input
                    onChange = {numberChangeHandler()}
                    value = {newNumber}
                />
                </div>
            </div>
            <div>
                <button type="submit" disabled={!newName||!newNumber}>lisää</button>
            </div>
        </form>
    )
}

const Filter = ({filter, handler}) => {
    return (
        <div>
            rajaa näytettäviä <input
            onChange={handler()}
            value={filter}
        />
        </div>
    )
}


const Persons = ({persons, filter, deleteHandler}) => {
    const filtered = [...persons.filter(person => (person.name.toLowerCase().includes(filter.toLowerCase())))]
    const personList =  filtered.length === 0 ? <tr><td>ei nimiä</td></tr> :

        filtered.map(person => (<tr key={person.id}>
                <td>{person.name} </td>
                <td>{person.number} </td>
                <td>
                    <button onClick={deleteHandler(person.id)}>Poista</button>
                </td>
            </tr>)
        )
    return (<table><tbody>{personList}</tbody></table>)

}

export default App


ReactDOM.render(<App />, document.getElementById('root'));

