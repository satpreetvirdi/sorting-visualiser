import React from 'react';
import "./index.css"
import Nav from './components/Nav';
import Main from './components/Main';
import Root from './components/Root';


function App() {
  return (
    <main className='grid grid-rows-4'>
    {/* <Root/> */}
    <Nav/>
    <Main/>
    </main>
    );
}

export default App;
