import axios from 'axios'
import MovieSearch from './MovieSearch'

const API_KEY = process.env.OMDB_API_KEY

async function getPopularMovies() {
  const searches = ['marvel', 'batman', 'star wars']
  const results = await Promise.all(
    searches.map(s =>
      axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${s}`)
        .then(r => r.data.Search?.slice(0, 3) ?? [])
    )
  )
  return results.flat()
}

export default async function MoviesPage() {
  const movies = await getPopularMovies()

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-2">🎬 Galería de Películas</h1>
      <p className="text-center text-gray-400 mb-8">Potenciado por OMDb API</p>
      <MovieSearch apiKey={process.env.NEXT_PUBLIC_OMDB_API_KEY ?? ''} />
      <h2 className="text-2xl font-semibold mt-12 mb-4">🔥 Populares (SSR)</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie: any) => (
          <div key={movie.imdbID} className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />
            <div className="p-3">
              <p className="font-semibold text-sm">{movie.Title}</p>
              <p className="text-gray-400 text-xs">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
