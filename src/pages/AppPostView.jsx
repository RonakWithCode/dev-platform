import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatabaseService } from "../utils/ConfingDatabase";
import LoadingDialogBox from '../components/LoadingDialogBox';
import ErrorDialogBox from '../components/ErrorDialogBox';
import developerIcon from '../assets/developerIcon.png'
import emailIcon from '../assets/emailIcon.png'
import phoneIcon from '../assets/phoneIcon.png'
import websiteIcon from '../assets/websiteIcon.png'
function AppPostView() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [isShow, setIsShow] = useState(false);

  const toggleAccordion = () => {
    setIsShow(!isShow);
  };
  useEffect(() => {
    const fetchAppDetails = async () => {
      const databaseService = new DatabaseService();
      try {
        const appData = await databaseService.getApp(id);
        setApp(appData);
      } catch (error) {
        console.error('Error fetching app details:', error);
        return <ErrorDialogBox title={error}/>;
      }
    };

    fetchAppDetails();
  }, [id]);

  if (!app) {
    
    return <LoadingDialogBox/>; // You can replace this with a loading spinner or skeleton UI
  }

//   return (
//     <div className="app-details-container p-8">
//       <div className="flex items-center mb-4">
//         <img src={app.appLogoUrl} alt="App Logo" className="w-36 h-36 mr-4 rounded" />
//         <div>
//           <h1 className="text-2xl font-semibold">{app.appName}</h1>
//           <p className="text-green-500">{"app.appCompanyName"}</p>
//         </div>
//       </div>

//       <button className="bg-blue-500 text-white py-2 px-4 rounded-full mb-4">
//         View the site
//       </button>

//       <div className="overflow-x-auto mb-4">
//         <div className="flex space-x-4">
//           {app.screenshotsUrl.map((screenshot, index) => (
//             <img
//               key={index}
//               src={screenshot}
//               alt={`Screenshot ${index + 1}`}
//               style={{
//                 width: '512px',
//                 height: '300px',
//               }}
//               className="object-cover rounded"
//             />
//           ))}
//         </div>
//       </div>

//       {/* Add your Accordion and other details here */}
//       {/* ...

//         Example structure for the Accordion:
  

//       */}
//       {/* <Accordion title="About the App">
//           <p>{app.appDescription}</p>
//         </Accordion> */}

// <div id="accordion-collapse" data-accordion="collapse">
//       <h2 id="accordion-collapse-heading-1">
//         <button
//           type="button"
//           onClick={toggleAccordion}
//           className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
//           data-accordion-target="#accordion-collapse-body-1"
//           aria-expanded={isShow}
//           aria-controls="accordion-collapse-body-1"
//         >
//           <span>About the {app.appType}</span>
//           <svg
//             data-accordion-icon
//             className={`w-3 h-3 ${isShow ? 'rotate-180' : ''} shrink-0`}
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 10 6"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9 5 5 1 1 5"
//             />
//           </svg>
//         </button>
//       </h2>
//       <div id="accordion-collapse-body-1" className={`transition-all ${isShow ? 'block' : 'hidden'}`} aria-labelledby="accordion-collapse-heading-1">
//         <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
//           <p className="mb-2 text-gray-500 dark:text-gray-400">
//             {app.appDescription}
//           </p>
//           {app.appWebsite?
//           <>
//           <p className="mb-2 text-gray-500 dark:text-gray-400">Get more konow about this by </p>
//             <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
//               <li>
//                 <a href={app.appWebsite} className="text-blue-600 dark:text-blue-500 hover:underline">
//                   Website
//                 </a>
//               </li>
//             </ul>
//           </>
//             :
//             null
//           }
//         </div>
      
//       </div>
//     </div>

//       <div className="mb-4">
//         <h3 className="text-xl font-semibold mb-2">Developer Details</h3>
//         <div className="flex items-center space-x-2 mb-2">
//           <img src={developerIcon} alt="User Icon" className="w-4 h-4" />
//           <p>{app.developerName}</p>
//         </div>

//         <div className="flex items-center space-x-2 mb-2">
//           <img src={emailIcon} alt="Email Icon" className="w-4 h-4" />
//           <p>{app.developerEmail}</p>
//         </div>

//         <div className="flex items-center space-x-2 mb-2">
//           <img src={phoneIcon} alt="Phone Icon" className="w-4 h-4" />
//           <p>{app.developerPhone}</p>
//         </div>

//         <div className="flex items-center space-x-2 mb-2">
//           <img src={websiteIcon} alt="Website Icon" className="w-4 h-4" />
//           <p>{app.developerPortfolio}</p>
//         </div>
//       </div>
//     </div>
//   );
  return (
  <ErrorDialogBox/>);


}

export default AppPostView;
