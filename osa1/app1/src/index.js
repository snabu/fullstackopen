import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ]

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osat={osat}/>
            <Yhteensa osat={osat}/>
        </div>
)

}

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map(function(osa, index) {
                console.log("osa on", osa)
                return <Osa osa={osa} key={index}/>
            })}
        </div>
        )
    }


const Osa = (props) => {
            return (
                <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    let yhteensa=0;
    props.osat.map(function (osa, index) {
         yhteensa += osa.tehtavia
        return yhteensa
    })
    return(
    <p>yhteensä {yhteensa} tehtävää</p>
    )
}




ReactDOM.render(
    <App />,
    document.getElementById('root')
)