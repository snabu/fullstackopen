import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
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
    }

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi}/>
            <Yhteensa kurssi={kurssi}/>
        </div>
)

}

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi.nimi}</h1>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {props.kurssi.osat.map(function(osa, index) {
                console.log("index on", index)
                return <Osa kurssi={props.kurssi} index={index} key={index}/>
            })}
        </div>
        )
    }


const Osa = (props) => {
    console.log("props on ", props)
    return (

                <p>{props.kurssi.osat[props.index].nimi} {props.kurssi.osat[props.index].tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    let yhteensa=0;
    props.kurssi.osat.map(function (osa, index) {
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