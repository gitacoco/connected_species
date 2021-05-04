var taxonCategory = [
    { id: "111", name: "AVES", parent: "" },
    { id: "2222", name: "ANSERIFORMES", parent: "AVES" },
    { id: "3333", name: "PASSERIFORMES", parent: "AVES" },
    { id: "4444", name: "CAPRIMULGIFORMES", parent: "AVES" },
    { id: "5555", name: "PICIFORMES", parent: "AVES" },
    { id: "3333", name: "CHARADRIIFORMES", parent: "AVES" },
    { id: "4444", name: "PSITTACIFORMES", parent: "AVES" },
    { id: "5555", name: "COLUMBIFORMES", parent: "AVES" },
    { id: "3333", name: "GALLIFORMES", parent: "AVES" },
    { id: "4444", name: "ACCIPITRIFORMES", parent: "AVES" },
    { id: "5555", name: "STRIGIFORMES", parent: "AVES" },
    { id: "3333", name: "GRUIFORMES", parent: "AVES" },
    { id: "4444", name: "CORACIIFORMES", parent: "AVES" },
    { id: "5555", name: "PROCELLARIIFORMES", parent: "AVES" },
    { id: "3333", name: "CUCULIFORMES", parent: "AVES" },
    { id: "4444", name: "PELECANIFORMES", parent: "AVES" },
    { id: "5555", name: "FALCONIFORMES", parent: "AVES" },
    { id: "3333", name: "BUCEROTIFORMES", parent: "AVES" },
    { id: "4444", name: "STRUTHIONIFORMES", parent: "AVES" },
    { id: "5555", name: "SULIFORMES", parent: "AVES" },
    { id: "3333", name: "TROGONIFORMES", parent: "AVES" },
    { id: "4444", name: "OTIDIFORMES", parent: "AVES" },
    { id: "5555", name: "PODICIPEDIFORMES", parent: "AVES" },
    { id: "3333", name: "MUSOPHAGIFORMES", parent: "AVES" },
    { id: "4444", name: "CICONIIFORMES", parent: "AVES" },
    { id: "5555", name: "PTEROCLIFORMES", parent: "AVES" },
    { id: "5555", name: "SPHENISCIFORMES", parent: "AVES" },
    { id: "5555", name: "GAVIIFORMES", parent: "AVES" },
    { id: "5555", name: "PHOENICOPTERIFORMES", parent: "AVES" },
    { id: "5555", name: "CATHARTIFORMES", parent: "AVES" },
    { id: "5555", name: "COLIIFORMES", parent: "AVES" },
    { id: "5555", name: "PHAETHONTIFORMES", parent: "AVES" },
    { id: "5555", name: "MESITORNITHIFORMES", parent: "AVES" },
    { id: "5555", name: "CARIAMIFORMES", parent: "AVES" },
    { id: "5555", name: "EURYPYGIFORMES", parent: "AVES" },
    { id: "5555", name: "OPISTHOCOMIFORMES", parent: "AVES" },
    { id: "5555", name: "LEPTOSOMIFORMES", parent: "AVES" },
  ];

//   let preprocesstree = function(data) {

//   let levels = ['Class', 'order', 'family', 'genus']
//   let uniques = new Set()
//   let items = []
//   let cnts = [0, 0, 0, 0]
//   for (let datum of data) {
//       for (let nid = levels.length-1; nid >=0; nid--) {
//           let name = datum.taxonomy[levels[nid]]
//           if(uniques.has(name)) continue
//           let parent = nid == 0 ?  "" :  datum.taxonomy[levels[nid-1]]
//           items.push({
//               name,
//               parent,
//               'id': 10**nid + cnts[nid]++
//           })
//           uniques.add(name)
//       }
//   }
//   console.log(items)
//   downloadObjectAsJson(items, 'taxonparent')
//   return items
// }

// function downloadObjectAsJson(exportObj, exportName){
//     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
//     var downloadAnchorNode = document.createElement('a');
//     downloadAnchorNode.setAttribute("href",     dataStr);
//     downloadAnchorNode.setAttribute("download", exportName + ".json");
//     document.body.appendChild(downloadAnchorNode); // required for firefox
//     downloadAnchorNode.click();
//     downloadAnchorNode.remove();
//   }
