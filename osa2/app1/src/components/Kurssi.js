import React from 'react'


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

export default Kurssi