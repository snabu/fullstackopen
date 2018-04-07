import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: Math.floor(Math.random() * anecdotes.length),
            points: []

        }
        console.log("constructor")
        for (let i = 0; i < anecdotes.length; i++)
            this.state.points.push({anectode : i, count : 0})
        console.log(this.state.points)
    }

    handleClick = () => {
        console.log("handleclick called")
        let random = 0;
        while ((random = Math.floor(Math.random() * anecdotes.length))===this.state.selected) {

        }
        this.setState({selected : random})
    }

    handleVoteClick = () => {
        const newPoints = [...this.state.points]
        newPoints[this.state.selected].count +=1
        console.log("Vote clicked, new points are ",newPoints)
        this.setState({points: newPoints})
    }

    render() {
        console.log("Rendering, points are ", this.state.points)
        return (

            <div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <Button handleClick= {this.handleClick} text={"random anecdote"}/>
                <Button handleClick= {this.handleVoteClick} text={"vote"}/>
            </div>
        )
    }
}


const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)