import uniqid from "uniqid";
export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLikes(id, title, author, img) {
    const like = {
      id: id,
      title,
      author,
      img,
    };

    this.likes.push(like);

    // Persist data in local storage
    this.persistData();

    return like;
  }

  deleteLikes(id) {
    const index = this.likes.findIndex((e) => e.id === id);
    this.likes.splice(index, 1);

    // Persist data in local storage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem("likes"));
    if (storage) {
      // Restore from local storage
      this.likes = storage;
    }
  }
}
