
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


    handleClick = (event) => {
        console.log(event)
        return () => {
            this.setState({[event] : this.state[event] + 1, total : this.state.total + 1})
        }
    }

    render() {


        return (

            <div>
                <h1>anna palautetta</h1>
                <Button handleClick= {this.handleClick("good")} text={"hyvä"}/>
                <Button handleClick= {this.handleClick("neutral")} text={"neutraali"}/>
                <Button handleClick= {this.handleClick("bad")} text={"huono"}/>
                <h1>statistiikka</h1>
                <Statistics good={this.state.good} bad={this.state.bad} neutral = {this.state.neutral} total = {this.state.total}/>
            </div>
        )
    }



}

const Statistic = (props) => {
   return ( <p>{props.text} {props.value}</p>)
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({good, neutral, bad, total}) => {
    const mean = () =>  {
        console.log (total)
        if (total === 0) {
            return 0
        }
        return (good + bad * -1)/total
    }

    const positives = () => {
        if (total === 0) {
            return 0
        }
        return (good/total * 100)
    }

    return (
        <div>
            <Statistic text = {"hyvä"} value = {good}/>
            <Statistic text = {"neutraali"} value = {neutral}/>
            <Statistic text = {"huono"} value = {bad}/>
            <Statistic text = {"keskiarvo"} value ={mean()} />
            <Statistic text = {"positiivisia"} value = {positives() + "%"}/>
        </div>
    )
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
)