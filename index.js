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

const buildNewAnimalEntry = (newEntryParams) => {
    //in preparation of the possible feature of creating new trees, no parent param check, instead defaults to null if undefined
    if(!newEntryParams.label) throw Error('missing or empty param: "label"')
    return {id: animalsTable.totalRecords + 1, label: newEntryParams.label, parentId: newEntryParams.parent || null}
}

app.post('/api/tree', (req,res) => {
    try {
        const newEntry = buildNewAnimalEntry(req.body)
        animalsTable.addRecord(newEntry)
        res.sendStatus(201)
    }catch(err) {
        res.send(err.message)
    }
})

app.delete('/api/tree/:id', (req,res) => {
    try {
        animalsTable.deleteRecord(+req.params.id)
        res.sendStatus(204)
    } catch(err) {
        res.send(err.message)
    }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})