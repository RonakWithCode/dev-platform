const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    AppwriteCollectionUserInfoID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    AppwriteAppinfoCollection: String(import.meta.env.VITE_APPWRITE_APPINFO_COLLECTION_ID),
    AppwriteCommentsCollection: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID),
    AppwriteDeveloperInformation: String(import.meta.env.VITE_APPWRITE_DEVELOPERINFORMATION_COLLECTION_ID),
    AppwriteLogandErrorCollection: String(import.meta.env.VITE_APPWRITE_LOGANDERROR_COLLECTION_ID),
    AppwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    AppwritePostAppImageBucketID: String(import.meta.env.VITE_APPWRITE_POST_APP_IAMGE_BUCKET_ID)
}

export default conf