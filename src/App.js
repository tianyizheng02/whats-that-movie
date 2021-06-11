import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Info from './components/Info';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header title="What's That Movie?"></Header>
      <Info></Info>
      <Footer title="2021"></Footer>
    </div>
  );
}

export default App;
