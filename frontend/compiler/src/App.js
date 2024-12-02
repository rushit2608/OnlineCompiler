import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import Header from './Components/Header';
import Dummy from './Components/Dummy';

function App() {
  
  return (
  
  <>
  <Header/>
  <Dummy/>
    {/* <Router>
      <Header/>
      <Routes>

      </Routes>
    </Router> */}
  </>

  );
}

export default App