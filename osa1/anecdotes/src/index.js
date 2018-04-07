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
                <HasVotes count={this.state.points[this.state.selected].count}/>
                <Button handleClick= {this.handleClick} text={"random anecdote"}/>
                <Button handleClick= {this.handleVoteClick} text={"vote"}/>
                <MostVoted votes = {this.state.points}/>
            </div>
        )
    }
}


const HasVotes = (props) => {
       return (
           <p>has {props.count} points </p>
       )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const MostVoted = (votes) => {
    const compare =(a,b) =>{
        if (a.count < b.count)
            return -1;
        if (a.count > b.count)
            return 1;
        return 0;
    }
    const points = [...votes.votes]
    //sort points ascending based on votes
    points.sort(compare)
    return (
        <div>
            <h1>anecdote with most votes</h1>
            <p>{anecdotes[points[points.length -1].anectode]}</p>
            <HasVotes count={points[points.length -1].count}/>
        </div>
    )
}

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