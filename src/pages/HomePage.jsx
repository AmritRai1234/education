import { Link } from 'react-router-dom';
import { getAllTracks } from '../data/lessons';
import { getStreak, getXP, getProgress } from '../data/progress';
import './HomePage.css';

export default function HomePage() {
  const tracks = getAllTracks();
  const streak = getStreak();
  const xp = getXP();
  const progress = getProgress();
  const completedLessons = progress.completedLessons.length;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-in">
            <div className="hero-badge">
              <span>🚀</span> Interactive Learning Platform
            </div>
            <h1 className="hero-title">
              Master Programming<br />
              <span className="hero-highlight">Interactively</span>
            </h1>
            <p className="hero-subtitle">
              Learn by solving bite-sized challenges, not watching hours of video.
              Build real intuition for Python, Rust, React, and C.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary btn-lg">
                Start Learning →
              </Link>
              <Link to="/playground" className="btn btn-secondary btn-lg">
                Try Playground
              </Link>
            </div>
          </div>

          <div className="hero-visual animate-in animate-in-delay-2">
            <div className="hero-code-card">
              <div className="code-card-header">
                <div className="code-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="code-card-label">challenge.py</span>
              </div>
              <div className="code-card-body">
                <code>
                  <span className="code-kw">def</span> <span className="code-fn">fibonacci</span>(n):
                  <br />{'    '}<span className="code-kw">if</span> n {'<='} <span className="code-num">1</span>:
                  <br />{'        '}<span className="code-kw">return</span> n
                  <br />{'    '}<span className="code-kw">return</span> <span className="code-fn">fibonacci</span>(n-<span className="code-num">1</span>) + <span className="code-fn">fibonacci</span>(n-<span className="code-num">2</span>)
                  <br />
                  <br /><span className="code-cm"># What does fibonacci(6) return?</span>
                </code>
              </div>
              <div className="code-card-footer">
                <span className="code-output">→ 8</span>
                <span className="code-badge-correct">✓ Correct!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-grid animate-in animate-in-delay-1">
            <div className="stat-item">
              <span className="stat-icon">📚</span>
              <div>
                <div className="stat-value">4</div>
                <div className="stat-label">Language Tracks</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🧩</span>
              <div>
                <div className="stat-value">17</div>
                <div className="stat-label">Interactive Lessons</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⚡</span>
              <div>
                <div className="stat-value">{xp}</div>
                <div className="stat-label">XP Earned</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🔥</span>
              <div>
                <div className="stat-value">{streak || '—'}</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title animate-in">How CodePath Works</h2>
          <p className="section-subtitle animate-in animate-in-delay-1">
            Every concept is taught through interactive challenges — not passive reading.
          </p>
          <div className="steps-grid">
            <div className="step-card animate-in animate-in-delay-1">
              <div className="step-number">1</div>
              <h3>Learn a Concept</h3>
              <p>Each step introduces one idea with visual examples and real code you can run.</p>
            </div>
            <div className="step-card animate-in animate-in-delay-2">
              <div className="step-number">2</div>
              <h3>Solve a Challenge</h3>
              <p>Immediately apply what you learned with multiple-choice, fill-in-the-code, or drag-to-order puzzles.</p>
            </div>
            <div className="step-card animate-in animate-in-delay-3">
              <div className="step-number">3</div>
              <h3>Get Instant Feedback</h3>
              <p>Mistakes are caught in real-time with helpful explanations — no waiting for a grader.</p>
            </div>
            <div className="step-card animate-in animate-in-delay-4">
              <div className="step-number">4</div>
              <h3>Track Your Progress</h3>
              <p>Earn XP, build streaks, and watch your mastery grow across all language tracks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Language Tracks */}
      <section className="tracks-section">
        <div className="container">
          <h2 className="section-title animate-in">Choose Your Track</h2>
          <p className="section-subtitle animate-in animate-in-delay-1">
            Four languages. One interactive format. Start anywhere.
          </p>
          <div className="tracks-grid">
            {tracks.map((track, i) => (
              <Link
                key={track.id}
                to={`/track/${track.id}`}
                className={`track-card animate-in animate-in-delay-${i + 1}`}
              >
                <div className="track-card-accent" style={{ background: track.color }}></div>
                <div className="track-card-content">
                  <div className="track-icon" style={{ background: track.colorBg }}>
                    {track.icon}
                  </div>
                  <h3 className="track-name">{track.name}</h3>
                  <p className="track-tagline">{track.tagline}</p>
                  <p className="track-desc">{track.description}</p>
                  <div className="track-meta">
                    <span className="track-lessons">{track.courses[0].lessonCount} lessons</span>
                    <span className="track-cta" style={{ color: track.color }}>
                      Start →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="logo-icon">⟨/⟩</span>
              <span className="logo-text">CodePath</span>
            </div>
            <p className="footer-text">Learn programming interactively. Built with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
