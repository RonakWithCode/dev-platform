import React, { useState, useMemo, useCallback, useContext } from 'react'
import { DatabaseService } from "../utils/ConfingDatabase";
import LoadingDialogBox from '../components/LoadingDialogBox';

function NewAppContent() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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

  const handleCancel = () => {
    // Add logic for canceling or redirecting
    console.log('Form canceled');
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      console.log('Form saved:', formData);

      const databaseService = new DatabaseService();
      const result = await databaseService.createApp(formData);

      if (result) {
        console.log('Document created successfully:', result);
        // Do additional actions if needed
      } else {
        console.error('Error creating document:', result);
        // Handle error if needed
      }
    } catch (error) {
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

              {/* Cancel and Save Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-2 mr-2 rounded"
                >
                  Cancel
                </button>
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