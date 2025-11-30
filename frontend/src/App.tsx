import './App.css'
import { Routes, Route } from "react-router-dom";

import Login from './pages/auth/Login'

import Dashboard from '@/pages/Dashboard'
import Layout from '@/layouts/Layout';
import Categories from './pages/Categories';
import Accounts from './pages/Accounts';

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account" element={<Accounts />} />
          <Route path="/category" element={<Categories />} />
          {/* <Route path="/cadastro" element={<Cadastro />} /> */}
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
