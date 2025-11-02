// // fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
// // ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

import React, { useState, useCallback, useEffect, useMemo } from "react";
import SearchBar from "./components/SearchBar";
import RepoCard from "./components/RepoCard";
import useDebounce from "./hooks/useDebounce";

interface Repo {
  id: number;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  owner: { login: string; avatar_url: string };
}

const App = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Repo[]>(
    JSON.parse(localStorage.getItem("bookmarks_v1") || "[]")
  );
  const [showBookmarked, setShowBookmarked] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  // Automatically fetch results when debouncedQuery changes
  useEffect(() => {
    const fetchRepos = async () => {
      if (!debouncedQuery.trim()) {
        setRepos([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.github.com/search/repositories?q=${debouncedQuery}&per_page=30`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setRepos(data.items || []);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [debouncedQuery]);

  const toggleBookmark = useCallback(
    (repo: Repo) => {
      const updated =
        bookmarks.find((b) => b.id === repo.id) != null
          ? bookmarks.filter((b) => b.id !== repo.id)
          : [...bookmarks, repo];
      setBookmarks(updated);
      localStorage.setItem("bookmarks_v1", JSON.stringify(updated));
    },
    [bookmarks]
  );

  const filteredRepos = useMemo(
    () => (showBookmarked ? bookmarks : repos),
    [showBookmarked, repos, bookmarks]
  );

  return (
    // <div className="max-w-4xl mx-auto p-4">
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">GitHub Bookmarks</h1>
        <p className="text-sm text-gray-400">
          Search and bookmark your favourite GitHub repositories
        </p>
      </header>

      <SearchBar value={query} onChange={setQuery} />

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">
          {showBookmarked
            ? `Showing ${bookmarks.length} bookmarked repos`
            : `Showing ${repos.length} search results`}
        </p>
        <button
          onClick={() => setShowBookmarked((prev) => !prev)}
          className="px-3 py-1 rounded-md border border-gray-700 text-sm hover:border-accent transition-colors"
        >
          {showBookmarked ? "Show All" : "Show Bookmarked Only"}
        </button>
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && filteredRepos.length === 0 && (
        <p className="text-gray-500 flex justify-center">
          Start typing to search repositories.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {filteredRepos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            bookmarked={!!bookmarks.find((b) => b.id === repo.id)}
            onToggle={toggleBookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
