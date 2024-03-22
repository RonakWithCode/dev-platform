import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { IoMdArrowDropdown, IoIosCloseCircleOutline } from 'react-icons/io';
import { MdClear } from 'react-icons/md';
import FolderComponent from '../components/FolderComponent';
import folderIcon from "../assets/SVG/icon/folder-icon.svg";



const Project = () => {
    const [folders, setFolders] = useState([]);
    const [filterOption, setFilterOption] = useState('');
    const [showClearFilter, setShowClearFilter] = useState(false);
    const [showAddFolderBox, setShowAddFolderBox] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFoldersData = async () => {
            const testData = [
                {
                    id: 1,
                    name: "Folder 1",
                    createDate: "2024-03-20",
                    icon: folderIcon,
                    numProjects: 5,
                },
                {
                    id: 2,
                    name: "Folder 2",
                    createDate: "2024-03-15",
                    icon: folderIcon,
                    numProjects: 3,
                },
                {
                    id: 3,
                    name: "Folder 3",
                    createDate: "2024-03-10",
                    icon: folderIcon,
                    numProjects: 7,
                },
                {
                    id: 4,
                    name: "My-project",
                    createDate: "2024-03-10",
                    icon: folderIcon,
                    numProjects: 7,
                },
            ];
            setFolders(testData);
        };
        fetchFoldersData();
    }, []);

    const handleFilterChange = (e) => {
        const selectedOption = e.target.value;
        setFilterOption(selectedOption);
        setShowClearFilter(true);
    };

    const clearFilter = () => {
        setFilterOption('');
        setShowClearFilter(false);
    };

    const toggleAddFolderBox = () => {
        setShowAddFolderBox(!showAddFolderBox);
        setNewFolderName('');
        setError('');
    };

    const handleFolderNameChange = (e) => {
        setNewFolderName(e.target.value);
    };

    const handleSaveFolder = () => {
        // Add logic to save the new folder
        console.log("New Folder Name:", newFolderName);
        // toggleAddFolderBox();
        setError('New Folder Name: '+newFolderName);
    };

    const handleCancelAddFolder = () => {
        toggleAddFolderBox();
    };

    return (
        <div className="px-4 py-8 bg-white dark:bg-gray-900">
            <h1 className="text-2xl text-black dark:text-white font-semibold">Projects</h1>
            <div className="flex justify-between items-center my-4">
                <button onClick={toggleAddFolderBox} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                    <HiOutlinePlusSm className="inline-block mr-2" />
                    Add Folder
                </button>
                <div className="relative">
                    <select
                        value={filterOption}
                        onChange={handleFilterChange}
                        className="bg-white dark:bg-gray-100 border rounded px-4 py-2"
                    >
                        <option value="">Filter By</option>
                        <option value="1day">1 Day</option>
                        <option value="7day">7 Days</option>
                        <option value="1month">1 Month</option>
                        <option value="6month">6 Months</option>
                        <option value="1year">1 Year</option>
                    </select>
                    {showClearFilter && (
                        <button
                            onClick={clearFilter}
                            className="absolute right-0 top-0 mt-2 mr-4 text-gray-500"
                        >
                            <MdClear />
                        </button>
                    )}
                </div>
            </div>
            {showAddFolderBox && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h2 className="text-lg text-black dark:text-white font-semibold mb-4">Add New Folder (10 words)</h2>
                        <input
                            type="text"
                            placeholder="folder name (max 10 words)"
                            className="border bg-white dark:bg-gray-800 text-black dark:text-white dark:border-gray-100 border-gray-300 rounded px-3 py-2 mb-4 w-full"
                            value={newFolderName}
                            onChange={handleFolderNameChange}
                            maxLength={10} // Limiting input to 50 characters
                        />
                        {error ?
                        <h3 className="text-sm text-red-600  mb-4">Add New Folder (10 words)</h3>
                    : null}
                    

                        <div className="flex justify-end">
                            <button onClick={handleCancelAddFolder} className="border border-none text-gray-500 dark:text-gray-100 hover:dark:bg-slate-500  rounded shadow mr-4">Cancel</button>
                            <button onClick={handleSaveFolder} className="bg-blue-500 text-white px-4 py-2 rounded shadow">Save</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 ">
                {folders.map(folder => (
                    <FolderComponent key={folder.id} folder={folder} />
                ))}
            </div>
        </div>
    );
};

export default Project;
