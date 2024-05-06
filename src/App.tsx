
import './App.css';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <AppRouter></AppRouter>
      </div></BrowserRouter>

  );
}

export default App;
