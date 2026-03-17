import { useState } from 'react';

// Interactive Balance Scale for equation solving
export function BalanceScale({ leftItems, rightItems, onBalance, solved }) {
  const leftTotal = leftItems.reduce((s, i) => s + i.value, 0);
  const rightTotal = rightItems.reduce((s, i) => s + i.value, 0);
  const diff = leftTotal - rightTotal;
  const angle = Math.max(-15, Math.min(15, diff * 3));
  const balanced = Math.abs(diff) < 0.01;

  return (
    <div className="balance-scale-wrap">
      <svg viewBox="0 0 400 260" className="balance-svg">
        {/* Base */}
        <polygon points="160,250 240,250 210,230 190,230" fill="#d4a574" stroke="#b08050" strokeWidth="2" />
        <rect x="196" y="100" width="8" height="135" rx="3" fill="#c49a6c" stroke="#b08050" strokeWidth="1" />
        
        {/* Fulcrum triangle */}
        <polygon points="200,100 188,118 212,118" fill="#e8c89e" stroke="#b08050" strokeWidth="2" />

        {/* Beam */}
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '200px 105px', transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <rect x="40" y="100" width="320" height="8" rx="4" fill="#c49a6c" stroke="#b08050" strokeWidth="1.5" />
          
          {/* Left pan */}
          <line x1="80" y1="108" x2="60" y2="145" stroke="#a0825c" strokeWidth="1.5" />
          <line x1="80" y1="108" x2="100" y2="145" stroke="#a0825c" strokeWidth="1.5" />
          <ellipse cx="80" cy="148" rx="45" ry="10" fill="#e8d5b8" stroke="#b08050" strokeWidth="1.5" />
          
          {/* Left items */}
          {leftItems.map((item, i) => (
            <g key={`l-${i}`}>
              <rect
                x={55 + i * 22}
                y={125 - (item.isVar ? 8 : 0)}
                width={20}
                height={20}
                rx={item.isVar ? 4 : 2}
                fill={item.isVar ? '#6366f1' : '#10b981'}
                stroke={item.isVar ? '#4f46e5' : '#059669'}
                strokeWidth="1.5"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}
              />
              <text
                x={65 + i * 22}
                y={139 - (item.isVar ? 8 : 0)}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
              >
                {item.label}
              </text>
            </g>
          ))}
          
          {/* Right pan */}
          <line x1="320" y1="108" x2="300" y2="145" stroke="#a0825c" strokeWidth="1.5" />
          <line x1="320" y1="108" x2="340" y2="145" stroke="#a0825c" strokeWidth="1.5" />
          <ellipse cx="320" cy="148" rx="45" ry="10" fill="#e8d5b8" stroke="#b08050" strokeWidth="1.5" />
          
          {/* Right items */}
          {rightItems.map((item, i) => (
            <g key={`r-${i}`}>
              <rect
                x={295 + i * 22}
                y={125 - (item.isVar ? 8 : 0)}
                width={20}
                height={20}
                rx={item.isVar ? 4 : 2}
                fill={item.isVar ? '#6366f1' : '#10b981'}
                stroke={item.isVar ? '#4f46e5' : '#059669'}
                strokeWidth="1.5"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}
              />
              <text
                x={305 + i * 22}
                y={139 - (item.isVar ? 8 : 0)}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
              >
                {item.label}
              </text>
            </g>
          ))}
        </g>

        {/* Balance indicator */}
        {balanced && (
          <g>
            <circle cx="200" cy="80" r="14" fill="#10b981" style={{ animation: 'scaleIn 0.4s ease' }} />
            <text x="200" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">✓</text>
          </g>
        )}
      </svg>
      
      <div className="balance-equation">
        <span className="balance-side">
          {leftItems.map(i => i.label).join(' + ')} = {leftTotal}
        </span>
        <span className={`balance-status ${balanced ? 'balanced' : 'unbalanced'}`}>
          {balanced ? '⚖️ Balanced!' : diff > 0 ? '← Heavier on left' : '→ Heavier on right'}
        </span>
        <span className="balance-side">
          {rightItems.map(i => i.label).join(' + ')} = {rightTotal}
        </span>
      </div>
    </div>
  );
}

