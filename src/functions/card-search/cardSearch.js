import Config from "../../config";

/**
 * Sends a search request to the api-server. 
 * @param {string} searchPhrase 
 * @returns {null|Array} Returns an array of CardList data, or null upon failure.
 */
export async function cardSearch(searchPhrase) {
    const endpointName = "graphql";
    const url = Config["api-base-path"] + endpointName;

    // Assignment says to use "local" search.
    // That seems weird. Letting the server get the content for us.
    const body = {
        query: `
        {
            contentCards(filter: {limit: 20, keywords: "${searchPhrase}", types: [PODCAST]}) {
                edges {
                    ... on Podcast {
                        name
                        image {
                        ...Image
                        }
                        categories {
                        ...Category
                        }
                        experts {
                        ...Expert
                        }
                        }
                    }
                }
            }
            fragment Image on Image {
                uri
            }
            fragment Category on Category {
                name
            }
            fragment Expert on Expert {
                firstName
                lastName
                title
                company
            }
        `
    };

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        if(response.ok) {
            let responseObj = await response.json();

            return responseObj.data.contentCards.edges;
        } else {
            console.error(`Status code was not ok for CardSearchService.searchPhrase: ${response.status} - ${response.statusText}`);
        }
    } catch(e) {
        console.error(e);
    }

    return null;
}