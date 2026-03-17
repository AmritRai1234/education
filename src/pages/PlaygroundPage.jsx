import { useState } from 'react';
import './PlaygroundPage.css';

const TEMPLATES = {
  python: {
    label: 'Python',
    icon: '🐍',
    code: `# Python Playground
# Try editing this code!

def greet(name):
    return f"Hello, {name}! 👋"

message = greet("World")
print(message)

# Try a loop
for i in range(5):
    print(f"  Count: {i}")`,
    output: `Hello, World! 👋
  Count: 0
  Count: 1
  Count: 2
  Count: 3
  Count: 4`,
  },
  rust: {
    label: 'Rust',
    icon: '🦀',
    code: `// Rust Playground
// Explore Rust's type system!

fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    for i in 0..10 {
        println!("fib({}) = {}", i, fibonacci(i));
    }
}`,
    output: `fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34`,
  },
  react: {
    label: 'React',
    icon: '⚛️',
    code: `// React Playground
// Build interactive UIs!

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;`,
    output: `Count: 0
[Increment] [Reset]`,
  },
  c: {
    label: 'C',
    icon: '⚙️',
    code: `// C Playground
// See how memory works!

#include <stdio.h>

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int *ptr = numbers;
    
    printf("Array elements via pointer:\\n");
    for (int i = 0; i < 5; i++) {
        printf("  *(ptr+%d) = %d  (addr: %p)\\n", 
               i, *(ptr + i), (void*)(ptr + i));
    }
    
    return 0;
}`,
    output: `Array elements via pointer:
  *(ptr+0) = 10  (addr: 0x7ffd00001000)
  *(ptr+1) = 20  (addr: 0x7ffd00001004)
  *(ptr+2) = 30  (addr: 0x7ffd00001008)
  *(ptr+3) = 40  (addr: 0x7ffd0000100c)
  *(ptr+4) = 50  (addr: 0x7ffd00001010)`,
  }
};

export default function PlaygroundPage() {
  const [lang, setLang] = useState('python');
  const [code, setCode] = useState(TEMPLATES.python.code);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const switchLang = (newLang) => {
    setLang(newLang);
    setCode(TEMPLATES[newLang].code);
    setOutput('');
  };

  const runCode = () => {
    setRunning(true);
    setOutput('');
    
    // Simulate execution with a typing effect
    const template = TEMPLATES[lang];
    let i = 0;
    const chars = template.output.split('');
    
    const interval = setInterval(() => {
      if (i < chars.length) {
        setOutput(prev => prev + chars[i]);
        i++;
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 15);
  };

  return (
    <div className="playground-page">
      <div className="playground-container">
        {/* Header */}
        <div className="playground-header animate-in">
          <div>
            <h1>Code Playground</h1>
            <p>Write, run, and experiment with code.</p>
          </div>
          <div className="lang-tabs">
            {Object.entries(TEMPLATES).map(([key, t]) => (
              <button
                key={key}
                className={`lang-tab ${lang === key ? 'active' : ''}`}
                onClick={() => switchLang(key)}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="playground-editor-wrap animate-in animate-in-delay-1">
          <div className="editor-panel">
            <div className="panel-header">
              <div className="code-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="panel-label">{TEMPLATES[lang].icon} {TEMPLATES[lang].label}</span>
              <button
                className="run-btn"
                onClick={runCode}
                disabled={running}
              >
                {running ? '⏳ Running...' : '▶ Run Code'}
              </button>
            </div>
            <textarea
              className="code-editor"
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="output-panel">
            <div className="panel-header output-header">
              <span className="panel-label">Output</span>
              {output && (
                <button
                  className="clear-btn"
                  onClick={() => setOutput('')}
                >
                  Clear
                </button>
              )}
            </div>
            <pre className="output-content">
              {output || <span className="output-placeholder">Click "Run Code" to see output...</span>}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
