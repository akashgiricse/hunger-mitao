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

    return like;
  }

  deleteLikes(id) {
    const index = this.likes.findIndex((e) => e.id === id);
    this.likes.splice(index, 1);
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }
}