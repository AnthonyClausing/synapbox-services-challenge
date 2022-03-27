const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3001

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('access-control-allow-origin', '*');
    res.header("Content-Type",'application/json');
    next()
})
//
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})