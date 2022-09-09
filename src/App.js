import './App.css';
import 'bulma/css/bulma.min.css'
import TeamList from './components/TeamList';
import ResultList from './components/ResultList';

function App() {
  return (
    <div className="App">

      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">
            Football Management App
          </p>
          <p className="subtitle">
            Done in react 
          </p>
        </div>
      </section>
      
      <div className='container'>
        <div className='columns is-centered'>
          <div className='column is-half'>
            <h1 className='title has-text-white'>Team List</h1>
            <TeamList />
          </div>
        </div>
      </div>
      
      <div className='container'>
        <div className='columns is-centered'>
          <div className='column is-half'>
            <h1 className='title has-text-white'>Team List</h1>
            <ResultList />
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default App;
