import React, { useEffect, useState } from 'react'
import { deleteProduct, fetchProducts } from '../slices/productSlice'
import { fetchCategories } from '../slices/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'
import { Link } from 'react-router-dom'

const FetchProducts = ({ onEdit }) => {

  const dispatch = useDispatch()
  const [showMsg, setShowMsg] = useState(false)
  const [msg, setMsg] = useState('')
  const [filterCategory, setFilterCategory] = useState('All');

  const { products, status, error } = useSelector((state) => state.products)
  const categoryArr = useSelector((state) => state.categories.categories)
  
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleEditProduct = (product) => {
    onEdit(product)
    window.scrollTo({
        top: 0, 
        behavior: 'smooth', 
    });
  }

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id))
    .then(() => {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth', 
        });
        setShowMsg(true)
        setMsg("Product deleted successfully!")
        dispatch(fetchProducts());
        setTimeout(() => {
            setMsg('')
            setShowMsg(false)
        }, 3000)
    })
  }

  const filteredProducts = filterCategory != 'All' ? products.filter((product) => product.category.name == filterCategory) : products;

  return (
    <div className='container my-3'>
            <h2>All Products</h2>
            <div className='mb-3'>
                <select name="filterCategory" className='form-select' onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="All">All</option>
                    {
                        categoryArr?.map((cat) => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))
                    }
                </select>
            </div>
            <Modal show={showMsg} message={msg} />
            
            {
                status==='loading' && <div className='alert alert-info text-center' style={{fontFamily: "DM Serif Text, serif"}}>Loading...</div> 
            }
            {
                error && <div className='alert alert-danger text-center' style={{fontFamily: "DM Serif Text, serif"}}>Failed to get products.</div> 
            }
            {
                products
                &&
                <div className='pb-4 my-3'>
                    {
                        filteredProducts?.map((product) => (
                            <div key={product._id} className='card p-3 mb-3'>
                                <div className="">
                                <div className=''>
                                    Name: <span className='fw-bold fs-5'> {product.name} </span><br />
                                    Category: <span className='fw-bold fs-5'> {product.category.name} </span><br />
                                    Price (per Kg): <span className='fw-bold'>₹ {product.price_per_kg}</span> <br />
                                    Produce Quantity (Kg): <span className='fw-bold'>{product.produce_quantity}</span> <br />
                                    Description: <span className='fw-bold'>{product.description}</span> <br />
                                    Farmer Location: <span className='fw-bold'>{product.farmer_location}</span> <br />
                                    Farm Produce Store Date: <span className='fw-bold'>{product.farm_produce_store_date}</span> <br />
                                    Image URL: <Link to={`${product.imageUrl ? product.imageUrl : ''}`} className='fst-italic'>{product.imageUrl ? product.imageUrl : '-'}</Link>
                                </div>
                                <div className='float-end'>
                                    <button className='btn btn-sm btn-primary mx-1' onClick={(() => handleEditProduct(product))}>Edit</button>
                                    <button className='btn btn-danger btn-sm' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            
        </div>
  )
}

export default FetchProducts