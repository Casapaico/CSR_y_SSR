'use client'

export default function MovieDetail({ movie, onClose }: { movie: any; onClose: () => void }) {
  return (
    <div style={{ minHeight: '400px', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      className="fixed inset-0 z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full p-6 relative border-2 border-gray-700">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
        <div className="flex gap-6">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
            alt={movie.Title}
            className="w-40 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{movie.Title}</h2>
            <p className="text-yellow-400 font-semibold">⭐ {movie.imdbRating}</p>
            <p className="text-gray-400 text-sm mt-1">{movie.Year} · {movie.Genre} · {movie.Runtime}</p>
            <p className="text-gray-300 mt-3 text-sm leading-relaxed">{movie.Plot}</p>
            <p className="text-gray-400 text-sm mt-2">🎭 {movie.Actors}</p>
            <p className="text-gray-400 text-sm">🎬 {movie.Director}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
