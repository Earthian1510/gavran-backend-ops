import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import Header from './components/Header'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Header/>
      <main className="container my-3">
        <h1 style={{fontFamily: "DM Serif Text, serif"}} className="text-center py-3">Backend Operations</h1>
        <div className="text-center mb-3">
          <Link to='/categories' className="btn btn-info mx-2">Categories</Link>
          <Link to='/products' className="btn btn-warning">Products</Link>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1626906722163-bd4c03cb3b9b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid rounded my-3 w-90" />
        </div>
      </main>
    </div>
  )
}

export default App