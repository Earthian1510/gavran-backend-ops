import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory , updateCategory} from '../slices/categorySlice'
import Modal from './Modal'

const AddCategory = ({ editCategory, resetEditCategory }) => {

    const dispatch = useDispatch()
    const [msgShow, setMsgShow] = useState(false)
    const [message, setMessage] = useState('')

    const [categoryData, setCategoryData] = useState({
        name: '',
        imageUrl: ''
    })

    useEffect(() => {
        if(editCategory){
            setCategoryData({
                name: editCategory.name,
                imageUrl: editCategory.imageUrl || ''
            })
        }
    }, [editCategory])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCategorySubmit = (e) => {
        e.preventDefault()

        if (editCategory) {
            const newCategoryData = {
                _id: editCategory._id,
                ...categoryData
            }

            dispatch(updateCategory(newCategoryData))
            .then(() => {
                resetEditCategory()
                setCategoryData({
                    name: '',
                    imageUrl: ''
                })
                setMsgShow(true)
                setMessage('Category Updated!')
    
                setTimeout(() => {
                    setMsgShow(false)
                    setMessage('')
                }, 3000)
            })
        }
        else {
            dispatch(createCategory(categoryData))
                .then(() => {
                    setCategoryData({
                        name: '',
                        imageUrl: ''
                    })
                    setMsgShow(true)
                    setMessage('Category created!')

                    setTimeout(() => {
                        setMsgShow(false)
                        setMessage('')
                    }, 3000)
                })
        }
    }

    return (
        <div className='container my-3'>
            <h2 className='mb-3'>{editCategory ? 'Edit' : 'Add'} Category</h2>
            <Modal
                show={msgShow}
                message={message}

            />
            <form onSubmit={handleCategorySubmit}>
                <div className='mb-3'>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className='form-control'
                        name='name'
                        value={categoryData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="imageUrl">Image Link:</label>
                    <input
                        type="text"
                        className='form-control'
                        name='imageUrl'
                        value={categoryData.imageUrl}
                        onChange={handleInputChange}
                    />
                </div>
                <button type='submit' className={`btn ${editCategory ? 'btn-warning' : 'btn-success'}`}>{editCategory ? 'Edit' : 'Add'}</button>
            </form>

        </div>
    )
}

export default AddCategory