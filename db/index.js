let animalsTable = { records:[], totalRecords: 0 }

//temporary  startup
const mockTableRecords = [
    {id: 1, label: "root", parentId: null},
    {id: 2, label: "ant", parentId: 1},
    {id: 3, label: "bear", parentId: 1},
    {id: 4, label: "cat", parentId: 3},
    {id: 5, label: "dog", parentId: 3},
    {id: 6, label: "elephant", parentId: 5},
    {id: 7, label: "frog", parentId: 1},
]
animalsTable.records = mockTableRecords
animalsTable.totalRecords += mockTableRecords.length
//
module.exports = animalsTable