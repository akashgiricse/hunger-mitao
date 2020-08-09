import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );

      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (err) {
      console.log(err);
      alert("Something went wrong :(");
    }
  }

  // Calculate cooking time. 15 minutes for 3 ingredients
  calcCookingTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 3;
  }

  calcServings() {
    this.servings = 4;
  }
}
