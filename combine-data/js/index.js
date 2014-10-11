for (var i = 0; i < top100.length; i++) {
  top100[i].lifeCycle = {};
    for (var y = 0; y < combined.length; y++) {
        if ( top100[i].lead_author === combined[y].lead_author ){
          var thisKey = combined[y].year;
          top100[i].lifeCycle[thisKey] = combined[y].cites;
        };
    }  
}  

// In order to print the final array of objects to the console.
console.table(JSON.stringify(top100));