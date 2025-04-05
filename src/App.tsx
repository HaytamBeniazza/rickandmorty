import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Heart, Users, AlignCenter as Alien } from 'lucide-react';
import { CharacterList } from './pages/CharacterList';
import { CharacterDetail } from './pages/CharacterDetail';
import { Favorites } from './pages/Favorites';

function App() {
  const linkBaseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105";
  const inactiveLinkClasses = "text-gray-400 hover:text-green-300 hover:bg-green-900/40";
  const activeLinkClasses = "text-green-400 font-semibold bg-green-500/20 shadow-md shadow-green-500/10";

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-200">

        <nav className="bg-black/60 backdrop-blur-xl border-b border-green-500/25 sticky top-0 z-50 shadow-lg shadow-black/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">

              <NavLink
                to="/"
                className="flex items-center space-x-3 text-2xl font-bold transition-all duration-300 ease-in-out hover:scale-105 transform group focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded-lg p-1"
              >
                <Alien className="w-9 h-9 text-green-500 transition-transform duration-500 group-hover:rotate-[360deg]" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 hover:from-green-300 hover:to-cyan-300 transition-all duration-300">
                  Rick & Morty
                </span>
              </NavLink>

              <div className="flex space-x-3 sm:space-x-5">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                  }
                >
                  <Users className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden sm:inline">Characters</span>
                </NavLink>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                  }
                >
                  <Heart className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden sm:inline">Favorites</span>
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800/50 mt-16">
          Data courtesy of the Rick and Morty API | Explorer App {new Date().getFullYear()}
        </footer>

      </div>
    </Router>
  );
}

export default App;