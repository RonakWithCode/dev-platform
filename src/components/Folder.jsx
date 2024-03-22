import React from 'react';

const Folder = ({ folderName, createDate, numberOfProjects }) => {
    return (
        <div className="bg-white p-4 rounded-md w-64 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                    <span className="font-semibold">{folderName}</span>
                </div>
                <div>
                    <span className="text-gray-500 text-sm">{createDate}</span>
                </div>
            </div>
            <div className="mb-2">
                <span className="text-gray-700">{numberOfProjects} Projects</span>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-sm text-gray-500">Open Folder</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
}

export default Folder;
