import './App.css';
import PokemonApi from './components/PokemonApi';
import bg from '../src/components/bg.jpg'
function App() {
  return (
    <div className='container' style={{ backgroundImage:`url(${bg})` }}>
    <h1 style={{textAlign:"center", fontFamily:"cursive",color:"white"}}>Pokemon Card</h1>
    <PokemonApi/>
    </div>
  );
}

export default App;
