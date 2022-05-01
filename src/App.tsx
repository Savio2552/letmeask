import { createContext, useState, useEffect } from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { auth, firebase } from './services/firebase';

import {AuthContextProvider} from '../src/contexts/AuthContext'

function App() {

  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Routes>
       <Route path='/' element={<Home/>} />
       <Route path="/rooms/new" element={<NewRoom/>} />
      </Routes>
    </AuthContextProvider>

    </BrowserRouter>
  );
}

export default App;
