import React, { useState, useEffect } from 'react'
import { fetchCategories } from '../slices/categorySlice'
import { useSelector, useDispatch } from 'react-redux'
import { createProduct, updateProduct } from '../slices/productSlice'
import Modal from './Modal'

const AddProduct = ({ editProduct, resetEditProduct }) => {

    const dispatch = useDispatch()
    const [showMsg, setShowMsg] = useState(false)
    const [msg, setMsg] = useState('')

    const [productData, setProductData] = useState({
        name: '',
        price_per_kg: '',
        description: '',
        category: '',
        imageUrl: '',
        farmer_location: '',
        farm_produce_store_date: '',
        produce_quantity: ''
    })

    const categories = useSelector(state => state.categories.categories)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    useEffect(() => {
        if (editProduct) {
            setProductData({
                ...editProduct
            })
        }
    }, [editProduct])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductData((prev) => ({
            ...prev,
            [name]: name === 'price_per_kg' || name === 'produce_quantity' ? parseFloat(value) : value,

        }))
    }
   

    const handleCreateProduct = (e) => {
        e.preventDefault()

        if (editProduct) {
            dispatch(updateProduct(productData))
            .then(() => {
                resetEditProduct()
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                setShowMsg(true)
                setMsg('Product updated successfully!')
                setProductData({
                    name: '',
                    price_per_kg: '',
                    description: '',
                    category: '',
                    imageUrl: '',
                    farmer_location: '',
                    farm_produce_store_date: '',
                    produce_quantity: ''
                })
                setTimeout(() => {
                    setShowMsg(false)
                    setMsg('')
                }, 3000)
            })
        }
        else {
            dispatch(createProduct(productData))
                .then(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                    setShowMsg(true)
                    setMsg('Product added successfully!')
                    setProductData({
                        name: '',
                        price_per_kg: '',
                        description: '',
                        category: '',
                        imageUrl: '',
                        farmer_location: '',
                        farm_produce_store_date: '',
                        produce_quantity: ''
                    })

                    setTimeout(() => {
                        setShowMsg(false)
                        setMsg('')
                    }, 3000)
                })
        }

        console.log(productData)

    }


    return (
        <div className='container my-3'>
            <h2 className='mb-3'>{editProduct ? 'Edit': 'Add'} Product</h2>
            <Modal show={showMsg} message={msg} />
            <form onSubmit={handleCreateProduct}>
                <div className='mb-3'>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className='form-control'
                        name='name'
                        value={productData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="row">
                    <div className='mb-3 col'>
                        <label htmlFor="price_per_kg">Price (per Kg):</label>
                        <input
                            type="Number"
                            className='form-control'
                            name='price_per_kg'
                            value={productData.price_per_kg}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-3 col'>
                        <label htmlFor="produce_quantity">Produce Quantity:</label>
                        <input
                            type="Number"
                            className='form-control'
                            name='produce_quantity'
                            value={productData.produce_quantity}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="category">Category: </label>
                    <select
                        name="category"
                        className='form-select'
                        value={productData.category._id}
                        onChange={handleInputChange}
                    >
                        <option value="" >Select a category</option>
                        {
                            categories?.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className='mb-3'>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        className='form-control'
                        value={productData.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className='mb-3'>
                    <label htmlFor="imageUrl">Image Link:</label>
                    <input
                        type="text"
                        className='form-control'
                        name='imageUrl'
                        value={productData.imageUrl}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="row">
                    <div className='mb-3 col'>
                        <label htmlFor="farmer_location">Farmer Location:</label>
                        <input
                            type="text"
                            className='form-control'
                            name='farmer_location'
                            value={productData.farmer_location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-3 col'>
                        <label htmlFor="farm_produce_store_date">Farm Produce Store Date:</label>
                        <input
                            type="date"
                            className='form-control'
                            name='farm_produce_store_date'
                            value={productData.farm_produce_store_date.slice(0, 10)}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button type='submit' className={`btn ${editProduct ? 'btn-warning': 'btn-success'}`}>{editProduct ? 'Edit': 'Add'}</button>
            </form>

        </div>
    )
}

export default AddProduct