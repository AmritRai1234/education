// Lesson data for all language tracks
// Each track has courses, and each course has interactive lessons with steps

export const TRACKS = {
  python: {
    id: 'python',
    name: 'Python',
    icon: 'python',
    color: 'var(--python-green)',
    colorLight: 'var(--python-green-light)',
    colorBg: 'var(--python-green-bg)',
    tagline: 'The friendly first language',
    description: 'Start your coding journey with Python — the most beginner-friendly language used by Google, Instagram, and NASA.',
    courses: [
      {
        id: 'python-basics',
        title: 'Python Basics',
        subtitle: 'Variables, types & your first program',
        lessonCount: 5,
        lessons: [
          {
            id: 'py-hello',
            title: 'Hello, World!',
            steps: [
              {
                type: 'info',
                title: 'Your First Program',
                content: 'Every programmer starts here. In Python, printing text to the screen is as simple as one line of code.',
                visual: 'code',
                code: 'print("Hello, World!")',
                output: 'Hello, World!'
              },
              {
                type: 'multiple-choice',
                title: 'Quick Check',
                content: 'What does the `print()` function do in Python?',
                choices: [
                  'Sends a document to a printer',
                  'Displays text on the screen',
                  'Creates a new variable',
                  'Downloads a file'
                ],
                correctIndex: 1,
                explanation: 'The `print()` function outputs text to the screen — it\'s one of the most used functions in Python!'
              },
              {
                type: 'fill-code',
                title: 'Try It Yourself',
                content: 'Complete the code to print your name:',
                template: '___("Your Name")',
                answer: 'print',
                hint: 'Which function displays text on the screen?'
              },
              {
                type: 'info',
                title: 'Strings',
                content: 'Text in Python is called a **string**. You can wrap strings in single quotes or double quotes — both work!',
                visual: 'code',
                code: "greeting = 'Hello'\nname = \"World\"\nprint(greeting + ', ' + name + '!')",
                output: 'Hello, World!'
              },
              {
                type: 'multiple-choice',
                title: 'String Quiz',
                content: 'Which of these is a valid Python string?',
                choices: [
                  'Hello World',
                  '"Hello World"',
                  '(Hello World)',
                  '[Hello World]'
                ],
                correctIndex: 1,
                explanation: 'Strings must be wrapped in quotes. Both "Hello" and \'Hello\' are valid strings in Python.'
              }
            ]
          },
          {
            id: 'py-variables',
            title: 'Variables & Types',
            steps: [
              {
                type: 'info',
                title: 'What are Variables?',
                content: 'Variables are like labeled boxes that store data. You can put a value in, read it, and change it later.',
                visual: 'code',
                code: 'age = 25\nname = "Alice"\nis_student = True\nprint(name, "is", age, "years old")',
                output: 'Alice is 25 years old'
              },
              {
                type: 'drag-order',
                title: 'Order the Code',
                content: 'Arrange these lines to calculate area of a rectangle:',
                items: [
                  'width = 5',
                  'height = 3',
                  'area = width * height',
                  'print(area)'
                ],
                correctOrder: [0, 1, 2, 3]
              },
              {
                type: 'multiple-choice',
                title: 'Data Types',
                content: 'What type is the value `3.14`?',
                choices: ['int (integer)', 'float (decimal)', 'str (string)', 'bool (boolean)'],
                correctIndex: 1,
                explanation: 'Numbers with decimal points are called floats in Python. `3` would be an int, but `3.14` is a float.'
              },
              {
                type: 'fill-code',
                title: 'Create a Variable',
                content: 'Create a variable called `score` and assign it the value `100`:',
                template: '___ = 100',
                answer: 'score',
                hint: 'Variable names go on the left side of the = sign.'
              }
            ]
          },
          {
            id: 'py-lists',
            title: 'Lists & Loops',
            steps: [
              {
                type: 'info',
                title: 'Lists Hold Multiple Items',
                content: 'A list is a collection of items in a specific order. Think of it like a line of people — each person has a position (index).',
                visual: 'code',
                code: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits[0])  # First item\nprint(len(fruits))  # How many items',
                output: 'apple\n3'
              },
              {
                type: 'multiple-choice',
                title: 'Index Check',
                content: 'In `colors = ["red", "blue", "green"]`, what is `colors[1]`?',
                choices: ['red', 'blue', 'green', 'Error'],
                correctIndex: 1,
                explanation: 'Lists are zero-indexed! Index 0 is "red", index 1 is "blue", index 2 is "green".'
              },
              {
                type: 'info',
                title: 'For Loops',
                content: 'A `for` loop lets you do something with each item in a list, one at a time.',
                visual: 'code',
                code: 'fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print("I like", fruit)',
                output: 'I like apple\nI like banana\nI like cherry'
              },
              {
                type: 'fill-code',
                title: 'Write a Loop',
                content: 'Complete the loop to print each number:',
                template: 'numbers = [1, 2, 3]\n___ num in numbers:\n    print(num)',
                answer: 'for',
                hint: 'Which keyword starts a loop that goes through each item?'
              }
            ]
          },
          {
            id: 'py-conditionals',
            title: 'If / Else',
            steps: [
              {
                type: 'info',
                title: 'Making Decisions',
                content: 'Programs need to make decisions. The `if` statement lets your code choose what to do based on a condition.',
                visual: 'code',
                code: 'temperature = 35\n\nif temperature > 30:\n    print("It\'s hot!")\nelse:\n    print("Nice weather!")',
                output: "It's hot!"
              },
              {
                type: 'multiple-choice',
                title: 'Condition Check',
                content: 'What does `x > 5` evaluate to when `x = 3`?',
                choices: ['True', 'False', '3', 'Error'],
                correctIndex: 1,
                explanation: '3 is NOT greater than 5, so `x > 5` evaluates to `False`.'
              },
              {
                type: 'info',
                title: 'Elif — Multiple Conditions',
                content: 'Use `elif` (short for "else if") to check multiple conditions in order.',
                visual: 'code',
                code: 'score = 85\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n\nprint("Grade:", grade)',
                output: 'Grade: B'
              },
              {
                type: 'drag-order',
                title: 'Build the Logic',
                content: 'Arrange these lines to check if a number is positive, negative, or zero:',
                items: [
                  'num = -5',
                  'if num > 0:',
                  '    print("Positive")',
                  'elif num < 0:',
                  '    print("Negative")',
                  'else:',
                  '    print("Zero")'
                ],
                correctOrder: [0, 1, 2, 3, 4, 5, 6]
              }
            ]
          },
          {
            id: 'py-functions',
            title: 'Functions',
            steps: [
              {
                type: 'info',
                title: 'Reusable Code Blocks',
                content: 'Functions let you name a block of code and use it over and over. Think of them as recipes — define once, cook many times!',
                visual: 'code',
                code: 'def greet(name):\n    return "Hello, " + name + "!"\n\nmessage = greet("Alice")\nprint(message)\nprint(greet("Bob"))',
                output: 'Hello, Alice!\nHello, Bob!'
              },
              {
                type: 'fill-code',
                title: 'Define a Function',
                content: 'Complete the function that adds two numbers:',
                template: '___ add(a, b):\n    return a + b',
                answer: 'def',
                hint: 'Which keyword defines a function in Python?'
              },
              {
                type: 'multiple-choice',
                title: 'Return Values',
                content: 'What does `return` do in a function?',
                choices: [
                  'Prints a value to the screen',
                  'Sends a value back to the caller',
                  'Stops the program',
                  'Creates a new variable'
                ],
                correctIndex: 1,
                explanation: '`return` sends a value back to where the function was called. Without it, the function returns `None`.'
              }
            ]
          }
        ]
      }
    ]
  },

  rust: {
    id: 'rust',
    name: 'Rust',
    icon: 'rust',
    color: 'var(--rust-orange)',
    colorLight: 'var(--rust-orange-light)',
    colorBg: 'var(--rust-orange-bg)',
    tagline: 'Fearless systems programming',
    description: 'Build blazing-fast, memory-safe software. Rust is loved by developers for its speed, safety, and modern tooling.',
    courses: [
      {
        id: 'rust-basics',
        title: 'Rust Fundamentals',
        subtitle: 'Ownership, types & safety',
        lessonCount: 4,
        lessons: [
          {
            id: 'rs-hello',
            title: 'Hello, Cargo!',
            steps: [
              {
                type: 'info',
                title: 'Welcome to Rust',
                content: 'Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety. Let\'s start with the basics.',
                visual: 'code',
                code: 'fn main() {\n    println!("Hello, Rust!");\n}',
                output: 'Hello, Rust!'
              },
              {
                type: 'multiple-choice',
                title: 'Spot the Difference',
                content: 'Notice anything unique about Rust\'s print? What\'s special about `println!`?',
                choices: [
                  'The ! means it\'s a macro, not a regular function',
                  'The ! means it will throw an error',
                  'The ! is optional',
                  'The ! means it runs in a new thread'
                ],
                correctIndex: 0,
                explanation: 'In Rust, `println!` is a macro (indicated by !). Macros are more powerful than functions — they can take a variable number of arguments and generate code at compile time.'
              },
              {
                type: 'fill-code',
                title: 'Your Turn',
                content: 'Complete the Rust program to print "Learning Rust!":',
                template: 'fn main() {\n    ___!("Learning Rust!");\n}',
                answer: 'println',
                hint: 'Which macro prints a line in Rust?'
              },
              {
                type: 'info',
                title: 'Variables in Rust',
                content: 'Rust variables are **immutable by default** — once set, they can\'t change. This prevents entire categories of bugs!',
                visual: 'code',
                code: 'fn main() {\n    let name = "Ferris";\n    let mut age = 5;  // mut = mutable\n    age = 6;  // OK - works because of mut\n    println!("{} is {} years old", name, age);\n}',
                output: 'Ferris is 6 years old'
              }
            ]
          },
          {
            id: 'rs-ownership',
            title: 'Ownership',
            steps: [
              {
                type: 'info',
                title: 'Rust\'s Superpower',
                content: '**Ownership** is what makes Rust special. Every value has exactly one owner, and when the owner goes out of scope, the value is dropped. No garbage collector needed!',
                visual: 'code',
                code: 'fn main() {\n    let s1 = String::from("hello");\n    let s2 = s1;  // s1 is MOVED to s2\n    // println!("{}", s1); // ERROR! s1 no longer valid\n    println!("{}", s2);  // OK - s2 owns the string\n}',
                output: 'hello'
              },
              {
                type: 'multiple-choice',
                title: 'Ownership Quiz',
                content: 'After `let s2 = s1;`, what happens to `s1`?',
                choices: [
                  's1 is copied, both are valid',
                  's1 is moved to s2, s1 is no longer valid',
                  's1 and s2 share the same data',
                  's1 becomes a reference to s2'
                ],
                correctIndex: 1,
                explanation: 'In Rust, assigning a String to another variable MOVES ownership. s1 is no longer valid after the move. This is how Rust prevents double-free bugs without a garbage collector!'
              },
              {
                type: 'info',
                title: 'Borrowing',
                content: 'If you want to use a value without taking ownership, you can **borrow** it with a reference (&).',
                visual: 'code',
                code: 'fn greet(name: &String) {\n    println!("Hello, {}!", name);\n}\n\nfn main() {\n    let name = String::from("Alice");\n    greet(&name);  // borrow, don\'t move\n    println!("Still own: {}", name);  // OK - still valid!\n}',
                output: 'Hello, Alice!\nStill own: Alice'
              }
            ]
          },
          {
            id: 'rs-types',
            title: 'Types & Structs',
            steps: [
              {
                type: 'info',
                title: 'Static Typing',
                content: 'Rust is statically typed — the compiler knows every type at compile time, catching bugs before your code even runs.',
                visual: 'code',
                code: 'fn main() {\n    let x: i32 = 42;        // 32-bit integer\n    let pi: f64 = 3.14;     // 64-bit float\n    let active: bool = true; // boolean\n    let letter: char = \'R\'; // character\n    println!("{} {} {} {}", x, pi, active, letter);\n}',
                output: '42 3.14 true R'
              },
              {
                type: 'multiple-choice',
                title: 'Type Check',
                content: 'What type is `42_u8` in Rust?',
                choices: ['An 8-bit unsigned integer', 'A string', 'A float', 'A boolean'],
                correctIndex: 0,
                explanation: 'The `u8` suffix means unsigned 8-bit integer (0 to 255). Rust gives you fine-grained control over number sizes!'
              },
              {
                type: 'info',
                title: 'Structs — Custom Types',
                content: 'Structs let you group related data together into a custom type.',
                visual: 'code',
                code: 'struct Player {\n    name: String,\n    health: u32,\n    level: u32,\n}\n\nfn main() {\n    let hero = Player {\n        name: String::from("Ferris"),\n        health: 100,\n        level: 1,\n    };\n    println!("{} — HP: {}", hero.name, hero.health);\n}',
                output: 'Ferris — HP: 100'
              }
            ]
          },
          {
            id: 'rs-match',
            title: 'Pattern Matching',
            steps: [
              {
                type: 'info',
                title: 'Match — Rust\'s Switch on Steroids',
                content: '`match` is one of Rust\'s most powerful features. It\'s like a switch statement, but it checks that you\'ve handled every possible case.',
                visual: 'code',
                code: 'fn describe(x: i32) -> &\'static str {\n    match x {\n        1 => "one",\n        2 => "two",\n        3..=9 => "several",\n        _ => "many"  // _ catches everything else\n    }\n}\n\nfn main() {\n    println!("{}", describe(5));\n}',
                output: 'several'
              },
              {
                type: 'fill-code',
                title: 'Write a Match',
                content: 'Complete the match to handle the default case:',
                template: 'match color {\n    "red" => println!("Red"),\n    "blue" => println!("Blue"),\n    ___ => println!("Unknown"),\n}',
                answer: '_',
                hint: 'What wildcard catches all remaining patterns in a match?'
              }
            ]
          }
        ]
      }
    ]
  },

  react: {
    id: 'react',
    name: 'React',
    icon: 'react',
    color: 'var(--react-blue)',
    colorLight: 'var(--react-blue-light)',
    colorBg: 'var(--react-blue-bg)',
    tagline: 'Build modern UIs',
    description: 'Create dynamic, interactive web apps with React — the most popular JavaScript framework, used by Facebook, Netflix, and Airbnb.',
    courses: [
      {
        id: 'react-basics',
        title: 'React Essentials',
        subtitle: 'Components, props & state',
        lessonCount: 4,
        lessons: [
          {
            id: 'rx-components',
            title: 'Components',
            steps: [
              {
                type: 'info',
                title: 'Building Blocks of UI',
                content: 'React apps are made of **components** — reusable pieces of UI. Think of them like LEGO bricks: each one is independent, but they snap together to build something complex.',
                visual: 'code',
                code: 'function Welcome() {\n  return <h1>Hello, React!</h1>;\n}\n\n// Use it like an HTML tag:\n// <Welcome />',
                output: 'Hello, React!'
              },
              {
                type: 'multiple-choice',
                title: 'JSX Basics',
                content: 'What is JSX?',
                choices: [
                  'A new programming language',
                  'HTML-like syntax that lives inside JavaScript',
                  'A CSS framework',
                  'A database query language'
                ],
                correctIndex: 1,
                explanation: 'JSX lets you write HTML-like syntax in JavaScript. React converts it to regular JavaScript under the hood. It makes building UIs feel natural!'
              },
              {
                type: 'fill-code',
                title: 'Create a Component',
                content: 'Complete the React component:',
                template: '___ Greeting() {\n  return <p>Welcome to React!</p>;\n}',
                answer: 'function',
                hint: 'React components are just JavaScript functions!'
              }
            ]
          },
          {
            id: 'rx-props',
            title: 'Props',
            steps: [
              {
                type: 'info',
                title: 'Passing Data to Components',
                content: '**Props** (short for properties) let you pass data from a parent component to a child component — like function arguments for UI.',
                visual: 'code',
                code: 'function UserCard({ name, role }) {\n  return (\n    <div className="card">\n      <h2>{name}</h2>\n      <p>{role}</p>\n    </div>\n  );\n}\n\n// Usage:\n// <UserCard name="Alice" role="Developer" />',
                output: 'Alice\nDeveloper'
              },
              {
                type: 'multiple-choice',
                title: 'Props Flow',
                content: 'In React, data via props flows in which direction?',
                choices: [
                  'Child → Parent (upward)',
                  'Parent → Child (downward)',
                  'Both directions',
                  'Sideways between siblings'
                ],
                correctIndex: 1,
                explanation: 'Props flow one way — from parent to child. This "one-way data flow" makes React apps predictable and easy to debug.'
              }
            ]
          },
          {
            id: 'rx-state',
            title: 'State & useState',
            steps: [
              {
                type: 'info',
                title: 'Interactive Components',
                content: '**State** is data that changes over time. When state changes, React re-renders the component to show the new data.',
                visual: 'code',
                code: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Add One\n      </button>\n    </div>\n  );\n}',
                output: 'Count: 0\n[Add One]'
              },
              {
                type: 'multiple-choice',
                title: 'State vs Props',
                content: 'What\'s the key difference between state and props?',
                choices: [
                  'State is faster than props',
                  'Props can change, state cannot',
                  'State is managed inside a component, props come from outside',
                  'There is no difference'
                ],
                correctIndex: 2,
                explanation: 'Props are passed in from a parent (read-only). State is managed internally by the component and can change. When state changes, the component re-renders!'
              },
              {
                type: 'fill-code',
                title: 'Add State',
                content: 'Complete the hook to create a state variable:',
                template: 'const [name, setName] = ___("")',
                answer: 'useState',
                hint: 'Which React hook creates a state variable?'
              }
            ]
          },
          {
            id: 'rx-events',
            title: 'Events & Handling',
            steps: [
              {
                type: 'info',
                title: 'Responding to User Actions',
                content: 'React handles events similarly to HTML, but uses camelCase naming and passes functions instead of strings.',
                visual: 'code',
                code: 'function ToggleButton() {\n  const [on, setOn] = useState(false);\n\n  return (\n    <button\n      onClick={() => setOn(!on)}\n      style={{\n        background: on ? "#10b981" : "#ef4444",\n        color: "white",\n        padding: "12px 24px",\n        borderRadius: "8px",\n      }}\n    >\n      {on ? "ON" : "OFF"}\n    </button>\n  );\n}',
                output: '[OFF]'
              },
              {
                type: 'multiple-choice',
                title: 'Event Naming',
                content: 'How are event handlers named in React?',
                choices: ['onclick', 'onClick', 'on-click', 'ONCLICK'],
                correctIndex: 1,
                explanation: 'React uses camelCase for event names: onClick, onChange, onSubmit, etc.'
              }
            ]
          }
        ]
      }
    ]
  },

  c: {
    id: 'c',
    name: 'C',
    icon: 'c',
    color: 'var(--c-red)',
    colorLight: 'var(--c-red-light)',
    colorBg: 'var(--c-red-bg)',
    tagline: 'The foundation of computing',
    description: 'Learn the language behind operating systems, embedded devices, and game engines. C teaches you how computers really work.',
    courses: [
      {
        id: 'c-basics',
        title: 'C Fundamentals',
        subtitle: 'Pointers, memory & power',
        lessonCount: 4,
        lessons: [
          {
            id: 'c-hello',
            title: 'Hello, C!',
            steps: [
              {
                type: 'info',
                title: 'The Original Language',
                content: 'C was created in 1972 and is still everywhere — Linux, Windows, PostgreSQL, Python itself, and almost every embedded device runs C code.',
                visual: 'code',
                code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
                output: 'Hello, World!'
              },
              {
                type: 'multiple-choice',
                title: 'Understand the Structure',
                content: 'What does `#include <stdio.h>` do?',
                choices: [
                  'Imports the standard input/output library',
                  'Creates a new file called stdio',
                  'Defines the main function',
                  'Starts the program'
                ],
                correctIndex: 0,
                explanation: '#include tells the preprocessor to paste in the contents of stdio.h, which gives us functions like printf and scanf.'
              },
              {
                type: 'fill-code',
                title: 'Write It',
                content: 'Complete the program to print "Learning C!":',
                template: '#include <stdio.h>\n\nint main() {\n    ___("Learning C!\\n");\n    return 0;\n}',
                answer: 'printf',
                hint: 'Which function prints formatted text in C?'
              }
            ]
          },
          {
            id: 'c-types',
            title: 'Types & Variables',
            steps: [
              {
                type: 'info',
                title: 'Declaring Variables',
                content: 'In C, you must declare the type of every variable. This tells the compiler exactly how much memory to allocate.',
                visual: 'code',
                code: '#include <stdio.h>\n\nint main() {\n    int age = 25;\n    float price = 9.99;\n    char grade = \'A\';\n    \n    printf("Age: %d\\n", age);\n    printf("Price: %.2f\\n", price);\n    printf("Grade: %c\\n", grade);\n    return 0;\n}',
                output: 'Age: 25\nPrice: 9.99\nGrade: A'
              },
              {
                type: 'multiple-choice',
                title: 'Format Specifiers',
                content: 'What format specifier prints an integer in C?',
                choices: ['%s', '%d', '%f', '%c'],
                correctIndex: 1,
                explanation: '%d prints an integer (decimal). %f for floats, %c for characters, and %s for strings.'
              }
            ]
          },
          {
            id: 'c-pointers',
            title: 'Pointers',
            steps: [
              {
                type: 'info',
                title: 'Pointers — The Heart of C',
                content: 'A pointer is a variable that stores a **memory address** instead of a value. This is what gives C its power — direct memory control.',
                visual: 'code',
                code: '#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *ptr = &x;  // ptr points to x\n    \n    printf("Value: %d\\n", x);\n    printf("Address: %p\\n", ptr);\n    printf("Via pointer: %d\\n", *ptr);\n    return 0;\n}',
                output: 'Value: 42\nAddress: 0x7ffd1234abcd\nVia pointer: 42'
              },
              {
                type: 'multiple-choice',
                title: 'Pointer Operators',
                content: 'What does the `&` operator do?',
                choices: [
                  'Dereferences a pointer',
                  'Gets the memory address of a variable',
                  'Performs a bitwise AND',
                  'Creates a new pointer'
                ],
                correctIndex: 1,
                explanation: '& is the "address-of" operator — it gives you the memory address where a variable is stored. * is the dereference operator that reads the value at an address.'
              },
              {
                type: 'fill-code',
                title: 'Use a Pointer',
                content: 'Create a pointer to the variable `num`:',
                template: 'int num = 10;\nint *ptr = ___num;',
                answer: '&',
                hint: 'Which operator gets the address of a variable?'
              }
            ]
          },
          {
            id: 'c-arrays',
            title: 'Arrays & Memory',
            steps: [
              {
                type: 'info',
                title: 'Arrays — Contiguous Memory',
                content: 'Arrays in C are blocks of contiguous memory. Unlike Python lists, they have a fixed size and hold only one type.',
                visual: 'code',
                code: '#include <stdio.h>\n\nint main() {\n    int scores[5] = {95, 87, 92, 78, 88};\n    \n    for (int i = 0; i < 5; i++) {\n        printf("Score %d: %d\\n", i + 1, scores[i]);\n    }\n    return 0;\n}',
                output: 'Score 1: 95\nScore 2: 87\nScore 3: 92\nScore 4: 78\nScore 5: 88'
              },
              {
                type: 'multiple-choice',
                title: 'Arrays & Pointers',
                content: 'In C, an array name is actually a:',
                choices: [
                  'Copy of the array data',
                  'Pointer to the first element',
                  'String',
                  'Function'
                ],
                correctIndex: 1,
                explanation: 'The array name decays to a pointer to its first element. `scores` is essentially `&scores[0]`. This is a fundamental C concept!'
              }
            ]
          }
        ]
      }
    ]
  },

  algebra: {
    id: 'algebra',
    name: 'Algebra',
    icon: 'algebra',
    color: 'var(--algebra-purple)',
    colorLight: 'var(--algebra-purple-light)',
    colorBg: 'var(--algebra-purple-bg)',
    tagline: 'See math come alive',
    description: 'Understand algebra visually — with balance scales, interactive graphs, and animated equation solving. Math has never been this fun.',
    courses: [
      {
        id: 'algebra-foundations',
        title: 'Algebra Foundations',
        subtitle: 'Variables, equations & graphs',
        lessonCount: 4,
        lessons: [
          {
            id: 'alg-visual-eq',
            title: 'Visual Equations',
            steps: [
              {
                type: 'info-visual',
                visualType: 'balance-scale',
                title: 'Equations are Balances',
                content: 'An equation is like a balance scale — both sides must be equal. The = sign means "is the same as." Whatever you do to one side, you must do to the other!',
                scaleData: {
                  left: [
                    { label: 'x', value: 7, isVar: true },
                    { label: '3', value: 3, isVar: false }
                  ],
                  right: [
                    { label: '5', value: 5, isVar: false },
                    { label: '5', value: 5, isVar: false }
                  ]
                }
              },
              {
                type: 'multiple-choice',
                title: 'Balance Check',
                content: 'If x + 3 = 10 is balanced, what is x?',
                choices: ['3', '5', '7', '13'],
                correctIndex: 2,
                explanation: 'Since x + 3 = 10, we subtract 3 from both sides: x = 10 - 3 = 7. Think of removing 3 blocks from both sides of the scale!'
              },
              {
                type: 'info-visual',
                visualType: 'equation-steps',
                title: 'Solving Step by Step',
                content: 'Watch how we isolate x by doing the same operation to both sides — just like keeping a scale balanced:',
                equationSteps: [
                  { equation: 'x + 5 = 12', action: 'Start with the equation' },
                  { equation: 'x + 5 - 5 = 12 - 5', action: 'Subtract 5 from both sides' },
                  { equation: 'x = 7', action: 'Solved! x is isolated.' }
                ]
              },
              {
                type: 'fill-code',
                title: 'Solve It!',
                content: 'If x + 8 = 15, then x = ?',
                template: 'x = ___',
                answer: '7',
                hint: 'Subtract 8 from both sides: 15 - 8 = ?'
              },
              {
                type: 'info-visual',
                visualType: 'balance-scale',
                title: 'Multiplication on the Scale',
                content: 'What if the variable is multiplied? If 2x = 10, then each x-block equals 5. We divide both sides by 2 to find x.',
                scaleData: {
                  left: [
                    { label: 'x', value: 5, isVar: true },
                    { label: 'x', value: 5, isVar: true }
                  ],
                  right: [
                    { label: '5', value: 5, isVar: false },
                    { label: '5', value: 5, isVar: false }
                  ]
                }
              },
              {
                type: 'multiple-choice',
                title: 'Division to Solve',
                content: 'If 3x = 21, what is x?',
                choices: ['3', '7', '18', '63'],
                correctIndex: 1,
                explanation: 'Divide both sides by 3: x = 21 ÷ 3 = 7. When a variable is multiplied, divide to isolate it!'
              }
            ]
          },
          {
            id: 'alg-solving',
            title: 'Solving Equations',
            steps: [
              {
                type: 'info-visual',
                visualType: 'equation-steps',
                title: 'Two-Step Equations',
                content: 'Sometimes you need two steps to solve. Always undo addition/subtraction first, then multiplication/division:',
                equationSteps: [
                  { equation: '2x + 3 = 11', action: 'Start with the equation' },
                  { equation: '2x + 3 - 3 = 11 - 3', action: 'Subtract 3 from both sides' },
                  { equation: '2x = 8', action: 'Simplify' },
                  { equation: '2x ÷ 2 = 8 ÷ 2', action: 'Divide both sides by 2' },
                  { equation: 'x = 4', action: 'Solved!' }
                ]
              },
              {
                type: 'multiple-choice',
                title: 'Solve: 3x - 5 = 10',
                content: 'What is x?',
                choices: ['3', '5', '15', '45'],
                correctIndex: 1,
                explanation: 'Add 5 to both sides: 3x = 15. Then divide by 3: x = 5. Remember: undo subtraction first, then division!'
              },
              {
                type: 'info-visual',
                visualType: 'equation-steps',
                title: 'Variables on Both Sides',
                content: 'When x appears on both sides, collect all x-terms on one side first:',
                equationSteps: [
                  { equation: '5x + 2 = 3x + 10', action: 'x on both sides!' },
                  { equation: '5x - 3x + 2 = 10', action: 'Subtract 3x from both sides' },
                  { equation: '2x + 2 = 10', action: 'Combine like terms' },
                  { equation: '2x = 8', action: 'Subtract 2 from both sides' },
                  { equation: 'x = 4', action: 'Solved!' }
                ]
              },
              {
                type: 'fill-code',
                title: 'Your Turn',
                content: 'Solve: 4x + 1 = 2x + 9. What is x?',
                template: 'x = ___',
                answer: '4',
                hint: 'Subtract 2x from both sides to get 2x + 1 = 9, then subtract 1...'
              },
              {
                type: 'info-visual',
                visualType: 'slider',
                title: 'Explore: What does x do?',
                content: 'Drag the slider to change x and watch how the expression 2x + 3 changes:',
                sliderData: {
                  equation: '2·x + 3 = RESULT',
                  variable: 'x',
                  min: -5,
                  max: 10,
                  step: 1,
                  initialValue: 0,
                  formatResult: 'linear',
                  slope: 2,
                  intercept: 3
                }
              }
            ]
          },
          {
            id: 'alg-graphing',
            title: 'Graphing Lines',
            steps: [
              {
                type: 'info-visual',
                visualType: 'coordinate-plane',
                title: 'The Coordinate Plane',
                content: 'Every point on the plane has an (x, y) address. The center is called the origin (0, 0). The horizontal line is the x-axis, and the vertical line is the y-axis.',
                graphData: {
                  lines: [],
                  points: [
                    { x: 0, y: 0, label: 'Origin', color: '#6366f1' },
                    { x: 3, y: 2, label: '(3, 2)', color: '#10b981' },
                    { x: -2, y: 4, label: '(-2, 4)', color: '#f59e0b' },
                    { x: -3, y: -2, label: '(-3, -2)', color: '#ef4444' }
                  ],
                  showGrid: true
                }
              },
              {
                type: 'multiple-choice',
                title: 'Point Location',
                content: 'In which quadrant is the point (3, -2)?',
                choices: [
                  'Quadrant I (top-right)',
                  'Quadrant II (top-left)',
                  'Quadrant III (bottom-left)',
                  'Quadrant IV (bottom-right)'
                ],
                correctIndex: 3,
                explanation: 'When x is positive and y is negative, the point is in Quadrant IV (bottom-right). Remember: go right 3, then down 2.'
              },
              {
                type: 'info-visual',
                visualType: 'coordinate-plane',
                title: 'Slope: Rise over Run',
                content: 'The slope (m) of a line tells you how steep it is. Rise ÷ Run = how much y changes for each step in x. The equation y = mx + b gives you slope (m) and y-intercept (b).',
                graphData: {
                  lines: [
                    { slope: 1, intercept: 0, label: 'y = x' },
                    { slope: 2, intercept: -1, label: 'y = 2x - 1' },
                    { slope: -1, intercept: 3, label: 'y = -x + 3' }
                  ],
                  points: [],
                  showGrid: true
                }
              },
              {
                type: 'multiple-choice',
                title: 'Slope Quiz',
                content: 'In y = 3x + 2, what is the slope?',
                choices: ['2', '3', '5', 'x'],
                correctIndex: 1,
                explanation: 'In y = mx + b, m is the slope. Here m = 3, meaning the line goes up 3 units for every 1 unit to the right. b = 2 is the y-intercept.'
              },
              {
                type: 'info-visual',
                visualType: 'slider-graph',
                title: 'Explore: Build a Line',
                content: 'Use the sliders to change the slope (m) and y-intercept (b) and watch the line transform in real time!',
                sliderGraphData: {
                  slopeRange: [-3, 3],
                  interceptRange: [-4, 4],
                  initialSlope: 1,
                  initialIntercept: 0
                }
              },
              {
                type: 'fill-code',
                title: 'Write the Equation',
                content: 'A line passes through (0, 4) and goes down 2 units for every 1 unit right. Write its equation in slope-intercept form: y = ?x + ?',
                template: 'y = ___x + 4',
                answer: '-2',
                hint: '"Goes down 2" means the slope is -2'
              }
            ]
          },
          {
            id: 'alg-quadratics',
            title: 'Quadratics',
            steps: [
              {
                type: 'info-visual',
                visualType: 'coordinate-plane',
                title: 'Parabolas: U-Shaped Curves',
                content: 'A quadratic equation like y = x² makes a U-shaped curve called a parabola. The bottom (or top) point is called the vertex.',
                graphData: {
                  lines: [],
                  points: [
                    { x: -3, y: 9, color: '#6366f1' },
                    { x: -2, y: 4, color: '#6366f1' },
                    { x: -1, y: 1, color: '#6366f1' },
                    { x: 0, y: 0, label: 'Vertex', color: '#ef4444' },
                    { x: 1, y: 1, color: '#6366f1' },
                    { x: 2, y: 4, color: '#6366f1' },
                    { x: 3, y: 9, color: '#6366f1' }
                  ],
                  showGrid: true,
                  yRange: [-1, 10]
                }
              },
              {
                type: 'multiple-choice',
                title: 'Parabola Direction',
                content: 'If y = -x², which way does the parabola open?',
                choices: ['Upward (U shape)', 'Downward (∩ shape)', 'Left', 'Right'],
                correctIndex: 1,
                explanation: 'The negative sign flips the parabola. y = x² opens up (U), y = -x² opens down (∩). The sign of the x² coefficient controls direction!'
              },
              {
                type: 'info-visual',
                visualType: 'equation-steps',
                title: 'Factoring Quadratics',
                content: 'To solve x² + 5x + 6 = 0, we factor it into two brackets:',
                equationSteps: [
                  { equation: 'x² + 5x + 6 = 0', action: 'Find two numbers that multiply to 6 and add to 5' },
                  { equation: '(x + 2)(x + 3) = 0', action: '2 x 3 = 6 and 2 + 3 = 5' },
                  { equation: 'x + 2 = 0  or  x + 3 = 0', action: 'If a product is 0, one factor must be 0' },
                  { equation: 'x = -2  or  x = -3', action: 'Two solutions!' }
                ]
              },
              {
                type: 'multiple-choice',
                title: 'Factor This',
                content: 'Solve x² - 7x + 12 = 0 by factoring. What are the solutions?',
                choices: ['x = 3 and x = 4', 'x = -3 and x = -4', 'x = 2 and x = 6', 'x = -2 and x = -6'],
                correctIndex: 0,
                explanation: 'We need two numbers that multiply to 12 and add to -7. Those are -3 and -4: (x - 3)(x - 4) = 0, so x = 3 or x = 4.'
              },
              {
                type: 'info-visual',
                visualType: 'slider',
                title: 'Explore: Quadratic Values',
                content: 'Drag x and watch x² change. Notice how the value is always positive (or zero) — that\'s why parabolas are U-shaped!',
                sliderData: {
                  equation: 'x² = RESULT',
                  variable: 'x',
                  min: -5,
                  max: 5,
                  step: 1,
                  initialValue: 0,
                  formatResult: 'quadratic'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  arithmetic: {
    id: 'arithmetic',
    name: 'Arithmetic',
    icon: 'arithmetic',
    color: 'var(--arith-blue)',
    colorLight: 'var(--arith-blue-light)',
    colorBg: 'var(--arith-blue-bg)',
    tagline: 'Master the fundamentals',
    description: 'Build rock-solid number sense with visual blocks, grids, pie charts, and interactive number lines. The foundation for all of math.',
    courses: [
      {
        id: 'arith-foundations',
        title: 'Arithmetic Thinking',
        subtitle: 'Numbers, operations & fractions',
        lessonCount: 4,
        lessons: [
          {
            id: 'arith-number-sense',
            title: 'Number Sense',
            steps: [
              {
                type: 'info-visual',
                visualType: 'number-line',
                title: 'The Number Line',
                content: 'Every number has a home on the number line. Numbers get bigger going right and smaller going left. Zero sits right in the middle!',
                numberLineData: {
                  min: -5,
                  max: 5,
                  points: [
                    { value: 0, color: '#6366f1', label: 'Zero' },
                    { value: 3, color: '#10b981', label: '+3' },
                    { value: -2, color: '#ef4444', label: '-2' }
                  ]
                }
              },
              {
                type: 'multiple-choice',
                title: 'Number Line Reading',
                content: 'Which number is farther from zero: -4 or 3?',
                choices: ['3', '-4', 'They are equidistant', 'Cannot tell'],
                correctIndex: 1,
                explanation: '-4 is 4 units from zero, while 3 is only 3 units away. The distance from zero is called the absolute value!'
              },
              {
                type: 'info-visual',
                visualType: 'block-groups',
                title: 'Counting with Blocks',
                content: 'We can represent numbers with blocks. Each block is worth 1. Count them up!',
                blockData: {
                  groups: [
                    { count: 4, label: '4' },
                    { count: 3, label: '3' }
                  ],
                  operation: '+',
                  showTotal: true
                }
              },
              {
                type: 'fill-code',
                title: 'Count It!',
                content: 'Look at the blocks and fill in the total:',
                template: '5 + 3 = ___',
                answer: '8',
                hint: 'Count all the blocks together!'
              },
              {
                type: 'multiple-choice',
                title: 'Even or Odd?',
                content: 'Is 7 even or odd?',
                choices: ['Even', 'Odd'],
                correctIndex: 1,
                explanation: 'Odd numbers cannot be evenly split into two groups. 7 = 3 + 4, not two equal groups. Even numbers can: 8 = 4 + 4.'
              }
            ]
          },
          {
            id: 'arith-add-sub',
            title: 'Addition & Subtraction',
            steps: [
              {
                type: 'info-visual',
                visualType: 'block-groups',
                title: 'Addition = Combining',
                content: 'Addition means putting groups together. Watch how the two groups combine to make a total!',
                blockData: {
                  groups: [
                    { count: 5, label: '5' },
                    { count: 4, label: '4' }
                  ],
                  operation: '+',
                  showTotal: true
                }
              },
              {
                type: 'multiple-choice',
                title: 'Add It Up',
                content: '7 + 8 = ?',
                choices: ['13', '14', '15', '16'],
                correctIndex: 2,
                explanation: '7 + 8 = 15. A trick: 7 + 8 = 7 + 7 + 1 = 14 + 1 = 15. Doubles plus one!'
              },
              {
                type: 'info-visual',
                visualType: 'block-groups',
                title: 'Subtraction = Taking Away',
                content: 'Subtraction means removing from a group. Start with 9 blocks and take away 4. How many remain?',
                blockData: {
                  groups: [
                    { count: 9, label: '9' },
                    { count: 4, label: '4' }
                  ],
                  operation: '−',
                  showTotal: true
                }
              },
              {
                type: 'fill-code',
                title: 'Subtract!',
                content: 'Fill in the answer:',
                template: '12 − 5 = ___',
                answer: '7',
                hint: 'Start at 12 and count back 5'
              },
              {
                type: 'info-visual',
                visualType: 'number-line',
                title: 'Subtraction on the Number Line',
                content: 'Subtraction means moving LEFT on the number line. Starting at 5 and subtracting 3 takes us to 2.',
                numberLineData: {
                  min: -2,
                  max: 8,
                  points: [
                    { value: 5, color: '#6366f1', label: 'Start: 5' },
                    { value: 2, color: '#10b981', label: 'End: 2' }
                  ]
                }
              }
            ]
          },
          {
            id: 'arith-multiply',
            title: 'Multiplication',
            steps: [
              {
                type: 'info-visual',
                visualType: 'multiplication-grid',
                title: 'Multiplication = Rows × Columns',
                content: 'Multiplication is like arranging objects in a grid. 3 rows of 4 means 3 × 4. Count all the squares!',
                gridData: {
                  rows: 3,
                  cols: 4,
                  color: '#6366f1',
                  showProduct: true
                }
              },
              {
                type: 'multiple-choice',
                title: 'Grid Reading',
                content: 'If you arrange 5 rows of 3 blocks each, how many blocks total?',
                choices: ['8', '12', '15', '20'],
                correctIndex: 2,
                explanation: '5 × 3 = 15. You can count: 3 + 3 + 3 + 3 + 3 = 15. Multiplication is just repeated addition!'
              },
              {
                type: 'info-visual',
                visualType: 'multiplication-grid',
                title: 'The Commutative Property',
                content: '3 × 5 and 5 × 3 give the same answer! The order doesn\'t matter in multiplication. This grid shows 5 × 3:',
                gridData: {
                  rows: 5,
                  cols: 3,
                  color: '#10b981',
                  showProduct: true
                }
              },
              {
                type: 'info-visual',
                visualType: 'block-groups',
                title: 'Multiplication as Groups',
                content: 'Think of 4 × 3 as "4 groups of 3." Each group has 3 blocks:',
                blockData: {
                  groups: [
                    { count: 3, label: '3' },
                    { count: 3, label: '3' },
                    { count: 3, label: '3' },
                    { count: 3, label: '3' }
                  ],
                  operation: '+',
                  showTotal: true
                }
              },
              {
                type: 'fill-code',
                title: 'Multiply!',
                content: 'Fill in the product:',
                template: '6 × 7 = ___',
                answer: '42',
                hint: 'Think: 6 × 7 = 6 × 5 + 6 × 2 = 30 + 12'
              }
            ]
          },
          {
            id: 'arith-fractions',
            title: 'Fractions',
            steps: [
              {
                type: 'info-visual',
                visualType: 'fraction-circle',
                title: 'What is a Fraction?',
                content: 'A fraction represents parts of a whole. The top number (numerator) tells how many pieces you have. The bottom number (denominator) tells how many equal pieces the whole is divided into.',
                fractionData: {
                  numerator: 3,
                  denominator: 4,
                  color: '#6366f1',
                  label: '3 out of 4 pieces are filled'
                }
              },
              {
                type: 'multiple-choice',
                title: 'Read the Fraction',
                content: 'If a pizza is cut into 8 equal slices and you eat 3, what fraction did you eat?',
                choices: ['3/5', '3/8', '5/8', '8/3'],
                correctIndex: 1,
                explanation: 'You ate 3 slices out of 8 total. That\'s 3/8! The total slices (8) go on the bottom, and the slices you ate (3) go on top.'
              },
              {
                type: 'info-visual',
                visualType: 'fraction-circle',
                title: 'Half = 1/2',
                content: 'The simplest fraction is one half. The circle is split into 2 equal parts, and 1 is filled.',
                fractionData: {
                  numerator: 1,
                  denominator: 2,
                  color: '#10b981',
                  label: 'One half — exactly 50%'
                }
              },
              {
                type: 'info-visual',
                visualType: 'fraction-circle',
                title: 'Equivalent Fractions',
                content: '2/4 is the same as 1/2! When you fill 2 out of 4 pieces, you fill exactly half the circle. These are called equivalent fractions.',
                fractionData: {
                  numerator: 2,
                  denominator: 4,
                  color: '#10b981',
                  label: '2/4 = 1/2 — same amount!'
                }
              },
              {
                type: 'fill-code',
                title: 'Simplify!',
                content: 'What is 4/8 simplified to its simplest form?',
                template: '4/8 = ___',
                answer: '1/2',
                hint: 'Divide both top and bottom by their greatest common factor (4)'
              }
            ]
          }
        ]
      }
    ]
  }
};

// Helper functions
export function getTrack(trackId) {
  return TRACKS[trackId] || null;
}

export function getCourse(trackId, courseId) {
  const track = getTrack(trackId);
  if (!track) return null;
  return track.courses.find(c => c.id === courseId) || null;
}

export function getLesson(trackId, courseId, lessonId) {
  const course = getCourse(trackId, courseId);
  if (!course) return null;
  return course.lessons.find(l => l.id === lessonId) || null;
}

export function getAllTracks() {
  return Object.values(TRACKS);
}
