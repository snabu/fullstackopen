import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssit = [
        {
            nimi: 'Half Stack -sovelluskehitys',
            id: 1,
            osat: [
                {
                    nimi: 'Reactin perusteet',
                    tehtavia: 10,
                    id: 1
                },
                {
                    nimi: 'Tiedonvälitys propseilla',
                    tehtavia: 7,
                    id: 2
                },
                {
                    nimi: 'Komponenttien tila',
                    tehtavia: 14,
                    id: 3
                }
            ]
        },
        {
            nimi: 'Node.js',
            id: 2,
            osat: [
                {
                    nimi: 'Routing',
                    tehtavia: 3,
                    id: 1
                },
                {
                    nimi: 'Middlewaret',
                    tehtavia: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>Opetusohjelma</h1>
            <Kurssit kurssit = {kurssit} />
        </div>
    )
}

const Kurssit = ({kurssit}) => {
    return (

        kurssit.map(kurssi =>
            <div key={kurssi.id}>
                <Kurssi kurssi={kurssi} />
            </div>
        ))
}


const Kurssi = ({kurssi}) => {
    console.log("Kurssi on ", kurssi)

    const Otsikko =({otsikko}) => {
        return(<h1>{otsikko}</h1>)
    }

    const Sisalto = ({osat}) => {
        return(osat.map(osa => <p key={osa.id}>{osa.nimi} {osa.tehtavia}</p>))
    }

    const Yhteensa = ({osat}) => {
        console.log(osat)
        const count = osat.map(osa => osa.tehtavia).reduce((acc,cur) => acc+cur)
        console.log("count is ", count)
        return(<p>yhteensä {count} tehtävää</p>)
    }


    return(
        <div>
        <Otsikko otsikko={kurssi.nimi}/>
        <Sisalto osat={kurssi.osat}/>
        <Yhteensa osat={kurssi.osat}/>

        </div>
    )
}


ReactDOM.render(
    <App  />,
    document.getElementById('root')
)