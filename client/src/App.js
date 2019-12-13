import React from 'react';

// import GoogleMap from './map.js'
import MapTest from './map.js'
import './App.css';

function App() {

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {/* <h2 style={{ margin: '10px' }} >Commuting App</h2> */}
      {/* <GoogleMap />  */}
      <div style={{ height: '500px', width: '100%' }} >  
        <MapTest />
      </div>
    </div>
  )
}

export default App;
