class ArticleIndex {
  constructor() {
    this.data = undefined;
  }

  getIndex() {
    const fetch = require("node-fetch");
    return fetch("http://rajiraj.com/posts/articleIndex.json")
      .then((response) =>
      {
         return response.json();
      })
      .then((data) => 
      {        
        this.data = data;
      })
      .catch((error) => {
        this.data = "Error fetching json: " + error.toString();
      });
    
  }
}
module.exports=ArticleIndex;
