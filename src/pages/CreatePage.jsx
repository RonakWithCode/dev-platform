import React,{useState} from 'react'
// import "../index.css";
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import NewAppContent from "../components/NewAppContent"
import NewBlogContent from "../components/NewBlogContent"
import NewNewsContent from "../components/NewNewsContent"
import AppImage from '../assets/loge.svg';  // TODO: Change it later
import BlogImage from '../assets/loge.svg'; // TODO: Change it later
import NewsImage from '../assets/loge.svg'; // TODO: Change it later

function CreatePage() {
  const [selectedOption, setSelectedOption] = useState('app');
  const [backgroundImage, setbackgroundImage] = useState(AppImage);
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
        if (e.target.value === "news")
    {
      setbackgroundImage(NewsImage);

    }
    else if (e.target.value === "blog")
    {
      setbackgroundImage(BlogImage); 
    }
    else{
      setbackgroundImage(AppImage);
    }
  };

  return (
  <div
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // White background with 70% transparency
    }}
    className="ml-4"> {/* Adjust the margin value as needed */}
      <div className="text-center my-4">
        <label className="mr-4">
          <input
            type="radio"
            value="app"
            checked={selectedOption === 'app'}
            onChange={handleOptionChange}
            className="mr-2"
          />
          App
        </label>
        <label className="mr-4">
          <input
            type="radio"
            value="news"
            checked={selectedOption === 'news'}
            onChange={handleOptionChange}
            className="mr-2"
          />
          News
        </label>
        <label>
          <input
            type="radio"
            value="blog"
            checked={selectedOption === 'blog'}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Blog
        </label>
      </div>
      
      <div className="text-center">
        {selectedOption === 'app' && <NewAppContent />}
        {selectedOption === 'news' && <NewNewsContent />}
        {selectedOption === 'blog' && <NewBlogContent />}
      </div>
    </div>
  );
};



export default CreatePage   