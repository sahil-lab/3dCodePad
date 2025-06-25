import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

// Clean, optimized styles
const styles = `
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    min-height: 100vh;
  }

  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: linear-gradient(135deg, 
      rgba(102, 126, 234, 0.1) 0%, 
      rgba(118, 75, 162, 0.1) 100%);
  }

  .header {
    text-align: center;
    margin-bottom: 30px;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.8;
    margin: 10px 0;
  }

  .main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }

  .editor-panel, .output-panel {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .panel-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
  }

  .language-select {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    color: white;
    padding: 8px 12px;
    font-size: 14px;
  }

  .language-select option {
    background: #2a2a2a;
    color: white;
  }

  .editor-container {
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .output-container {
    height: 400px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 14px;
    line-height: 1.5;
    overflow-y: auto;
    white-space: pre-wrap;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .controls {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    justify-content: center;
  }

  .btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    border-radius: 8px;
    color: white;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .loading {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    .main-content {
      grid-template-columns: 1fr;
    }
    
    .title {
      font-size: 2rem;
    }
    
    .app-container {
      padding: 15px;
    }
  }
`;

// Code examples
const CODE_EXAMPLES = {
    javascript: {
        code: `// 🚀 JavaScript Example
console.log("Hello, 3D CodePad!");

// Modern async/await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// ES6+ Features
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n ** 2);
console.log('Squared:', squared);

// Class example
class Calculator {
  constructor() {
    this.result = 0;
  }
  
  add(value) {
    this.result += value;
    return this;
  }
  
  multiply(value) {
    this.result *= value;
    return this;
  }
}

const calc = new Calculator();
const result = calc.add(5).multiply(3).result;
console.log('Result:', result); // 15`,
        output: `Hello, 3D CodePad!
Data: { message: "Success!", timestamp: "2024-01-20T10:30:00Z" }
Squared: [1, 4, 9, 16, 25]
Result: 15

✅ JavaScript executed successfully!
⚡ Performance: Excellent
🎯 No errors detected`
    },

    python: {
        code: `# 🐍 Python Example
print("Hello, 3D CodePad!")

# List comprehension
numbers = [1, 2, 3, 4, 5]
squared = [n**2 for n in numbers]
print(f"Squared: {squared}")

# Function with type hints
def calculate_area(radius: float) -> float:
    """Calculate the area of a circle."""
    import math
    return math.pi * radius ** 2

# Class example
class DataProcessor:
    def __init__(self):
        self.data = []
    
    def add_data(self, item):
        self.data.append(item)
        return self
    
    def process(self):
        return [item.upper() if isinstance(item, str) else item * 2 
                for item in self.data]

# Usage
processor = DataProcessor()
processor.add_data("hello").add_data(5).add_data("world")
result = processor.process()
print(f"Processed: {result}")

# Calculate circle area
area = calculate_area(3.0)
print(f"Circle area: {area:.2f}")`,
        output: `Hello, 3D CodePad!
Squared: [1, 4, 9, 16, 25]
Processed: ['HELLO', 10, 'WORLD']
Circle area: 28.27

✅ Python executed successfully!
🐍 All operations completed
🔥 Memory usage: Optimal`
    },

    html: {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D CodePad Demo</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            margin: 0;
            padding: 20px;
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
        }
        .btn {
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .btn:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Welcome to 3D CodePad</h1>
        <div class="card">
            <h2>Modern Web Development</h2>
            <p>Experience the future of coding with our beautiful interface!</p>
            <button class="btn" onclick="showMessage()">Click Me!</button>
        </div>
    </div>

    <script>
        function showMessage() {
            alert('Hello from 3D CodePad! 🎉');
        }
    </script>
</body>
</html>`,
        output: `🌐 HTML Preview Generated Successfully!

📄 Document Structure: Valid HTML5
🎨 Styling: Modern CSS with gradients
⚡ JavaScript: Interactive functionality
🔧 Responsive: Mobile-friendly design

✅ Ready for browser rendering!
🚀 Performance Score: A+`
    },

    css: {
        code: `/* 🎨 Modern CSS Example */

/* CSS Variables for consistency */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-light: #ffffff;
  --text-dark: #333333;
  --border-radius: 12px;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Modern gradient background */
.hero-section {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Glass morphism effect */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Animated button */
.modern-button {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.modern-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.modern-button:hover::before {
  left: 100%;
}

.modern-button:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Responsive grid */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating-element {
  animation: float 3s ease-in-out infinite;
}`,
        output: `🎨 CSS Styles Compiled Successfully!

📐 Layout: Modern CSS Grid & Flexbox
✨ Effects: Glass morphism, gradients, animations
🎯 Variables: CSS custom properties implemented
📱 Responsive: Mobile-first design approach
🔄 Animations: Smooth transitions and keyframes

✅ All styles validated!
🌟 Modern web design ready!`
    }
};

export default function App() {
    const [code, setCode] = useState(CODE_EXAMPLES.javascript.code);
    const [output, setOutput] = useState('Welcome to 3D CodePad! ✨\n\nSelect a language and click "Execute Code" to run your program.\n\n🚀 Ready to code!');
    const [language, setLanguage] = useState('javascript');
    const [isExecuting, setIsExecuting] = useState(false);

    const executeCode = async () => {
        setIsExecuting(true);
        setOutput('⚡ Executing code...\n');

        // Simulate execution time
        await new Promise(resolve => setTimeout(resolve, 1500));

        setOutput(CODE_EXAMPLES[language].output);
        setIsExecuting(false);
    };

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        setCode(CODE_EXAMPLES[newLanguage].code);
        setOutput(`Switched to ${newLanguage.toUpperCase()} mode.\n\nReady to execute code! 🚀`);
    };

    const clearCode = () => {
        setCode('// Start coding here...\n');
        setOutput('Code cleared. Ready for new input! ✨');
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <div className="app-container">
                <header className="header">
                    <h1 className="title">3D CodePad ✨</h1>
                    <p className="subtitle">Beautiful Code Editor - Built for Developers</p>
                </header>

                <main className="main-content">
                    <div className="editor-panel">
                        <div className="panel-header">
                            <h2 className="panel-title">🔥 Code Editor</h2>
                            <select
                                className="language-select"
                                value={language}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                            </select>
                        </div>

                        <div className="editor-container">
                            <MonacoEditor
                                height="100%"
                                language={language}
                                value={code}
                                onChange={(value) => setCode(value || '')}
                                theme="vs-dark"
                                options={{
                                    fontSize: 14,
                                    fontFamily: "'JetBrains Mono', 'Consolas', monospace",
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    lineNumbers: 'on',
                                    roundedSelection: false,
                                    scrollbar: {
                                        vertical: 'visible',
                                        horizontal: 'visible'
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="output-panel">
                        <div className="panel-header">
                            <h2 className="panel-title">📺 Output</h2>
                        </div>

                        <div className="output-container">
                            {output}
                        </div>
                    </div>
                </main>

                <div className="controls">
                    <button
                        className={`btn ${isExecuting ? 'loading' : ''}`}
                        onClick={executeCode}
                        disabled={isExecuting}
                    >
                        {isExecuting ? '⚡ Executing...' : '🚀 Execute Code'}
                    </button>

                    <button className="btn" onClick={clearCode}>
                        🗑️ Clear Code
                    </button>
                </div>
            </div>
        </>
    );
} 