/**
 * This module works as controller
 * Mode and views are in models and views folder
 */

import Search from "./models/Search";
import { elements } from "./views/base";
import * as searchView from "./views/searchView";

/**
 * The state object below is Global state of the app
 * It includes following states
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipe
 */

const state = {};

const controlSearch = async () => {
  // 1. Get the query from view
  const query = searchView.getInput();

  if (query) {
    // 2. New search object and save it to our state object
    state.search = new Search(query);
    // 3. Prepare UI for result
    searchView.clearInput();
    searchView.clearResults();
    // 4. Search for recipe
    await state.search.getResults();

    // 5. Render result on UI
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
