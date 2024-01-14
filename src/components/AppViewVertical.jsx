import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DatabaseService } from "../utils/ConfingDatabase";
import { Query } from 'appwrite';

function AppViewVertical() {
  const databaseService = new DatabaseService();
  const [loading, setLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apps = await databaseService.getAppbyQuery([Query.equal('pricingType', 'free')]);
        setProductsList(apps);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching apps:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log('productsList:', productsList); // Add this line

  return (
    <div className="flex space-x-4 overflow-x-scroll	">
      {productsList.map((product) => (
        <Link key={product.AppId} to={`/app/${product.AppId}`} className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              style={{
                width: '300px',
                height: '200px',
              }}
              src={product.appLogoUrl}
              alt="APP LOGO"
              className="object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.appName}</h3>
          <button
            type="button"
            className="w-full mt-5 text-lg text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 py-2.5 text-center me-2 mb-2"
          >
            {product.pricingType}
          </button>
        </Link>
      ))}
    </div>
  );
  
}

export default AppViewVertical;
