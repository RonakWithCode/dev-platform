import React, { useState, useEffect } from 'react'
import { DatabaseService } from "../utils/ConfingDatabase";
import { Link } from 'react-router-dom';
import LoadingDialogBox from '../components/LoadingDialogBox';

function AppPublishInfoView() {
  const databaseService = new DatabaseService();
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apps = await databaseService.getAllApp();
        setProductsList(apps);

      } catch (error) {
        console.error('Error fetching apps:', error);
      }

    };

    fetchProducts();
  }, []); 


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productsList.map((product) => (
            <Link key={product.AppId} 
              to={`/app/${product.AppId}`}
              className="group">
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
              <button type="button" className="w-full mt-5 text-lg text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 py-2.5 text-center me-2 mb-2">
                {product.pricingType}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AppPublishInfoView