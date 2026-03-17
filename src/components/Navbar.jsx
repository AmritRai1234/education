import { Link, useLocation } from 'react-router-dom';
import { getStreak, getXP } from '../data/progress';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const streak = getStreak();
  const xp = getXP();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⟨/⟩</span>
          <span className="logo-text">CodePath</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/courses" className={`nav-link ${isActive('/courses') || location.pathname.startsWith('/track') ? 'active' : ''}`}>
            Courses
          </Link>
          <Link to="/playground" className={`nav-link ${isActive('/playground') ? 'active' : ''}`}>
            Playground
          </Link>
        </div>

        <div className="navbar-right">
          {streak > 0 && (
            <div className="streak-badge" title={`${streak} day streak!`}>
              <span className="streak-fire">🔥</span>
              <span className="streak-count">{streak}</span>
            </div>
          )}
          <div className="xp-badge" title={`${xp} XP earned`}>
            <span className="xp-icon">⚡</span>
            <span className="xp-count">{xp}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
