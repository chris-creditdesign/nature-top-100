for (var i = 0; i < top100.length; i++) {
  top100[i].lifeCycle = [];
    for (var y = 0; y < combined.length; y++) {
        if ( top100[i].lead_author === combined[y].lead_author ){
          
          if (combined[y].year === "Total") {
            top100[i].total = combined[y].cites;
          } else if (combined[y].year !== "2014" && combined[y].year !== "2015" ) {
          
            var myObject = {};
            myObject.year = combined[y].year;
            myObject.cites = combined[y].cites;
          
            top100[i].lifeCycle.push(myObject);
            
          }
        };
    }  
}

// In order to print the final array of objects to the console.
console.table(JSON.stringify(top100));