import React, { useEffect, useState } from 'react';
import { DatabaseService } from "../utils/ConfingDatabase";
import { Link } from 'react-router-dom';
import developerIcon from '../assets/developerIcon.png'

const Dashboard = () => {
  const databaseService = new DatabaseService();
  const [product, setProduct] = useState(null);
  const id = "6593da53035d462538261704897106015";

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const appData = await databaseService.getApp(id);
        setProduct(appData);
      } catch (error) {
        setProduct(error);
      }
    };

    fetchAppDetails();
  }, [id]);

  const OpenAppClick = (app) => {
    // Do something with the clicked app, for example, navigate to a detailed view
    console.log(`Row clicked for ${app.APPName}`);
    // You can add your navigation logic or any other action here
  };

  const dashboardData = {
    totalPageView: 1000,
    totalButtonClick: 500,
    APPS: [
      { APPid: 1, APPName: 'Product A', AppIcon: "", totalPageView: 500, totalButtonClick: 200 },
      { APPid: 2, APPName: 'Product B', AppIcon: "", totalPageView: 500, totalButtonClick: 200 },
      { APPid: 3, APPName: 'Product C', AppIcon: "", totalPageView: 500, totalButtonClick: 200 },
    ],
  };



  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-8">Update of new app</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Page View</h2>
          <p className="text-3xl font-bold text-blue-500">{dashboardData.totalPageView}</p>
        </div>

        {/* Card 2 - Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Button click's</h2>
          <p className="text-3xl font-bold text-green-500">{dashboardData.totalButtonClick}</p>
        </div>

        {/* Card 3 - Revenue
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue</h2>
          <p className="text-3xl font-bold text-orange-500">{dashboardData.revenue}</p>
        </div>*/}
        {product && (
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
        )}
      </div>

      {/* APPS */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">APPS</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <td className="p-4 text-lg font-semibold">Icon</td>
              <td className="p-4 text-lg font-semibold">Name</td>
              <td className="p-4 text-lg font-semibold">Total Page View</td>
              <td className="p-4 text-lg font-semibold">Total Button click's</td>
            </tr>
          </thead>
          <tbody>
            {dashboardData.APPS.map((app) => (
              <tr key={app.APPid} className="border border-gray-300 hover:cursor-pointer hover:border-gray-800 hover:bg-gray-100" onClick={() => OpenAppClick(app)}>
                <td className="p-4">
                  <img src={developerIcon} alt="Icon" className="w-15 h-15" />
                </td>
                <td className="p-4 ml-8 text-lg font-semibold">{app.APPName}</td>
                <td className="p-4 ml-8 text-lg font-semibold">{app.totalPageView}</td>
                <td className="p-4 ml-8 text-lg font-semibold">{app.totalButtonClick}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>


    </div>
    
  );
};

export default Dashboard;
