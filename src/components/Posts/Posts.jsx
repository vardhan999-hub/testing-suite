import React, { useState, useEffect } from "react";

const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  fontFamily: "inherit",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "16px 20px",
  marginBottom: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const titleStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#111827",
  marginBottom: "6px",
  textTransform: "capitalize",
};

const bodyStyle = {
  fontSize: "14px",
  color: "#6b7280",
  lineHeight: 1.6,
};

const loadingStyle = {
  textAlign: "center",
  padding: "40px",
  fontSize: "16px",
  color: "#6b7280",
};

const errorStyle = {
  textAlign: "center",
  padding: "40px",
  fontSize: "15px",
  color: "#dc2626",
  background: "#fef2f2",
  borderRadius: "8px",
  border: "1px solid #fecaca",
};

const DEFAULT_URL =
  "https://jsonplaceholder.typicode.com/posts?_limit=5";

function Posts({ apiUrl = DEFAULT_URL }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; 

    setLoading(true);
    setError(null);

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load posts.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  if (loading) {
    return (
      <div style={loadingStyle} data-testid="loading-indicator">
        Loading posts…
      </div>
    );
  }

  if (error) {
    return (
      <div style={errorStyle} data-testid="error-message">
        ⚠ {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div style={loadingStyle} data-testid="empty-message">
        No posts found.
      </div>
    );
  }

  return (
    <div style={containerStyle} data-testid="posts-list">
      {posts.map((post) => (
        <article key={post.id} style={cardStyle} data-testid="post-card">
          <h3 style={titleStyle}>{post.title}</h3>
          <p style={bodyStyle}>{post.body}</p>
        </article>
      ))}
    </div>
  );
}

export default Posts;
