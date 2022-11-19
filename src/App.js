import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import DetailPoke from "./pages/detail/DetailPoke";
import Type from "./pages/type/Type";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/pokemon" element={<Home />}/>
          <Route path="/pokemon/:id" element={<DetailPoke/>} />
          <Route path="/types" element={<Type />} />
          <Route path="/pokemon/type/:id" element={<Type />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
