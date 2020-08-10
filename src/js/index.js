/**
 * This module works as controller
 * Mode and views are in models and views folder
 */

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";

/**
 * The state object below is Global state of the app
 * It includes following states
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipe
 */

const state = {};
window.state = state;

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
    try {
      // 4. Search for recipe
      await state.search.getResults();
      clearLoader();
      // 5. Render result on UI
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("Something went wrong with the search...");
      clearLoader();
    }
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

// todo: remov this below line
state.likes = new Likes();
likesView.toggleLikesMenu(state.likes.getNumLikes());

const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace("#", "");
  if (id) {
    recipeView.clearRecipe();
    // Prepare UI for changes
    renderLoader(elements.recipe);

    // Highlight selected recipe
    if (state.search) {
      searchView.highlightSelected(id);
    }

    // Create new recipe object
    state.recipe = new Recipe(id);
    try {
      // Get recipe data and parse ingredient

      await state.recipe.getRecipe();

      state.recipe.parseIngredients();
      // Calculate serving and time
      state.recipe.calcCookingTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (err) {
      alert("Error processing recipe");
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe)

["hashchange", "load"].forEach((item) =>
  window.addEventListener(item, controlRecipe)
);

// Handle delete and update item list
elements.shopping.addEventListener("click", (el) => {
  const id = el.target.closest(".shopping__item").dataset.itemid;
  // Handle this delete button

  if (el.target.matches(".shopping__delete, .shopping__delete *")) {
    // Delete from state
    state.list.deleteItem(id);
    // Delete from UI
    listView.deleteItem(id);
  } else if (el.target.matches(".shopping__count-value")) {
    const val = parseFloat(el.target.value);
    state.list.updateCount(id, val);
  }
});

/**
 * List controller
 */

const controlList = () => {
  // Craete a new empty list if there is none
  if (!state.list) state.list = new List();

  // Add each ingredient to the list
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

/**
 * Like controller
 */
const controlLike = () => {
  // Craete a new empty list if there is none
  if (!state.likes) state.likes = new Likes();

  const currId = state.recipe.id;
  const isLiked = state.likes.isLiked(currId);
  if (!isLiked) {
    // Add like to the state
    const newLike = state.likes.addLikes(
      currId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    // Toggle the like button
    // Toggle the like button
    likesView.toggleLikeButton(true);
    // Add like to UI list
    likesView.renderLike(newLike);
  } else {
    state.likes.deleteLikes(currId);
    // Remove like to the state
    // Toggle the like button
    likesView.toggleLikeButton(false);
    // Remove like to UI list
    likesView.deleteLike(currId);
  }

  likesView.toggleLikesMenu(state.likes.getNumLikes());
};

// Handling recipe button click
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    // Increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    // Like controller
    controlLike();
  }
});
