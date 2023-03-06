const app = require('./app') //SyntaxError: Identifier 'app' has already been declared
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server has been started on ${port}`))