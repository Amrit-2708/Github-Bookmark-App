import React from 'react'

interface Repo {
  id: number
  full_name: string
  description: string
  stargazers_count: number
  language: string
  html_url: string
  owner: { login: string; avatar_url: string }
}

interface Props {
  repo: Repo
  bookmarked: boolean
  onToggle: (repo: Repo) => void
}

const RepoCard = ({ repo, bookmarked, onToggle }: Props) => {
  return (
    <div className="flex items-start gap-4 bg-card-dark border border-gray-800 rounded-xl p-4 hover:border-accent transition-colors">
      <img
        src={repo.owner.avatar_url}
        alt={repo.owner.login}
        className="w-14 h-14 rounded-md border border-gray-700 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1 gap-3">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-base font-semibold text-white hover:text-accent transition-colors break-words truncate"
          >
            {repo.full_name}
          </a>
          <button
            onClick={() => onToggle(repo)}
            className={`text-sm font-medium px-2 py-1 rounded-md border transition-colors whitespace-nowrap ${
              bookmarked
                ? 'text-accent-yellow border-accent-yellow'
                : 'text-gray-400 border-gray-700 hover:text-accent hover:border-accent'
            }`}
          >
            {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
        </div>
        <p className="text-sm text-gray-400 mb-2 break-words">
          {repo.description ?? 'No description provided.'}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
          <span>⭐ {repo.stargazers_count}</span>
          {repo.language && <span>{repo.language}</span>}
          <span className="ml-auto italic truncate">Owner: {repo.owner.login}</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(RepoCard)
