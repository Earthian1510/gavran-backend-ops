import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import AddCategory from '../components/AddCategory'
import FetchCategories from '../components/FetchCategories'

const Categories = () => {
  const [editCategory, setEditCategory] = useState(null)

  const resetEditCategory = () => {
    setEditCategory(null); 
};
  
  return (
    <div>
      <Header/>
      <AddCategory editCategory={editCategory} resetEditCategory={resetEditCategory}/>
      <FetchCategories onEdit={setEditCategory}/>
    </div>
  )
}

export default Categories