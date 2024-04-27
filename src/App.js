// import logo from './logo.svg';
import './App.css';


import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'


const App = () => {

  const apiKey = process.env.REACT_APP_NEWS_API

  // c = 'John'
  const [progress, setProgress] = useState(0)
  return (
    <div>
      {/* Hello my first class based Component {c} */}
      {/* We shall use news API to build a project */}
      <NavBar />
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      // onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={5} country="in" category="general" />} />
        <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={5} country="in" category="business" />} />
        <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={5} country="in" category="entertainment" />} />
        <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={5} country="in" category="general" />} />
        <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={5} country="in" category="health" />} />
        <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={5} country="in" category="science" />} />
        <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={5} country="in" category="sports" />} />
        <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={5} country="in" category="technology" />} />
      </Routes>
    </div>
  )
}

export default App


// difference b/w class based and function based component is 
// we have render in class based component and in function we have to return but that is not all 
// render is a lifecycle method when react loads a component so jsx is compiled to html and then the html is RENDERED on the screen
// props cant be changed but state can be changed props passed as state and made changes
// state is an alternative to useState that is used in function based component
// props are for the changes which are variable


// Component lifecycle- series of events happen from mounting to its unmounting 
// Mounting- Birth of your component
// Update- Growth of your component
// Unmount- Death of your comp..
// refer the project diagram given in video for the lifecycles

// for infinite scroll just google search it as it can be cumbersome to build from scratch
// before we convert it into functional based components we need to learn hooks
// hooks allow us to do things in fuction based component what we did in class based component
// it allows you to use state and other react features without writing a class
// commonly used react hhoks
// useState update state and set initial value
// useEffect performs side effect(like componentDidMount)
// useContext is used for context API
// useRef returns mutable current object property
// it can be hybrid of class and function based component