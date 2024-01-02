const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    AppwriteCollectionUserInfoID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    AppwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf