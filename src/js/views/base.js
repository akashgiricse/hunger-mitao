/**
 * This file contains all the query selectors objects
 */

export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResList: document.querySelector(".results__list"),
  searchRes: document.querySelector(".results"),
  searchResPages: document.querySelector(".results__pages"),
};

/**
 * Store class names as well in object
 */

export const elementStrings = {
  loader: "loader",
};

/**
 * Spin loader icon
 * We're writing the logic in base because we want it to be reusable
 */
export const renderLoader = (parent) => {
  const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

  parent.insertAdjacentHTML("afterbegin", loader);
};

/**
 * Clear loader
 */
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);

  // Remove element from the DOM
  if (loader) loader.parentElement.removeChild(loader);
};
