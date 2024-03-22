import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConfingDatabase from "../utils/ConfingDatabase"

function FolderOpenPage() {
  const { id } = useParams();
  const folder = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const databaseService = new DatabaseService();
  // ConfingDatabase
  
  useEffect(() => {
    const fetchFolderDetails = async () => {
      try {

      } catch (error) {

      }
    };

    fetchFolderDetails();
  }, [id]);





  return (
    <div>folderOpenPage</div>
  )
}

export default FolderOpenPage