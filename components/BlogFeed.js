const Feed = require('feed').Feed;
const ArticleIndex = require("./ArticleIndex");
const BlogPost= require("./BlogPost");

class BlogFeed {
  constructor() {
    const url = "https://www.rajiraj.com";
    this.siteURL = url;
    this.feed = new Feed({
      title: "Raji Rajagopalan's website - blog",
      description: "Blog feed for Raji Rajagopalan's website",
      id: `${url}`,
      link: `${url}/blog`,
      language: "en",
      copyright: "All rights reserved 2020, Raji Rajagopalan",
      generator: "Rajiraj website feed",
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
    /* await bp.readArticleFile(`${post.name}`);
    const text = bp.getArticleText().substring(0, 200); */
    this.feed.addItem({
      title: post.title,
      guid:`${this.siteURL}/blog/${post.name}`,
      link: `${this.siteURL}/blog/${post.name}`,
      date: new Date(post.date),
      /*content: text,
      description: text, */
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