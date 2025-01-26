import React, { useState } from 'react'
import Header from '../components/Header'
import AddProduct from '../components/AddProduct'
import FetchProducts from '../components/FetchProducts'

const Products = () => {
  const [editProduct, setEditProduct] = useState(null)
  
  const resetEditProduct = () => {
    setEditProduct()
  }
  return (

    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <AddProduct resetEditProduct={resetEditProduct} editProduct={editProduct} />
          </div>
          <div className="col-md-6">
            <FetchProducts onEdit={setEditProduct}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products