import React from 'react'
import Catcard from '../components/Catcard';
import axios from 'axios';

function CategoryCard() {
     const [cats, setCats] = React.useState([]);

     React.useEffect(() => {
        axios.get('http://localhost:3000/category/findallcategory')
        .then(response => {
          setCats(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
     }, []);

     
     


  return (
    <>
     {
          cats.map(cat => (
            <Catcard key={cat._id} cat={cat} />
          ))
     }
    </>
  )
}

export default CategoryCard
