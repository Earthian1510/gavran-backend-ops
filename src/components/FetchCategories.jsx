import React, { useEffect, useState } from 'react'
import { fetchCategories, updateCategory, deleteCategory } from '../slices/categorySlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from './Modal'

const FetchCategories = ({ onEdit }) => {
    const dispatch = useDispatch()
    const [showMsg, setShowMsg] = useState(false)
    const [msg, setMsg] = useState('')

    const { categories, status, error } = useSelector((state) => state.categories)

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    const handleCategoryEdit = (categoryInfo) => {
        onEdit(categoryInfo)
        window.scrollTo({
            top: 0, 
            behavior: 'smooth', 
        });
    }

    const handleDeleteCategory = (id) => {
        dispatch(deleteCategory(id))
        .then(() => {
            window.scrollTo({
                top: 0, 
                behavior: 'smooth', 
            });
            dispatch(fetchCategories())
            setShowMsg(true)
            setMsg("Category deleted successfully");
            setTimeout(() => {
                setShowMsg(false)
                setMsg("");
            }, 3000)
        })
    }

    return (
        <div className='container my-3'>
            <hr />
            <h2>All Categories</h2>
            
            {
                status==='loading' && <div className='alert alert-info text-center' style={{fontFamily: "DM Serif Text, serif"}}>Loading...</div> 
            }
            {
                error && <div className='alert alert-danger text-center' style={{fontFamily: "DM Serif Text, serif"}}>Failed to get categories.</div> 
            }
            <Modal
                show={showMsg}
                message={msg}
            />
            {
                categories
                &&
                <div className='pb-4 my-3'>
                    {
                        categories?.map((cat) => (
                            <div key={cat._id} className='card p-3 mb-2'>
                                {/*  style={{ display: 'flex', justifyContent: 'space-between'}} d-flex align-items-center*/}
                                <div className="row">
                                <div className='col'>
                                    Name: <span className='fw-bold fs-5'>  {cat.name} </span><br />
                                    Image URL: <Link to={`${cat.imageUrl ? cat.imageUrl : ''}`}>{cat.imageUrl ? cat.imageUrl : '-'}</Link>
                                </div>
                                <div className='col-md-2 my-auto'>
                                    <button className='btn btn-sm btn-primary mx-1' onClick={(() => handleCategoryEdit(cat))}>Edit</button>
                                    <button className='btn btn-danger btn-sm' onClick={() => handleDeleteCategory(cat._id)}>Delete</button>
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

export default FetchCategories