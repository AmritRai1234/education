import { Link, useParams } from 'react-router-dom';
import { getTrack } from '../data/lessons';
import { isLessonComplete, getLessonProgress } from '../data/progress';
import './TrackPage.css';

// Lesson card icons & colors based on lesson title keywords
const LESSON_VISUALS = {
  // Algebra
  'Visual Equations': { icon: '⚖️', gradient: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)', isNew: true },
  'Solving Equations': { icon: '🔢', gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)', isNew: true },
  'Graphing Lines': { icon: '📈', gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', isNew: false },
  'Quadratics': { icon: '📊', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', isNew: true },
  // Python
  'Hello, World!': { icon: '👋', gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)', isNew: false },
  'Variables & Types': { icon: '📦', gradient: 'linear-gradient(135deg, #6ee7b7 0%, #059669 100%)', isNew: false },
  'Lists & Loops': { icon: '🔁', gradient: 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)', isNew: false },
  'If / Else': { icon: '🔀', gradient: 'linear-gradient(135deg, #a7f3d0 0%, #34d399 100%)', isNew: false },
  'Functions': { icon: '⚡', gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', isNew: false },
  // Rust
  'Hello, Cargo!': { icon: '📦', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', isNew: false },
  'Ownership': { icon: '🔐', gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)', isNew: false },
  'Types & Structs': { icon: '🧱', gradient: 'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)', isNew: false },
  'Pattern Matching': { icon: '🎯', gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', isNew: false },
  // React
  'Components': { icon: '🧩', gradient: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)', isNew: false },
  'Props & Data': { icon: '📡', gradient: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)', isNew: false },
  'State & Hooks': { icon: '🪝', gradient: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)', isNew: false },
  // C
  'Hello, C!': { icon: '⚙️', gradient: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)', isNew: false },
  'Pointers': { icon: '👉', gradient: 'linear-gradient(135deg, #a1a1aa 0%, #71717a 100%)', isNew: false },
  'Memory': { icon: '🧠', gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)', isNew: false },
  'Arrays & Strings': { icon: '📝', gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)', isNew: false },
  // Arithmetic
  'Number Sense': { icon: '🔢', gradient: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', isNew: true },
  'Addition & Subtraction': { icon: '➕', gradient: 'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)', isNew: true },
  'Multiplication': { icon: '✖️', gradient: 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)', isNew: true },
  'Fractions': { icon: '🥧', gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)', isNew: true },
};

function getLessonVisual(title) {
  return LESSON_VISUALS[title] || {
    icon: '📖',
    gradient: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    isNew: false
  };
}

export default function TrackPage() {
  const { trackId } = useParams();
  const track = getTrack(trackId);

  if (!track) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1>Track not found</h1>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="track-page">
      {/* Learning Paths Header */}
      <div className="track-lp-header">
        <div className="container">
          <h1 className="track-lp-title">Learning Paths</h1>
          <p className="track-lp-sub">Step-by-step paths to mastery</p>
        </div>
      </div>

      {/* Course Sections */}
      <div className="container">
        {track.courses.map(course => (
          <div key={course.id} className="track-section animate-in">
            {/* Section Header with icon */}
            <div className="track-section-header">
              <div className="track-section-icon" style={{ background: track.colorBg }}>
                {track.icon}
              </div>
              <div className="track-section-info">
                <h2 className="track-section-title">{course.title}</h2>
                <p className="track-section-sub">{course.subtitle}</p>
              </div>
            </div>

            {/* Horizontal Course Cards */}
            <div className="track-cards-row">
              {course.lessons.map((lesson) => {
                const complete = isLessonComplete(lesson.id);
                const progress = getLessonProgress(lesson.id, lesson.steps.length);
                const visual = getLessonVisual(lesson.title);

                return (
                  <Link
                    key={lesson.id}
                    to={`/track/${trackId}/${course.id}/${lesson.id}`}
                    className={`track-card ${complete ? 'completed' : ''}`}
                  >
                    {/* NEW Badge */}
                    {visual.isNew && !complete && (
                      <span className="track-card-badge">NEW</span>
                    )}
                    {/* Completed check */}
                    {complete && (
                      <span className="track-card-check">✓</span>
                    )}

                    {/* Icon */}
                    <div
                      className="track-card-icon"
                      style={{ background: visual.gradient }}
                    >
                      <span className="track-card-emoji">{visual.icon}</span>
                    </div>

                    {/* Progress bar */}
                    {progress > 0 && !complete && (
                      <div className="track-card-progress">
                        <div
                          className="track-card-progress-fill"
                          style={{ width: `${progress}%`, background: track.color }}
                        ></div>
                      </div>
                    )}

                    {/* Title */}
                    <span className="track-card-title">{lesson.title}</span>
                    <span className="track-card-steps">{lesson.steps.length} steps</span>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="track-section-divider"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
