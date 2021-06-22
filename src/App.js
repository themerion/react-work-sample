// Libs
import React, { useReducer, useRef } from "react";
import _ from "underscore";

// Components
import CardList from "./components/CardList/CardList";
import Loader from "./components/Loader/Loader";
import SearchField from "./components/SearchField/SearchField";

// Functions
import { cardSearch } from "./services/CardSearchService";
import { mapCardSearchesToCards } from "./mappers/mapCardSearchesToCards";

import "./App.css";


function App() {

    // --- Init ---
    // ------------------------------------------------------

    const initialState = {
        cards: [],
        searchError: false,
        hasSearched: false,
    };

    const [state, mergeState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialState
    );

    // A persistent counter for making sure we recieve requests in order
    const lastSearchRef = useRef(0);

    const debounceTime = 300;
    const searchFieldUpdated_Debounced = _.debounce(searchFieldUpdated, debounceTime);

    // ---Rendering---
    // ------------------------------------------------------

    let showCards = (!state.searchError) && state.hasSearched && (state.cards.length > 0);

    let noContentMsg = null;
    if (!state.isSearching) {
        noContentMsg =
            state.searchError       ? <p>Something went wrong during the search. Please try again.</p> :
            (!state.hasSearched)    ? <p>Please type something in the search field.</p> :
            state.cards.length == 0 ? <p>Found no results</p> :
            null;
    }

    return (
        <div className="App">
            <div>
                <SearchField onChange={searchFieldUpdated_Debounced} />
                {state.isSearching && <Loader />}
            </div>

            {noContentMsg}
            {showCards && <CardList cards={state.cards} />}
        </div>
    );

    // ---Functions---
    // -------------------------------------------------------------

    async function searchFieldUpdated(newVal) {
        const thisSearch = lastSearchRef.current + 1;
        lastSearchRef.current = thisSearch;

        mergeState({
            hasSearched: true,
            isSearching: true,
            searchError: false
        });

        let cardsSearchResult = await cardSearch(newVal);

        // Has another search commenced? In that case, skip the result from this search.
        if (thisSearch < lastSearchRef.current) {
            return;
        }

        mergeState({
            isSearching: false,
        });

        if (cardsSearchResult == null) {
            mergeState({
                searchError: true,
                cards: []
            });
            return;
        }

        mergeState({
            cards: mapCardSearchesToCards(cardsSearchResult)
        });

    }

}

export default App;
