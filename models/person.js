const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("please provide the password")
  process.exit(2)
}

const url = process.env.DB_url

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => console.log("connected to database"))
  .catch((error) => {
    console.error("error connecting to database:", error.message)
    process.exit(1)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
})

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model("Person", contactSchema)

module.exports = Person
