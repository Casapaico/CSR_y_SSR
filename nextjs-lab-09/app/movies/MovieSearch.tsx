'use client'
import { useState } from 'react'
import axios from 'axios'
import MovieDetail from './MovieDetail'

export default function MovieSearch({ apiKey }: { apiKey: string }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<any>(null)

  const search = async (q: string) => {
    setQuery(q)
    if (q.length < 2) return setResults([])
    setLoading(true)
    const res = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${q}`)
    setResults(res.data.Search ?? [])
    setLoading(false)
  }

  const openDetail = async (imdbID: string) => {
    const res = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
    setSelected(res.data)
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => search(e.target.value)}
        placeholder="🔍 Buscar película o serie..."
        className="w-full p-4 rounded-xl bg-gray-800 text-white border-2 border-gray-600 focus:border-blue-500 outline-none text-lg"
      />
      {loading && <p className="text-gray-400 mt-2">Buscando...</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {results.map((movie: any) => (
          <div
            key={movie.imdbID}
            onClick={() => openDetail(movie.imdbID)}
            className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition hover:ring-2 ring-blue-500"
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt={movie.Title}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold text-white text-sm truncate">{movie.Title}</p>
              <p className="text-gray-400 text-xs">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
      {selected && <MovieDetail movie={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
npx tsc --noEmit 2>&1 | head -50