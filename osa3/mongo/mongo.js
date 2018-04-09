const mongoose = require('mongoose')

const url = 'mongodb://' + process.env.FULLSTACKOPEN_MLAB_USER + ':' + process.env.FULLSTACKOPEN_MLAB_PWD + '@ds239309.mlab.com:39309/fullstackopen'


mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

if ((process.argv.length > 2) && (process.argv.length < 5)) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    person
        .save()
        .then(response => {
            console.log('lisätään henkilö ' + person.name +  ' numero ' + person.number + ' luetteloon')
                mongoose.connection.close()
    })
}
else if (process.argv.length === 2) {
    Person
        .find({})
        .then(persons => {
            console.log("puhelinluettelo:")
            persons.map(person => {console.log(person.name, person.number)})
            mongoose.connection.close()
    })
}

