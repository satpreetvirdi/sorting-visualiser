import React from 'react';
import "./index.css"
import Nav from './components/Nav';
import Main from './components/Main';


function App() {
  return (
    <main className='grid grid-rows-4'>
    <Nav/>
    <Main/>
    </main>
    );
}

export default App;
