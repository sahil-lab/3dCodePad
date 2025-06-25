# 3D CodePad ✨

A stunning 3D code editor with animated backgrounds, multi-language execution, and beautiful glassmorphism UI design.

![3D CodePad Preview](https://img.shields.io/badge/Status-Ready-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-Latest-black?style=for-the-badge&logo=three.js)

## ✨ Features

### 🎨 **20+ Animated 3D Themes**
- **🌐 Cyber Grid** - Animated grid with sparkle effects
- **⭐ Starfield** - Deep space with floating stars
- **🌀 Torus Knot** - Rotating torus with dynamic lighting
- **🔮 Floating Orbs** - Smooth floating spheres with glow
- **📦 Wire Cubes** - Rotating wireframe geometries
- **💎 Crystal Poly** - Illuminated icosahedron with particles
- And 14 more stunning variations!

### 💻 **Multi-Language Support**
- 🔧 **C** - Classic systems programming
- ⚡ **C++** - Modern C++ with STL
- ☕ **Java** - Object-oriented programming
- 🐍 **Python** - Versatile scripting language
- 🟨 **JavaScript** - Dynamic web programming

### 🎯 **Advanced Features**
- **Real-time Code Execution** via Piston API
- **Monaco Editor** with syntax highlighting
- **Glassmorphism UI** with backdrop blur effects
- **Responsive Design** for all screen sizes
- **Custom Themes** for editor and UI
- **Particle Effects** and dynamic lighting
- **Smooth Animations** and transitions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the files, navigate to the project directory
   cd 3dcodepad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - Enjoy coding in 3D! 🎉

### Build for Production

```bash
npm run build
```

## 🎮 How to Use

1. **Select a Theme** - Choose from 20+ animated 3D backgrounds
2. **Pick a Language** - Select your preferred programming language
3. **Write Code** - Use the Monaco editor with syntax highlighting
4. **Execute** - Click the "Execute" button to run your code
5. **View Output** - See results in the right panel

## 🛠 Technical Stack

- **Frontend Framework**: React 18
- **3D Graphics**: Three.js + React Three Fiber
- **3D Components**: React Three Drei
- **Code Editor**: Monaco Editor
- **Code Execution**: Piston API
- **Styling**: Tailwind CSS
- **Build Tool**: Webpack 5
- **Transpilation**: Babel

## 🎨 Customization

### Adding New Themes
Create new theme components in `src/App.js`:

```javascript
const MyCustomTheme = ({ color = '#ff0000' }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.5;
  });
  
  return (
    <mesh ref={ref}>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
```

### Adding New Languages
Extend the `LANGS` and `SNIPPETS` arrays:

```javascript
const LANGS = [
  // ... existing languages
  { id: 'rust', label: '🦀 Rust', color: '#CE422B' }
];

const SNIPPETS = {
  // ... existing snippets
  rust: 'fn main() {\n    println!("Hello, Rust!");\n}'
};
```

## 🌟 Performance Features

- **Efficient Rendering** with React Three Fiber
- **Optimized Particle Systems** with controlled counts
- **Smart Culling** for better performance
- **Responsive Canvas** sizing
- **Lazy Loading** of 3D components

## 🔧 Configuration

### Development Server
- **Port**: 3000 (configurable in webpack.config.js)
- **Hot Reload**: Enabled
- **Source Maps**: Available in development

### Editor Settings
- **Font Size**: 14px
- **Line Height**: 1.6
- **Word Wrap**: Enabled
- **Minimap**: Disabled for cleaner UI

## 📝 License

MIT License - Feel free to use this project for learning and development!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new 3D themes
- Improve UI/UX
- Add new programming languages
- Optimize performance
- Fix bugs

## 🎯 Future Enhancements

- [ ] File system integration
- [ ] Multiple file support
- [ ] Theme editor
- [ ] Code sharing features
- [ ] Performance profiling
- [ ] Mobile touch controls
- [ ] Custom shader support

---

**Made with ❤️ and lots of ☕**

*Happy coding in 3D!* 🚀✨ 