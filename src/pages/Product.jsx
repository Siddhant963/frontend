import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import productcard from '../components/ProductCard';
import ProductCard from '../components/ProductCard';



function Product() {
const paramid = useParams();
const id = paramid.id;

const [product, setProduct] = useState([]);
useEffect(()=>{ 
    const fetchdata = async ()=>{ 
      try {
        const response = await axios.get(`https://backend-twocups.onrender.com/product/getproduct?categoryId=${id}`);
        setProduct(response.data);
      
      } catch (error) {
        console.error(error);
      }
    }
    fetchdata();
},[])


  return (
    <>
    <div className='flex flex-wrap gap-2.5 justify-center'>
    {
      product.length > 0 && (
        product.map(data =>{ 

        return  <ProductCard key={data._id} {...data}/>
          
        })
      )
    }
    </div>

    </>
  )
}

export default Product
