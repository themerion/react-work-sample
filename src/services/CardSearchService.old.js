
/**
 * Sends a search request to the api-server. 
 * @param {string} searchPhrase 
 * @returns {null|Array} Returns an array of CardList data, or null upon failure.
 */
export async function cardSearch(searchPhrase) {
    
    // return [{id: 36, name: "Dota"}, {id: 94, name: "CS"}];

    const endpointName = "search";
    const queryString = "phrase="+encodeURIComponent(searchPhrase);

    const url = "http://localhost:3001/" + endpointName + "?" + queryString;

    try {
        let response = await fetch(url);
        if(response.ok) {
            let responseObj = await response.json();
            return responseObj;
        } else {
            console.error(`Status code was not ok for CardSearchService.searchPhrase: ${response.status} - ${response.statusText}`);
        }
    } catch(e) {
        console.error(e);
    }

    return null;
}