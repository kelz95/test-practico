import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import SearchBox from './components/SearchBox';
import Items from './components/Items';
import ItemDetail from './components/ItemDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <SearchBox /> } />
        <Route path='/items' element = { <Items /> } />
        <Route path='/items/:id' element = { <ItemDetail /> } />
        <Route path='/*' element = { <ErrorPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
