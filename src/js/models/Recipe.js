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
      console.log(res);
      //   this.result = res.data.recipes;
      //   console.log(this.result);
    } catch (err) {
      throw new Error(err);
    }
  }
}
