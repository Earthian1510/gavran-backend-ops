import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API } from '../api'

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async () => {
        const response = await axios.get(API.categories);
        return response.data;
    }
)

export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (categoryData) => {
        const response = await axios.post(API.categories, categoryData)
        return response.data;
    }
)

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (categoryData) => {
        const response = await axios.put(`${API.categories}/${categoryData._id}`, categoryData)
        return response.data;
    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id) => {
        await axios.delete(`${API.categories}/${id}`)
        return id;
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'success';
            state.categories = action.payload
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.payload.message
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload)
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            const index = state.categories.findIndex((cat) => cat._id === action.payload._id)
            if(index > -1){
                state.categories[index] = action.payload
            }
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories.filter((cat) => cat._id !== action.payload)
        })
    }
})

export default categorySlice.reducer;