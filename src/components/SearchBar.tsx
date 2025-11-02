import React from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
}

const SearchBar= ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search GitHub repositories..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 mb-4 rounded-md bg-card-dark border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-accent"
    />
  )
}

export default React.memo(SearchBar)
