import { Link } from 'react-router-dom';
import { getAllTracks } from '../data/lessons';
import { getTrackProgress } from '../data/progress';
import './CoursesPage.css';

export default function CoursesPage() {
  const tracks = getAllTracks();

  return (
    <div className="courses-page">
      <div className="container">
        <div className="courses-header animate-in">
          <h1>All Courses</h1>
          <p>Pick a language track and start solving interactive challenges.</p>
        </div>

        <div className="courses-list">
          {tracks.map((track, ti) => {
            const allLessons = track.courses.flatMap(c => c.lessons);
            const progress = getTrackProgress(track.id, allLessons);
            return (
              <div key={track.id} className={`course-track-section animate-in animate-in-delay-${ti + 1}`}>
                <div className="course-track-header">
                  <div className="course-track-icon" style={{ background: track.colorBg }}>
                    {track.icon}
                  </div>
                  <div>
                    <h2 className="course-track-title">{track.name}</h2>
                    <p className="course-track-tagline">{track.tagline}</p>
                  </div>
                  {progress > 0 && (
                    <div className="course-track-progress">
                      <div className="progress-bar" style={{ width: 120 }}>
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${progress}%`, background: track.color }}
                        ></div>
                      </div>
                      <span className="progress-label">{progress}%</span>
                    </div>
                  )}
                </div>

                <div className="course-cards">
                  {track.courses.map(course => (
                    <div key={course.id} className="course-card-wrap">
                      <h3 className="course-section-title">{course.title}</h3>
                      <p className="course-section-sub">{course.subtitle}</p>
                      <div className="lesson-cards">
                        {course.lessons.map((lesson, li) => (
                          <Link
                            key={lesson.id}
                            to={`/track/${track.id}/${course.id}/${lesson.id}`}
                            className="lesson-card"
                          >
                            <div
                              className="lesson-card-num"
                              style={{ background: track.colorBg, color: track.color }}
                            >
                              {li + 1}
                            </div>
                            <div className="lesson-card-info">
                              <span className="lesson-card-title">{lesson.title}</span>
                              <span className="lesson-card-steps">
                                {lesson.steps.length} steps
                              </span>
                            </div>
                            <span className="lesson-card-arrow" style={{ color: track.color }}>→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
