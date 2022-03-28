const buildTree = function(nodes, parentId = null) {
    let branch = new Array();
    for (let entry of nodes) {
        if (entry.parentId == parentId) {
            let children = buildTree(nodes, entry.id);
            let normalizedEntry = { [`${entry.id}`] : {
                label: entry.label, 
                children
                }
            }
            branch.push(normalizedEntry);
        }
    }
    return branch;
}

module.exports = {buildTree}