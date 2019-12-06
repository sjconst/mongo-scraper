import axios from "axios";

export default {
  // Scrapes articles
  scrapeArticles: () => {
    return axios.get("/scrape");
  },
  // Gets articles from the db
  getArticles: () => {
      return axios.get("/api/articles")
  },
  getArticlesByDate: date => {
      return axios.get(`/api/articles/${date}`)
  },
  //Gets saved articles from the db
  getSaved: () => {
    return axios.get("/api/savedArticles")
  },
  // Gets an article and comments with the given id
  getOneArticle: id =>{
    return axios.get(`/api/articles/${id}`);
  },
  //updates article to mark as saved or not
  saveArticle: (id, isSaved) => {
    return axios.put(`/api/articles/${isSaved}/${id}`);
  },
  // Deletes the comment with the given id
  deleteComment: id => {
    return axios.delete(`/api/comment/${id}`);
  },
  // Saves a comment to the database
  saveComment: (id, commentData) => {   
    return axios.post(`/api/articles/${id}`, {
      comment: commentData
    });
  }
};