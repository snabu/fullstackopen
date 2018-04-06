import React from 'react'
import ReactDOM from 'react-dom'




class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            bad: 0,
            neutral: 0,
            total: 0
        }
    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <button onClick={() => {this.setState({good: this.state.good + 1, total: this.state.total +1})}}>
                    hyvä
                </button>
                <button onClick={() => {this.setState({neutral: this.state.neutral + 1, total: this.state.total +1})}}>
                    neutraali
                </button>
                <button onClick={() => {this.setState({bad: this.state.bad + 1, total: this.state.total +1})}}>
                    huono
                </button>
                <h1>statistiikka</h1>
                <p>Hyvä {this.state.good}</p>
                <p>Neutraali {this.state.neutral}</p>
                <p>Huono {this.state.bad}</p>
            </div>
        )
    }
}




ReactDOM.render(
    <App />,
    document.getElementById('root')
)