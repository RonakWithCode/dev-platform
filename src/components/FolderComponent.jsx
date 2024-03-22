import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi'; // Import icon from react-icons library
const FolderComponent = ({ folder }) => {
    const [showMenu, setShowMenu] = useState(false); // State to manage menu visibility

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    
    return (
        <div className="border-b border-gray-500 dark:border-gray-100 hover:bg-slate-200  hover:border-orange-300 dark:hover:bg-slate-600 rounded p-4 flex justify-between items-center hover:cursor-pointer">
            <div>
                <div className="flex items-center ">
                    {/* <img ></img> */}
                    <img className="w-7 h-7 mr-2 text-gray-500 dark:text-white" src={folder.icon} alt="folder icon" />
                    <div className="text-lg text-gray-500 dark:text-white font-semibold">{folder.name}</div>
                    <div className="text-xs  font-sans  ms-12 text-gray-600 dark:text-gray-200">({folder.numProjects}) Projects</div>

                </div>
            </div>
            <div className="text-sm text-center text-gray-500 dark:text-white">{folder.createDate}</div>

            <div>
                <button className='text-black dark:text-white'  onClick={toggleMenu}>
                    <FiMoreVertical />
                </button>
                {showMenu && (
                    <div className="absolute right-0 mt-8 bg-white rounded shadow-md">
                        <ul>
                            <li>
                                <button>Open Folder</button>
                            </li>
                            <li>
                                <button>Open in New Tab</button>
                            </li>
                            <li>
                                <button>Star Folder</button>
                            </li>
                            <li>
                                <button>Share</button>
                            </li>
                            <li>
                                <button>Delete</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FolderComponent;
