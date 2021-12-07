import '../node_modules/uikit/dist/css/uikit.min.css';
import '../node_modules/uikit/dist/js/uikit-icons.js';
import logo from './logo.svg';
import './App.css';

import Contact from './components/Contact/Contact';
import Header from './components/Header/Header';


function App() {
  return (
    <div className="App">
      <Header />
      <Contact />
      <footer className="App-footer ">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="">
            Powered by React
          </span>
      </footer>

    </div>
  );
}

export default App;
