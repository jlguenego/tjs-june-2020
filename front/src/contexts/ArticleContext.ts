import React from "react";
import { Article } from "../interfaces/Article";

class ArticleFactory {
  articles: Article[] = this.getArticles();
  renderFn: Function = () => {};
  counter = 0;

  constructor() {
    this.refresh();
  }

  async refresh() {
    try {
      const response = await fetch("http://localhost:3500/ws/articles");
      const json = await response.json();
      console.log("json: ", json);
      this.articles = json;
      this.save();
      this.render();
    } catch (e) {
      console.log("e: ", e);
    }
  }

  getArticles() {
    const str = localStorage.getItem("articles");
    if (!str) {
      return [];
    }
    return JSON.parse(str);
  }

  add(article: Article) {
    article.id = article.id || "temp";
    this.articles.push(article);
    this.save();
    this.render();
    (async () => {
      try {
        await fetch("http://localhost:3500/ws/articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(article),
        });
        await this.refresh();
      } catch (e) {
        console.log("e: ", e);
      }
    })();
  }

  save() {
    localStorage.setItem("articles", JSON.stringify(this.articles));
  }

  remove(selectedArticles: Article[]) {
    selectedArticles.forEach((article) => {
      const index = this.articles.findIndex((a) => a === article);
      this.articles.splice(index, 1);
    });
    this.save();
    this.render();
    (async () => {
      try {
        await fetch("http://localhost:3500/ws/bulk/articles", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedArticles.map((a) => a.id)),
        });
        await this.refresh();
      } catch (e) {
        console.log("e: ", e);
      }
    })();
  }

  setRenderFn(callback: Function) {
    this.renderFn = callback;
  }

  render() {
    this.counter++;
    this.counter = this.counter % 2;
    this.renderFn(this.counter);
  }
}

const ArticleContext = React.createContext(new ArticleFactory());

export default ArticleContext;
