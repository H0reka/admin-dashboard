import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';

export const AddProduct = () => {
    const handleSubmission = () =>{}
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll h-[100vh] no-scrollbar">
      <header className="text-3xl text-brand font-bold">Add Product</header>
      <ProductForm submitForm = {handleSubmission}/>
    </div>
  )
}

export const EditProduct = () => {
    const {id} = useParams();
    const [initialData, setInitialData] = useState();
    useEffect(()=>{
        axios.get(`/noadminapi/products/${id}`).then((res)=>{
            setInitialData(res.data);
        })
    }, []);
    const handleSubmission = () =>{}
    if(!initialData) return <div>Loading...</div>
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll h-[100vh] no-scrollbar">
      <header className="text-3xl text-brand font-bold">Edit Product</header>
      <ProductForm  submitForm = {handleSubmission} initialData={initialData}/>
    </div>
  )
}

