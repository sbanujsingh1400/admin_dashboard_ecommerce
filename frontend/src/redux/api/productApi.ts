import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { AllProductsResponse, CategoriesResponse, DeleteProductRequest, MessageResponse, NewProductRequest, ProductResponse, SearchProductsRequest, SearchProductsResponse, UpdateProductRequest } from '../types/api-types'



export const productAPI = createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/product/`}),
    tagTypes:['product'],
        endpoints:(builder)=>({
       latestProducts :builder.query<AllProductsResponse,string>({query:()=>'latest',providesTags:['product']}),
       allProducts :builder.query<AllProductsResponse,string>({query:(id)=>'admin-products',providesTags:['product']}),
       categories :builder.query<CategoriesResponse,string>({query:()=>'categories',providesTags:['product']}),
       searchProducts :builder.query<SearchProductsResponse,SearchProductsRequest>({query:({price,search,sort,category,page})=>{
            let base = `all?search=${search}`
            if(price) base+=`&price=${price}`;
            if(sort) base+=`&sort=${sort}`;
            if(category) base+=`&category=${category}`;
            return base
                },providesTags:['product']}),
       productDetails:builder.query<ProductResponse,string>({query:(id)=>id}),         
       newProduct :builder.mutation<MessageResponse,NewProductRequest>({query:({formData,id})=>({
        url:`new?id=${id}`,
        method:"POST",
        body:formData
       }),invalidatesTags:["product"]}),
       updateProduct :builder.mutation<MessageResponse,UpdateProductRequest>({query:({formData,userId,productId})=>{
         let obj:any={}
        for (const [key, value] of formData.entries()) {

            obj[key]= value;
          }
        return({
        url:`${productId}?id=${userId}`,
        method:"PUT",
        body:obj
       })},invalidatesTags:["product"]}),    
       deleteProduct :builder.mutation<MessageResponse,DeleteProductRequest>({query:({userId,productId})=>({
        url:`${productId}?id=${userId}`,
        method:"DELETE",
        
       }),invalidatesTags:["product"]}),          


    })
})


export const {useProductDetailsQuery,useLatestProductsQuery, useAllProductsQuery,useCategoriesQuery,useSearchProductsQuery,useNewProductMutation,useUpdateProductMutation,useDeleteProductMutation }=productAPI