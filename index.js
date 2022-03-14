const express = require('express')
const app = express()
const port = 2000
app.use(express.json());
 
app.use((req, res, next) => {

    // -----------------------------------------------------------------------
    // Authentication Middleware Adaptado a Demostración
  
    const auth = {username: 'msmk_student', password: 'demostracion0322'} 
  
    // READ username and Password from HEADER
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  
    // username AND password are OK? 
    if (username && password && username === auth.username && password === auth.password) {
      // Access granted...
      return next()
    }
  
    // NOT GRANTED...
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Plaved Survey API (DEMO): ERROR! No has completado la demostración.') 
  
    // -----------------------------------------------------------------------
  
  })
  
app.get('/', (req, res) => {
  res.send('Plaved Survey API (DEMO): Has completado la demostración!')

})

app.post('/name', (req,res)=> {
req.body && req.body.name !== '' ? res.send("Plaved Survey API (DEMO): Te llamas "+req.body.name) : res.send('Plaved Survey API (DEMO): Recuerda que necesitamos tu nombre por POST')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
