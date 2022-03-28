const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3001
let animalsTable = require('./db')
const { buildTree } = require('./helpers/buildTree')

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
app.get('/api/tree', (req, res) => {
    //JSON.stringify used to prettify the raw response
    const resultTree = JSON.stringify(buildTree(animalsTable.records), null, 4)
    res.status(200).send(resultTree)
})
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})