import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTrack, getCourse, getLesson } from '../data/lessons';
import { completeStep, completeLesson } from '../data/progress';
import { BalanceScale, NumberLine, CoordinatePlane, EquationSteps, EquationSlider, BlockGroups, FractionCircle, MultiplicationGrid } from '../components/MathVisuals';
import '../components/MathVisuals.css';
import './LessonViewer.css';

// Sub-component for the interactive slider + graph combo
function SliderGraph({ data }) {
  const [slope, setSlope] = useState(data.initialSlope);
  const [intercept, setIntercept] = useState(data.initialIntercept);

  return (
    <div className="math-interactive graph-split-layout">
      <div className="graph-split-left">
        <CoordinatePlane
          lines={[{ slope, intercept, label: `y = ${slope}x ${intercept >= 0 ? '+' : '-'} ${Math.abs(intercept)}` }]}
          points={[]}
          showGrid={true}
        />
      </div>
      <div className="graph-split-right">
        <div className="graph-controls-title">✨ Controls</div>
        <div className="eq-slider-equation">
          y = {slope}x {intercept >= 0 ? '+' : '-'} {Math.abs(intercept)}
        </div>
        <div className="graph-control-group">
          <label className="graph-control-label">Slope (m)</label>
          <div className="eq-slider-control">
            <input type="range" className="eq-slider-input" min={data.slopeRange[0]} max={data.slopeRange[1]} step={0.5} value={slope} onChange={e => setSlope(parseFloat(e.target.value))} />
            <span className="eq-slider-value">{slope}</span>
          </div>
        </div>
        <div className="graph-control-group">
          <label className="graph-control-label">Y-Intercept (b)</label>
          <div className="eq-slider-control">
            <input type="range" className="eq-slider-input" min={data.interceptRange[0]} max={data.interceptRange[1]} step={1} value={intercept} onChange={e => setIntercept(parseFloat(e.target.value))} />
            <span className="eq-slider-value">{intercept}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for equation slider with computed result
function MathSlider({ data }) {
  const [value, setValue] = useState(data.initialValue ?? data.min);

  const computeResult = (v) => {
    if (data.formatResult === 'linear') return data.slope * v + data.intercept;
    if (data.formatResult === 'quadratic') return v * v;
    return v;
  };

  const eqDisplay = data.equation.replace('RESULT', computeResult(value)).replace(data.variable, value);

  return (
    <div className="math-interactive">
      <div className="math-interactive-title">Interactive Explorer</div>
      <div className="eq-slider-equation">{eqDisplay}</div>
      <div className="eq-slider-control">
        <span className="eq-slider-label">{data.variable} =</span>
        <input type="range" className="eq-slider-input" min={data.min} max={data.max} step={data.step || 1} value={value} onChange={e => setValue(parseFloat(e.target.value))} />
        <span className="eq-slider-value">{value}</span>
      </div>
      <div className="eq-slider-result">
        Result: <strong>{computeResult(value)}</strong>
      </div>
    </div>
  );
}

// Sub-component for equation steps with "Next Step" progression
function SteppedEquation({ steps }) {
  const [currentEqStep, setCurrentEqStep] = useState(0);

  return (
    <div className="math-interactive">
      <div className="math-interactive-title">Step-by-Step Solution</div>
      <EquationSteps steps={steps} currentStep={currentEqStep} onStep={setCurrentEqStep} />
    </div>
  );
}

export default function LessonViewer() {
  const { trackId, courseId, lessonId } = useParams();

  const track = getTrack(trackId);
  const course = getCourse(trackId, courseId);
  const lesson = getLesson(trackId, courseId, lessonId);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [fillAnswer, setFillAnswer] = useState('');
  const [fillChecked, setFillChecked] = useState(false);
  const [dragItems, setDragItems] = useState(null);
  const [dragChecked, setDragChecked] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!track || !course || !lesson) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1>Lesson not found</h1>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Courses
        </Link>
      </div>
    );
  }

  const step = lesson.steps[currentStep];
  const totalSteps = lesson.steps.length;
  const isInfoStep = step.type === 'info' || step.type === 'info-visual';
  const progress = ((currentStep + (isCorrect || isInfoStep ? 1 : 0)) / totalSteps) * 100;

  const resetStepState = () => {
    setSelectedChoice(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setFillAnswer('');
    setFillChecked(false);
    setDragItems(null);
    setDragChecked(false);
  };

  const goNext = () => {
    completeStep(lesson.id, currentStep);

    if (currentStep < totalSteps - 1) {
      resetStepState();
      setCurrentStep(prev => prev + 1);
    } else {
      completeLesson(lesson.id);
      setCompleted(true);
    }
  };

  const handleChoice = (index) => {
    if (isCorrect !== null) return;
    setSelectedChoice(index);
    const correct = index === step.correctIndex;
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  const handleFillCheck = () => {
    setFillChecked(true);
    if (fillAnswer.trim().toLowerCase() === step.answer.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const initDrag = () => {
    if (!dragItems && step.type === 'drag-order') {
      const shuffled = [...step.items].sort(() => Math.random() - 0.5);
      setDragItems(shuffled);
    }
  };

  const moveDragItem = (fromIdx, direction) => {
    if (!dragItems) return;
    const toIdx = fromIdx + direction;
    if (toIdx < 0 || toIdx >= dragItems.length) return;
    const newItems = [...dragItems];
    [newItems[fromIdx], newItems[toIdx]] = [newItems[toIdx], newItems[fromIdx]];
    setDragItems(newItems);
  };

  const checkDragOrder = () => {
    if (!dragItems) return;
    const isOrderCorrect = step.correctOrder.every(
      (correctIdx, i) => dragItems[i] === step.items[correctIdx]
    );
    setDragChecked(true);
    setIsCorrect(isOrderCorrect);
  };

  // Initialize drag items on first render
  if (step.type === 'drag-order' && !dragItems) {
    initDrag();
  }

  if (completed) {
    return (
      <div className="lesson-complete-screen">
        <div className="lesson-complete-inner animate-in">
          <div className="complete-checkmark">✓</div>
          <h1>Lesson Complete! 🎉</h1>
          <p className="complete-subtitle">
            You finished <strong>{lesson.title}</strong> — great work!
          </p>
          <div className="complete-xp">+{totalSteps * 10 + 50} XP</div>
          <div className="complete-actions">
            <Link to={`/track/${trackId}`} className="btn btn-primary btn-lg">
              Back to {track.name} →
            </Link>
            <Link to="/courses" className="btn btn-secondary btn-lg">
              All Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Helper to get step badge label
  const getStepBadge = () => {
    if (step.type === 'info') return '📖 Concept';
    if (step.type === 'info-visual') {
      if (step.visualType === 'balance-scale') return '⚖️ Visual Balance';
      if (step.visualType === 'equation-steps') return '🔢 Step by Step';
      if (step.visualType === 'coordinate-plane') return '📊 Graph';
      if (step.visualType === 'slider' || step.visualType === 'slider-graph') return '🎚️ Interactive';
      if (step.visualType === 'number-line') return '📏 Number Line';
      if (step.visualType === 'block-groups') return '🧱 Visual Blocks';
      if (step.visualType === 'fraction-circle') return '🥧 Fraction';
      if (step.visualType === 'multiplication-grid') return '⊞ Grid';
      return '✨ Visual';
    }
    if (step.type === 'multiple-choice') return '🧩 Challenge';
    if (step.type === 'fill-code') return '✏️ Fill in the Answer';
    if (step.type === 'drag-order') return '🔀 Order the Code';
    return '📝 Exercise';
  };

  return (
    <div className="lesson-viewer">
      {/* Top Bar */}
      <div className="lesson-topbar">
        <Link to={`/track/${trackId}`} className="lesson-back">
          ← {track.name}
        </Link>
        <div className="lesson-title-bar">
          <span className="lesson-title-text">{lesson.title}</span>
          <span className="lesson-step-count">
            {currentStep + 1} / {totalSteps}
          </span>
        </div>
        <div className="lesson-progress-track">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%`, background: track.color }}
            ></div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="lesson-content">
        <div className="lesson-step animate-in" key={currentStep}>

          {/* ===== VISUAL STEPS: Split layout (visual LEFT, text RIGHT) ===== */}
          {step.type === 'info-visual' ? (
            <div className="visual-split-layout">
              <div className="visual-split-left">
                {step.visualType === 'balance-scale' && (
                  <BalanceScale
                    leftItems={step.scaleData.left}
                    rightItems={step.scaleData.right}
                  />
                )}
                {step.visualType === 'equation-steps' && (
                  <SteppedEquation steps={step.equationSteps} />
                )}
                {step.visualType === 'coordinate-plane' && (
                  <CoordinatePlane
                    lines={step.graphData.lines}
                    points={step.graphData.points}
                    showGrid={step.graphData.showGrid}
                    yRange={step.graphData.yRange}
                  />
                )}
                {step.visualType === 'slider' && (
                  <MathSlider data={step.sliderData} />
                )}
                {step.visualType === 'slider-graph' && (
                  <SliderGraph data={step.sliderGraphData} />
                )}
                {step.visualType === 'number-line' && (
                  <NumberLine
                    min={step.numberLineData.min}
                    max={step.numberLineData.max}
                    points={step.numberLineData.points}
                  />
                )}
                {step.visualType === 'block-groups' && (
                  <BlockGroups
                    groups={step.blockData.groups}
                    operation={step.blockData.operation}
                    showTotal={step.blockData.showTotal}
                  />
                )}
                {step.visualType === 'fraction-circle' && (
                  <FractionCircle
                    numerator={step.fractionData.numerator}
                    denominator={step.fractionData.denominator}
                    color={step.fractionData.color}
                    label={step.fractionData.label}
                  />
                )}
                {step.visualType === 'multiplication-grid' && (
                  <MultiplicationGrid
                    rows={step.gridData.rows}
                    cols={step.gridData.cols}
                    color={step.gridData.color}
                    showProduct={step.gridData.showProduct}
                  />
                )}
              </div>
              <div className="visual-split-right">
                <div className="step-badge" style={{ background: track.colorBg, color: track.color }}>
                  {getStepBadge()}
                </div>
                <h2 className="step-title">{step.title}</h2>
                <p className="step-content">{step.content}</p>
              </div>
            </div>
          ) : (
            /* ===== NON-VISUAL STEPS: Normal stacked layout ===== */
            <>
              <div className="step-badge" style={{ background: track.colorBg, color: track.color }}>
                {getStepBadge()}
              </div>
              <h2 className="step-title">{step.title}</h2>
              <p className="step-content">{step.content}</p>
            </>
          )}

          {/* Info Step with Code */}
          {step.type === 'info' && step.visual === 'code' && (
            <div className="step-code-block">
              <div className="code-block-header">
                <div className="code-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
              </div>
              <pre className="code-block-code">
                <code>{step.code}</code>
              </pre>
              {step.output && (
                <div className="code-block-output">
                  <span className="output-label">Output:</span>
                  <pre>{step.output}</pre>
                </div>
              )}
            </div>
          )}

          {/* ===== END MATH VISUALS ===== */}

          {/* Multiple Choice */}
          {step.type === 'multiple-choice' && (
            <div className="choices-grid">
              {step.choices.map((choice, i) => {
                let choiceClass = 'choice-btn';
                if (selectedChoice === i) {
                  choiceClass += isCorrect ? ' correct' : ' incorrect';
                } else if (showExplanation && i === step.correctIndex) {
                  choiceClass += ' correct-reveal';
                }
                return (
                  <button
                    key={i}
                    className={choiceClass}
                    onClick={() => handleChoice(i)}
                    disabled={isCorrect !== null}
                  >
                    <span className="choice-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="choice-text">{choice}</span>
                    {selectedChoice === i && isCorrect && (
                      <span className="choice-icon">✓</span>
                    )}
                    {selectedChoice === i && !isCorrect && isCorrect !== null && (
                      <span className="choice-icon">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Fill in Code */}
          {step.type === 'fill-code' && (
            <div className="fill-code-section">
              <div className="fill-code-template">
                <pre>
                  {step.template.split('___').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <input
                          type="text"
                          className={`fill-input ${fillChecked ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                          value={fillAnswer}
                          onChange={e => setFillAnswer(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && !fillChecked && handleFillCheck()}
                          placeholder="???"
                          disabled={fillChecked}
                          autoFocus
                        />
                      )}
                    </span>
                  ))}
                </pre>
              </div>
              {!fillChecked && (
                <div className="fill-actions">
                  <button
                    className="btn btn-primary"
                    onClick={handleFillCheck}
                    disabled={!fillAnswer.trim()}
                  >
                    Check Answer
                  </button>
                  {step.hint && (
                    <p className="fill-hint">💡 Hint: {step.hint}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Drag to Order */}
          {step.type === 'drag-order' && dragItems && (
            <div className="drag-section">
              <div className="drag-items">
                {dragItems.map((item, i) => (
                  <div
                    key={item}
                    className={`drag-item ${dragChecked ? (
                      item === step.items[step.correctOrder[i]] ? 'correct' : 'incorrect'
                    ) : ''}`}
                  >
                    <span className="drag-num">{i + 1}</span>
                    <code className="drag-code">{item}</code>
                    {!dragChecked && (
                      <div className="drag-arrows">
                        <button
                          className="drag-arrow-btn"
                          onClick={() => moveDragItem(i, -1)}
                          disabled={i === 0}
                        >▲</button>
                        <button
                          className="drag-arrow-btn"
                          onClick={() => moveDragItem(i, 1)}
                          disabled={i === dragItems.length - 1}
                        >▼</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {!dragChecked && (
                <button className="btn btn-primary" onClick={checkDragOrder}>
                  Check Order
                </button>
              )}
            </div>
          )}

          {/* Feedback */}
          {showExplanation && step.explanation && (
            <div className={`feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
              <div className="feedback-header">
                {isCorrect ? '✅ Correct!' : '❌ Not quite!'}
              </div>
              <p>{step.explanation}</p>
            </div>
          )}

          {fillChecked && (
            <div className={`feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
              <div className="feedback-header">
                {isCorrect ? '✅ Correct!' : `❌ The answer was: ${step.answer}`}
              </div>
            </div>
          )}

          {dragChecked && (
            <div className={`feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
              <div className="feedback-header">
                {isCorrect ? '✅ Perfect order!' : '❌ Not the right order. Check the correct sequence above.'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="lesson-bottom">
        <div className="lesson-bottom-inner">
          {isInfoStep || isCorrect !== null || fillChecked || dragChecked ? (
            <button
              className="btn btn-primary btn-lg lesson-continue-btn"
              onClick={goNext}
            >
              {currentStep < totalSteps - 1 ? 'Continue →' : 'Complete Lesson 🎉'}
            </button>
          ) : (
            <div className="lesson-bottom-hint">
              Solve the challenge to continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
