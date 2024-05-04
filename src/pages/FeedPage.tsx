import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

interface IArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

const FeedPage = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    (async () => {
      const res = await apiClient.get("/everything?q=bitcoin&apiKey=608e0565cf8a4984b7111ae82dcca97d");
      setArticles(res.data.articles);
    })();
  });

  return (
    <div>
      <h1>News Feed</h1>

      <ul>
        {articles.map((article, i) => (
          <li key={i}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
