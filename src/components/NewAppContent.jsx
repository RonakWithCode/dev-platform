import React, { useState } from 'react'
import { DatabaseService } from "../utils/ConfingDatabase";
import LoadingDialogBox from '../components/LoadingDialogBox';
import { NavLink,useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

function NewAppContent() {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saveDeveloperInfo, setSaveDeveloperInfo] = useState(false);
  const [formData, setFormData] = useState({
    developerId : user.$id,
    appName: '',
    appDescription: '',
    appLogo: null,
    appCoverPhoto: null,
    screenshots: [null, null, null],
    appWebsite: '',
    pricingType: 'free', // Add pricingType to formData
    developerName: '',
    developerEmail: '',
    developerPhone: '',
    developerPortfolio: '',

  });
  // developerAddress: '',
  // developerDescription: '',
  // developerFacebook: '',
  // developerTwitter: '',
  // developerInstagram: '',
  const handleScreenshotChange = (e, index) => {
    const screenshotFile = e.target.files[0];
    setFormData((prevData) => {
      const updatedScreenshots = [...prevData.screenshots];
      updatedScreenshots[index] = screenshotFile;
      return {
        ...prevData,
        screenshots: updatedScreenshots,
      };
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: String(value),
    }));
  };

  const handleLogoChange = (e) => {
    const logoFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      appLogo: logoFile,
    }));
  };

  const handleCoverPhotoChange = (e) => {
    const coverPhotoFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      appCoverPhoto: coverPhotoFile,
    }));
  };



  const handleSave = async () => {
    try {
      setLoading(true);
      console.log('Form saved:', formData);
      const databaseService = new DatabaseService();
      if (saveDeveloperInfo) {
        // const info = {
        //   developerId: formData.developerId,
        //   developerName: formData.developerName,
        //   developerEmail: formData.developerEmail,
        //   developerPhone: formData.developerPhone,
        //   developerPortfolio: formData.developerPortfolio
        // }
        const info = {
          developerId: "hello-developer",
          developerName: "hello-developer",
          developerEmail: "hello-developer",
          developerPhone: "hello-developer",
          developerPortfolio: "hello-develepor"
        }
        console.log(info)
        const output = await databaseService.SaveDeveloperInfo(info); 
        console.log(output)
      }
      const result = await databaseService.createApp(formData);

      if (result) {
        console.log('Document created successfully:', result);

        // Do additional actions if needed
      } else {
        // console.error('Error creating document:', result);
        alert('Error in saving data: ', result);
        // Handle error if needed
      }
    }
     catch (error) {
      console.error('Error handling save:', error);

      // Handle error if needed
    } finally {
      setFormData({
        appName: '',
        appDescription: '',
        appLogo: null,
        appCoverPhoto: null,
        screenshots: [null, null, null],
        appWebsite: '',
        developerName: '',
        developerEmail: '',
        developerPhone: '',
        developerPortfolio: '',
      })
      navigate("/");
      setLoading(false);
    }
  };

  const currentLength = formData.appDescription.length;
  const maxLength = 200;
  return (
    <>
      {loading ? <LoadingDialogBox title={"Save in the Database... "} /> :
        <div className="min-h-screen flex items-center justify-center">

          <div className="bg-white p-8 shadow-md rounded-md max-w-md">
            <h1 className="text-3xl font-semibold mb-6">App Submission</h1>
            <form>
              {/* App Information */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  App Name:
                  <input
                    type="text"
                    name="appName"
                    value={formData.appName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  App Description:
                  <textarea
                    name="appDescription"
                    value={formData.appDescription}
                    onChange={handleInputChange}
                    maxLength={maxLength}

                    className="flex mt-1 p-2 w-full border rounded-md"
                  />
                  <div className="justify-between text-sm text-gray-500">
                    <span>{currentLength}/{maxLength}</span>
                  </div>
                </label>

              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  App Logo:
                  <input
                    type="file"
                    name="appLogo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="mt-1"
                  />
                </label>
                {formData.appLogo && (
                  <img
                    src={URL.createObjectURL(formData.appLogo)}
                    alt="App Logo"
                    className="max-w-xs my-2"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  App Cover Photo:
                  <input
                    type="file"
                    name="appCoverPhoto"
                    accept="image/*"
                    onChange={handleCoverPhotoChange}
                    className="mt-1"
                  />
                </label>
                {formData.appCoverPhoto && (
                  <img
                    src={URL.createObjectURL(formData.appCoverPhoto)}
                    alt="App Cover Photo"
                    className="max-w-full my-2"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Download link (Download / Website link)
                  <input
                    type="text"
                    name="appWebsite"
                    value={formData.appWebsite}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Type of App:
                </label>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="appType"
                      value="app"
                      checked={formData.appType === 'app'}
                      onChange={() => setFormData({ ...formData, appType: 'app' })}
                      className="form-radio h-4 w-4 text-blue-500"
                    />
                    <span className="ml-2">App</span>
                  </label>

                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="appType"
                      value="game"
                      checked={formData.appType === 'game'}
                      onChange={() => setFormData({ ...formData, appType: 'game' })}
                      className="form-radio h-4 w-4 text-blue-500"
                    />
                    <span className="ml-2">Game</span>
                  </label>

                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="appType"
                      value="software"
                      checked={formData.appType === 'software'}
                      onChange={() => setFormData({ ...formData, appType: 'software' })}
                      className="form-radio h-4 w-4 text-blue-500"
                    />
                    <span className="ml-2">Software</span>
                  </label>

                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="appType"
                      value="Code"
                      checked={formData.appType === 'Code'}
                      onChange={() => setFormData({ ...formData, appType: 'Code' })}
                      className="form-radio h-4 w-4 text-blue-500"
                    />
                    <span className="ml-2">Code</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Screenshots:
                </label>
                {formData.screenshots.map((screenshot, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="file"
                      name={`screenshot${index + 1}`}
                      accept="image/*"
                      onChange={(e) => handleScreenshotChange(e, index)}
                      className="mt-1"
                    />
                    {screenshot && (
                      <img
                        src={URL.createObjectURL(screenshot)}
                        alt={`Screenshot ${index + 1}`}
                        className="max-w-xs my-2"
                      />
                    )}
                  </div>
                ))}


              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Pricing Type:
                </label>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="pricingType"
                      value="free"
                      checked={formData.pricingType === 'free'}
                      onChange={() => setFormData({ ...formData, pricingType: 'free' })}
                      className="form-radio h-4 w-4 text-blue-500"
                    />
                    <span className="ml-2">Free</span>
                  </label>

                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="pricingType"
                      value="paid"
                      checked={formData.pricingType === 'paid'}
                      onChange={() => setFormData({ ...formData, pricingType: 'paid', currency: 'INR' })}
                      className="form-radio h-4 w-4 text-blue-500"
                    />
                    <span className="ml-2">Paid</span>
                  </label>
                </div>
              </div>

              {/* Price and Currency */}
              {formData.pricingType === 'paid' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Price:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="price"
                      value={
                        formData.currency === 'INR'
                          ? `₹ ${formData.price || ''}`
                          : `$ ${formData.price || ''}`
                      }
                      onChange={(e) => {

                        // Remove the currency symbol before updating the state
                        let updatedValue = e.target.value.replace(/[^0-9.]/g, '');
                        updatedValue = parseFloat(updatedValue) || 0; // Handle NaN by defaulting to 0
                        updatedValue = Math.max(1, updatedValue);
                        setFormData({ ...formData, price: updatedValue });
                      }}
                      className="mt-1 p-2 w-full border rounded-md"
                    />

                    <label className="ml-2 inline-flex items-center">
                      <input
                        type="radio"
                        name="currency"
                        value="USD"
                        checked={formData.currency === 'USD'}
                        onChange={() => setFormData({ ...formData, currency: 'USD' })}
                        className="form-radio h-4 w-4 text-blue-500"
                      />
                      <span className="ml-2">$</span>
                    </label>
                    <label className="ml-2 inline-flex items-center">
                      <input
                        type="radio"
                        name="currency"
                        value="INR"

                        checked={formData.currency === 'INR'}
                        onChange={() => setFormData({ ...formData, currency: 'INR' })}
                        className="form-radio h-4 w-4 text-blue-500"
                      />
                      <span className="ml-2">INR</span>
                    </label>
                  </div>
                </div>
              )}




              {/* Developer Information */}
              <h3 className="text-2xl font-semibold mb-6">Developer information </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Developer Name:
                  <input
                    type="text"
                    autoComplete='name'
                    name="developerName"
                    value={formData.developerName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Developer Email:
                  <input
                    type="email"
                    name="developerEmail"
                    autoComplete='email'
                    value={formData.developerEmail}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Developer Phone Number: (optional)
                  <input
                    type="tel"
                    autoComplete='tel'
                    name="developerPhone"
                    value={formData.developerPhone}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Developer Portfolio Link (optional)
                  <input
                    type="text"
                    autoComplete='link'
                    name="developerPortfolio"
                    value={formData.developerPortfolio}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Save Developer Information:   &nbsp;
                  <input
                    type="checkbox"
                    name="saveDeveloperInfo"
                    checked={saveDeveloperInfo}
                    onChange={() => setSaveDeveloperInfo(!saveDeveloperInfo)}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                </label>
              </div>

              {/* Cancel and Save Buttons */}
              <div className="flex justify-end">
                <NavLink to="/"
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 mr-2 rounded"
                >
                  Cancel
                </NavLink>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save
                </button>

              </div>
            </form>
          </div>

        </div>

      }


    </>

  );
};

export default NewAppContent