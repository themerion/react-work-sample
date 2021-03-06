// Libs
import React, { useReducer, useRef, useCallback } from "react";
import _ from "underscore";

// Components
import CardList from "./components/CardList/CardList";
import LoadingTextField from "./components/LoadingTextField/LoadingTextField";

// Functions
import { cardSearch } from "./functions/card-search/cardSearch";
import { mapCardSearchesToCards } from "./functions/card-search/mapCardSearchesToCards";

import styles from "./App.module.css";


function App() {

    // --- Init ---
    // ------------------------------------------------------

    const initialState = {
        cards: [],
        searchError: false,
        hasSearched: false,
        isSearching: false
    };

    const [state, mergeState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialState
    );

    // A persistent counter for making sure we recieve requests in order
    const lastSearchRef = useRef(0);

    const debounceTime = 300;
    const searchFieldUpdatedCallback = useCallback(_.debounce(searchFieldUpdated, debounceTime), []);

    // ---Rendering---
    // ------------------------------------------------------

    let showCards = (!state.searchError) && state.hasSearched && (state.cards.length > 0);

    let noContentMsg = null;
    if (!state.isSearching) {
        noContentMsg =
            state.searchError       ? "Something went wrong during the search. Please try again" :
            (!state.hasSearched)    ? "Please type something in the search field." :
            state.cards.length == 0 ? "Found no results" :
            null;
    }

    return (
        <div className={styles.App}>
            <div className={styles.textField_title}>Search</div>
            <LoadingTextField onChange={searchFieldUpdatedCallback} isLoading={state.isSearching}/>

            {noContentMsg && <div className={styles.noContentMsg}>{noContentMsg}</div>}
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
