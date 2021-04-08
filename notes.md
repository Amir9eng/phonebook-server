const password = process.argv[2]

if (process.argv.length === 3) {
Person.find({}).then((people) => {
people.forEach((person) => {
console.log(person.name, person.number)
})
process.exit(1)
})
}

if (process.argv.length > 3) {
const name = process.argv[3]
const number = process.argv[4]
const newPerson = { name, number }

new Person(newPerson).save().then(() => {
console.log(`added ${name} number ${number} to phonebook`)
mongoose.connection.close()
process.exit(1)
})
}

const id = Number(request.params.id)
const person = persons.filter((person) => {
return person.id !== id
})
response.json(person).status(204).end()

persons = persons.concat(newContact)