// Interactive Number Line
export function NumberLine({ min, max, points, activePoint, onPointDrag, label }) {
  const width = 500;
  const padding = 40;
  const range = max - min;
  const toX = (val) => padding + ((val - min) / range) * (width - 2 * padding);
  const [dragging, setDragging] = useState(false);

  const handleMove = (e) => {
    if (!dragging || !onPointDrag) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const val = min + ((x - padding) / (width - 2 * padding)) * range;
    const snapped = Math.round(val * 2) / 2;
    onPointDrag(Math.max(min, Math.min(max, snapped)));
  };

  return (
    <div className="numberline-wrap">
      {label && <div className="numberline-label">{label}</div>}
      <svg
        viewBox={`0 0 ${width} 80`}
        className="numberline-svg"
        onMouseMove={handleMove}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
      >
        {/* Line */}
        <line x1={padding} y1="40" x2={width - padding} y2="40" stroke="#d1d5db" strokeWidth="2" />
        
        {/* Ticks and labels */}
        {Array.from({ length: range + 1 }, (_, i) => min + i).map(val => (
          <g key={val}>
            <line x1={toX(val)} y1="32" x2={toX(val)} y2="48" stroke="#9ca3af" strokeWidth={val === 0 ? 2 : 1} />
            <text x={toX(val)} y="65" textAnchor="middle" fill="#6b7280" fontSize="11" fontFamily="Inter, sans-serif">
              {val}
            </text>
          </g>
        ))}

        {/* Points */}
        {points.map((pt, i) => (
          <g key={i}>
            <circle
              cx={toX(pt.value)}
              cy="40"
              r={pt.draggable ? 10 : 7}
              fill={pt.color || '#6366f1'}
              stroke="white"
              strokeWidth="2"
              style={{
                cursor: pt.draggable ? 'grab' : 'default',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',
                transition: pt.draggable && dragging ? 'none' : 'cx 0.3s ease'
              }}
              onMouseDown={() => pt.draggable && setDragging(true)}
            />
            {pt.label && (
              <text
                x={toX(pt.value)}
                y="20"
                textAnchor="middle"
                fill={pt.color || '#6366f1'}
                fontSize="12"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

// Interactive Coordinate Plane with graphing
export function CoordinatePlane({ lines, points, xRange, yRange, showGrid, interactive, onPlotPoint }) {
  const size = 480;
  const padding = 40;
  const xMin = xRange?.[0] ?? -5;
  const xMax = xRange?.[1] ?? 5;
  const yMin = yRange?.[0] ?? -5;
  const yMax = yRange?.[1] ?? 5;

  const toSvgX = (x) => padding + ((x - xMin) / (xMax - xMin)) * (size - 2 * padding);
  const toSvgY = (y) => padding + ((yMax - y) / (yMax - yMin)) * (size - 2 * padding);

  const handleClick = (e) => {
    if (!interactive || !onPlotPoint) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;
    const x = xMin + ((svgX - padding) / (size - 2 * padding)) * (xMax - xMin);
    const y = yMax - ((svgY - padding) / (size - 2 * padding)) * (yMax - yMin);
    onPlotPoint(Math.round(x), Math.round(y));
  };

  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="coord-plane-wrap">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="coord-svg"
        onClick={handleClick}
        style={{ cursor: interactive ? 'crosshair' : 'default' }}
      >
        {/* Grid */}
        {showGrid && Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i).map(x => (
          <line key={`gx-${x}`} x1={toSvgX(x)} y1={padding} x2={toSvgX(x)} y2={size - padding}
            stroke={x === 0 ? '#d1d5db' : '#f3f4f6'} strokeWidth={x === 0 ? 1.5 : 1} />
        ))}
        {showGrid && Array.from({ length: yMax - yMin + 1 }, (_, i) => yMin + i).map(y => (
          <line key={`gy-${y}`} x1={padding} y1={toSvgY(y)} x2={size - padding} y2={toSvgY(y)}
            stroke={y === 0 ? '#d1d5db' : '#f3f4f6'} strokeWidth={y === 0 ? 1.5 : 1} />
        ))}

        {/* Axes */}
        <line x1={toSvgX(xMin)} y1={toSvgY(0)} x2={toSvgX(xMax)} y2={toSvgY(0)} stroke="#374151" strokeWidth="2" />
        <line x1={toSvgX(0)} y1={toSvgY(yMin)} x2={toSvgX(0)} y2={toSvgY(yMax)} stroke="#374151" strokeWidth="2" />

        {/* Axis labels */}
        {Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i).filter(v => v !== 0).map(x => (
          <text key={`xl-${x}`} x={toSvgX(x)} y={toSvgY(0) + 15} textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="Inter">{x}</text>
        ))}
        {Array.from({ length: yMax - yMin + 1 }, (_, i) => yMin + i).filter(v => v !== 0).map(y => (
          <text key={`yl-${y}`} x={toSvgX(0) - 12} y={toSvgY(y) + 3} textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="Inter">{y}</text>
        ))}

        {/* Lines */}
        {lines?.map((line, li) => {
          const pts = [];
          for (let x = xMin; x <= xMax; x += 0.1) {
            const y = line.slope * x + line.intercept;
            if (y >= yMin && y <= yMax) {
              pts.push(`${toSvgX(x)},${toSvgY(y)}`);
            }
          }
          return (
            <g key={li}>
              <polyline
                points={pts.join(' ')}
                fill="none"
                stroke={colors[li % colors.length]}
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ animation: 'fadeIn 0.8s ease' }}
              />
              {line.label && pts.length > 0 && (
                <text
                  x={toSvgX(xMax - 1)}
                  y={toSvgY(line.slope * (xMax - 1) + line.intercept) - 10}
                  fill={colors[li % colors.length]}
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Inter"
                >
                  {line.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Points */}
        {points?.map((pt, i) => (
          <g key={i} style={{ animation: 'scaleIn 0.3s ease both', animationDelay: `${i * 0.1}s` }}>
            <circle
              cx={toSvgX(pt.x)}
              cy={toSvgY(pt.y)}
              r="5"
              fill={pt.color || colors[0]}
              stroke="white"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))' }}
            />
            {pt.label && (
              <text x={toSvgX(pt.x) + 8} y={toSvgY(pt.y) - 8} fill={pt.color || colors[0]}
                fontSize="10" fontWeight="600" fontFamily="Inter">{pt.label}</text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

// Interactive Equation Slider
export function EquationSlider({ equation, variable, min, max, step, initialValue, onChange, formatResult }) {
  const [value, setValue] = useState(initialValue ?? min);

  const handleChange = (e) => {
    const v = parseFloat(e.target.value);
    setValue(v);
    onChange?.(v);
  };

  const result = formatResult ? formatResult(value) : value;

  return (
    <div className="eq-slider-wrap">
      <div className="eq-slider-equation">{equation.replace(variable, value)}</div>
      <div className="eq-slider-control">
        <span className="eq-slider-label">{variable} =</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step || 1}
          value={value}
          onChange={handleChange}
          className="eq-slider-input"
        />
        <span className="eq-slider-value">{value}</span>
      </div>
      {result !== undefined && (
        <div className="eq-slider-result">
          Result: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}

// Visual Equation Steps — shows step by step equation solving
export function EquationSteps({ steps, currentStep, onStep }) {
  return (
    <div className="eq-steps-wrap">
      {steps.map((s, i) => (
        <div
          key={i}
          className={`eq-step ${i <= currentStep ? 'visible' : 'hidden'} ${i === currentStep ? 'current' : ''}`}
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          <div className="eq-step-number">{i + 1}</div>
          <div className="eq-step-content">
            <div className="eq-step-equation">{s.equation}</div>
            {s.action && <div className="eq-step-action">{s.action}</div>}
          </div>
        </div>
      ))}
      {currentStep < steps.length - 1 && (
        <button className="btn btn-primary eq-step-next" onClick={() => onStep(currentStep + 1)}>
          Next Step →
        </button>
      )}
    </div>
  );
}

// Block Groups — visualize addition/multiplication with colored blocks
export function BlockGroups({ groups, operation, showTotal }) {
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  const total = operation === '×'
    ? groups.reduce((acc, g) => acc * g.count, 1)
    : groups.reduce((acc, g) => acc + g.count, 0);
  const blockSize = 32;
  const gap = 4;

  return (
    <div className="block-groups-wrap">
      <div className="block-groups-visual">
        {groups.map((group, gi) => (
          <div key={gi} className="block-group" style={{ '--group-color': colors[gi % colors.length] }}>
            <div className="block-group-label">{group.label || group.count}</div>
            <div className="block-group-blocks">
              {Array.from({ length: group.count }, (_, bi) => (
                <div
                  key={bi}
                  className="block-item"
                  style={{
                    background: colors[gi % colors.length],
                    width: blockSize,
                    height: blockSize,
                    animationDelay: `${(gi * group.count + bi) * 0.05}s`
                  }}
                >
                  {group.blockLabel || ''}
                </div>
              ))}
            </div>
            {gi < groups.length - 1 && (
              <div className="block-group-op">{operation}</div>
            )}
          </div>
        ))}
      </div>
      {showTotal && (
        <div className="block-groups-total">
          <span className="block-total-eq">
            {groups.map(g => g.label || g.count).join(` ${operation} `)} = 
          </span>
          <span className="block-total-val">{total}</span>
        </div>
      )}
    </div>
  );
}

// Fraction Circle — interactive pie chart for fractions
export function FractionCircle({ numerator, denominator, color, label }) {
  const radius = 80;
  const cx = 100;
  const cy = 100;
  const fraction = numerator / denominator;
  
  const slices = [];
  for (let i = 0; i < denominator; i++) {
    const startAngle = (i / denominator) * 360 - 90;
    const endAngle = ((i + 1) / denominator) * 360 - 90;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    const filled = i < numerator;
    
    slices.push(
      <path
        key={i}
        d={`M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`}
        fill={filled ? (color || '#6366f1') : '#f1f5f9'}
        stroke="white"
        strokeWidth="2"
        style={{
          transition: 'fill 0.3s ease',
          filter: filled ? 'drop-shadow(0 1px 3px rgba(0,0,0,0.15))' : 'none',
          animation: `scaleIn 0.3s ease both`,
          animationDelay: `${i * 0.08}s`
        }}
      />
    );
  }

  return (
    <div className="fraction-circle-wrap">
      <svg viewBox="0 0 200 200" className="fraction-svg">
        {slices}
        <text x={cx} y={cy - 5} textAnchor="middle" fill="#1e293b" fontSize="22" fontWeight="700" fontFamily="Inter">
          {numerator}
        </text>
        <line x1={cx - 18} y1={cy + 2} x2={cx + 18} y2={cy + 2} stroke="#1e293b" strokeWidth="2" />
        <text x={cx} y={cy + 22} textAnchor="middle" fill="#1e293b" fontSize="22" fontWeight="700" fontFamily="Inter">
          {denominator}
        </text>
      </svg>
      {label && <div className="fraction-label">{label}</div>}
    </div>
  );
}

// Multiplication Grid — visual array for multiplication
export function MultiplicationGrid({ rows, cols, color, showProduct }) {
  const cellSize = 36;
  const gap = 3;
  const product = rows * cols;

  return (
    <div className="mult-grid-wrap">
      <div className="mult-grid-label">{rows} × {cols}</div>
      <div
        className="mult-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gap: `${gap}px`
        }}
      >
        {Array.from({ length: rows * cols }, (_, i) => (
          <div
            key={i}
            className="mult-grid-cell"
            style={{
              width: cellSize,
              height: cellSize,
              background: color || '#6366f1',
              animationDelay: `${i * 0.02}s`
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      {showProduct && (
        <div className="mult-grid-result">
          = <strong>{product}</strong>
        </div>
      )}
    </div>
  );
}
