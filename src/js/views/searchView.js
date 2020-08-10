import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

export const highlightSelected = (id) => {
  const resultArray = Array.from(document.querySelectorAll(".results__link"));

  resultArray.forEach((el) => {
    el.classList.remove("results__link--active");
  });

  document
    .querySelector(`.results__link[href*="${id}"]`)
    .classList.add("results__link--active");
};

export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > 17) {
    title.split(" ").reduce((acc, curr) => {
      if (acc + curr.length <= limit) {
        newTitle.push(curr);
        return acc + curr.length;
      }
    }, 0);
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = `
                 <li>
                    <a class="results__link " href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${
    recipe.title
  }">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(
                              recipe.title
                            )}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;

  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

/**
 * Create conditional pagination button
 * @param {Number} page Page number
 * @param {String} type 'next' or 'prev'
 */
const createPaginationButton = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
             <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${
                  type === "prev" ? "left" : "right"
                }"></use>
            </svg>
           
        </button>
`;

/**
 * Render conditional pagination button
 * @param {Number} page Current page
 * @param {Number} numResults Total number of results
 * @param {Number} itemPerPage Item (or results ) per page
 */
const renderPaginationButtons = (page, numResults, itemPerPage) => {
  const pages = Math.ceil(numResults / itemPerPage);
  let button;
  if (page === 1 && pages > 1) {
    // Show only next page button
    button = createPaginationButton(page, "next");
  } else if (page < pages) {
    // show both next and prev button
    button = `
    ${createPaginationButton(page, "prev")}
    ${createPaginationButton(page, "next")}
    `;
  } else if (page === pages && pages > 1) {
    // Show per button only
    button = createPaginationButton(page, "prev");
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, itemPerPage = 10) => {
  // render result of current page
  let start = (page - 1) * itemPerPage;
  let end = page * itemPerPage;

  recipes.slice(start, end).forEach((recipe) => {
    renderRecipe(recipe);
  });

  // render pagination buttons
  renderPaginationButtons(page, recipes.length, itemPerPage);
};
