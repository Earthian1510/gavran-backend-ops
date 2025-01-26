import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API } from '../api'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get(API.products)
        return response.data;
    }
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData) => {
        const response = await axios.post(API.products, productData)
        return response.data;
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async(productData) => {
        const response = await axios.put(`${API.products}/${productData._id}`, productData)
        return response.data;
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async(id) => {
        await axios.delete(`${API.products}/${id}`)
        return id;
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'success';
            state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.payload.message
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const index = state.products.findIndex((product) => product._id == action.payload._id)
            if(index > -1){
                state.products[index] = action.payload
            }
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products.filter((product) => product._id !== action.payload)
        })

    }
})

export default productSlice.reducer;