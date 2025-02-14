import React from "react";
import {Link} from 'react-router-dom';


function Catcard(props) {
     const data = props.cat;

     
     

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={"https://backend-twocups.onrender.com/"+data.imageUrl }alt="" className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{data.name}</h3>
          <p className="text-gray-600 mt-1">{data.description}</p>
          <div className="mt-4 flex space-x-2">
            <Link to={`/products/${data._id}`}
            className="flex-1 bg-amber-100 text-amber-800 py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-amber-200">
              More...
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Catcard;
