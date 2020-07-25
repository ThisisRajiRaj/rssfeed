const Feed = require('feed').Feed;
const ArticleIndex = require("./ArticleIndex");
const BlogPost= require("./BlogPost");

class BlogFeed {
  constructor() {
    const url = process.env.ROOT_URL;
    this.siteURL = url;
    this.feed = new Feed({
      title: process.env.FEED_TITLE,
      description: process.env.FEED_TITLE,
      id: `${url}`,
      link: process.env.BLOG_URL,
      language: "en",
      copyright: "All rights reserved 2020",
      generator: "NodeJS basee website feed generator",
    });
  }
  async readIndex() {
    const index = new ArticleIndex();
    await index.getIndex();
    const articles = index.data;
    if (!articles) {
      return;
    }
    for (let i = 0; i < articles.length; i++) {
      await this.addItem(articles[i]);
    }
  }

  async addItem(post) {
    let bp = new BlogPost();
    let text = "";
    if (process.env.ENABLE_CONTENT == true) {
      await bp.readArticleFile(`${post.name}`);
      text = bp.getArticleText().substring(0, 200); 
    }
    this.feed.addItem({
      title: post.title,
      guid:`${this.siteURL}/blog/${post.name}`,
      link: `${this.siteURL}/blog/${post.name}`,
      date: new Date(post.date),
      content: text,
      description: text, 
      image:
        post.image !== undefined
          ? post.image.replace("images/", `${this.siteURL}/posts/`)
          : undefined,
    });
  }
  getRss2Feed() {
    return this.feed.rss2();
  }
}
module.exports = BlogFeed;