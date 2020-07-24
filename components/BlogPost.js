
// Data structure representing a single blog post
// Encapsulates logic to deal with a single post
class BlogPost {

  constructor()
  {
    this.filetext = "";
  }
  // Test helper
  setFileText(text) {
    this.filetext = text;
  }

  getMinutesToRead() {    
    return Math.round(this.filetext.split(/[\r\n\s,]+/).length / 300);
  }

  getArticleText() {
    return this.filetext;
  }

  // Read from the file system
   async readArticleFile(filename) {
    const fetch = require("node-fetch");
    const t = await fetch(`https://www.rajiraj.com/posts/${filename}.txt`);
    this.filetext = await t.text();
  }
}

module.exports=BlogPost;
