/**
 * This module works as controller
 * Mode and views are in models and views folder
 */

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import { elements, renderLoader, clearLoader } from "./views/base";
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

/**
 * Search controller
 */
const controlSearch = async () => {
  // 1. Get the query from view
  const query = searchView.getInput();

  if (query) {
    // 2. New search object and save it to our state object
    state.search = new Search(query);
    // 3. Prepare UI for result

    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    // 4. Search for recipe
    await state.search.getResults();
    clearLoader();

    // 5. Render result on UI
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * Recipe controller
 */

const r = new Recipe(50429);

r.getRecipe();
