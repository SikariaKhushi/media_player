import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Player from './components/MediaPlayer/Player.js';
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <div className='bg-black'>
    <Header />
    <Provider store={store}>
      <div className="app">
        <Player />
      </div>
    </Provider>
    <Footer />
    </div>
  );
}

export default App;
