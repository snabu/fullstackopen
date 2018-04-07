import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas',
                id : '9557bbc7-e952-2ad0-2118-44aec6569877'}
            ],
            newName: ''
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
        const newPerson = {name: this.state.newName, id : guid()}
        const persons = this.state.persons.concat(newPerson)
        this.setState({persons, newName: ''})
    }


    handleNameChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi: <input
                        onChange={this.handleNameChange}
                    />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <Persons persons = {this.state.persons}/>
            </div>
        )
    }
}


const Persons = ({persons}) => {
    return (persons.map(person => <p key={person.id}>{person.name}</p>))
}

export default App


ReactDOM.render(<App />, document.getElementById('root'));

