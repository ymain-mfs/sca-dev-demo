
// 1 - load Saved Search, returning nlobjSearch
var search = nlapiLoadSearch('customrecord_xxx','customsearch_xxx');

// 2 = execute Saved Search, returning nlobjSearchResultSet
var resultSet = search.runSearch();

// 3 - declare array to hold record data
var records = [];

// 4 - loop through nlobjSearchResultSet; nlobjSearchResult passed into
//     callback function
resultSet.forEachResult(function(searchResult){

    // add to records array
    // get record data by executing methods on nlobjSearchResult
    records.push({
        field1: searchResult.getValue('custrecord_xxx_field1')
    ,   field2: searchResult.getValue('custrecord_xxx_field2')
    ,   field3: searchResult.getText('custrecord_xxx_field3')
    ,   internalid: searchResult.getId()  // get internal id of record                
    });

    return true; // continue iteration; required!!!
});