import './App.css';
import 'bulma/css/bulma.min.css'
import Table from './components/Table';

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
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
