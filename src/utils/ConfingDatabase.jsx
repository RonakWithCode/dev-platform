import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from './VarConfing'
import { v4 as uuidv4 } from 'uuid';



export class DatabaseService {
    client = new Client()
    database;
    bucket;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // User Functions
    async createUserInfo(UserInfo) {

        try {
            // Assuming authService.databases is your Appwrite databases instance
            const response = await this.database.createDocument(conf.AppwriteDatabaseID, conf.AppwriteCollectionUserInfoID, UserInfo.userId,
                UserInfo); console.log('Document created successfully:', response);
        } catch (error) {
            console.error('Error creating document:', error);
        }


    }

    async UpdateUserInfo(UserInfo, UserId) {
        try {
            // Assuming authService.databases is your Appwrite databases instance
            const response = await this.database.updateDocument(conf.AppwriteDatabaseID, conf.AppwriteCollectionUserInfoID, UserId,
                UserInfo);
            console.log('Document created successfully:', response);
        } catch (error) {
            console.error('Error creating document:', error);
        }


    }


    async getUserInfo(UserId) {
        try {
            return await this.database.getDocument(conf.AppwriteDatabaseID, conf.AppwriteCollectionUserInfoID, UserId);
        } catch (error) {
            console.error("getUserInfo ::: " + error);
        }
    }

    async getAllUserByNotIsAccountDev(type) {
        try {
            return await this.database.listDocuments(conf.AppwriteDatabaseID, conf.AppwriteCollectionUserInfoID, [
                Query.equal('IsAccountDev', type)
            ]);

        } catch (error) {

            console.error("getAllUser ::: " + error);
        }
    }

    async getAllUser() {
        try {
            return await this.database.listDocuments(conf.AppwriteDatabaseID, conf.AppwriteCollectionUserInfoID);
        } catch (error) {
            console.error("getAllUser ::: " + error);
        }
    }

    // Post Blogs App Functions
    async createApp(App) {
        console.log(App);
        try {
            // const Id = uuidv4().replace("-", "").toString();
            const Id = ID.unique(); // genrate a unique id
            App.AppId = Id;
            console.log(Id);
            console.log(uuidv4());

            const resp = await this.uploadAPP(App.appLogo,App.screenshots,App.appCoverPhoto,Id)
            //  logo: { id: logoResponse.$id, url: logoURL },
            // screenShort: screenShorturl,
            // coverPhoto: { 
            App.appLogo = resp.logo.id;
            App.appLogoUrl = resp.logo.url; 
            App.appCoverPhoto = resp.coverPhoto.id
            App.appCoverPhotoUrl = resp.coverPhoto.url
            const ScreenShortarrayUri= [];
            const ScreenShortarrayId= [];
            for (let index = 0; index < resp.screenShort.length; index++) {
                const id = resp.screenShort[index].id;
                const url = resp.screenShort[index].url;
                ScreenShortarrayUri.push(id); 
                ScreenShortarrayId.push(id); 
            }
            App.screenshots = ScreenShortarrayId;
            App.screenshotsUrl = ScreenShortarrayUri;
            console.log(App);
            console.log(resp);
            // Assuming authService.databases is your Appwrite databases instance
            const response = await this.database.createDocument(conf.AppwriteDatabaseID, conf.AppwriteAppinfoCollection, App.AppId,
                App); 
            return response;
            }
         catch (error) {
            return 'Error creating document:', error;
        }
    }   



    // Storge functions

    async uploadFile(file) {

        try {
            const response = await this.bucket.createFile(conf.AppwriteBucketID,
                ID.unique(),
                file);
            return response.$id
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async uploadAPP(logo, screenShort, coverPhoto, id) {
        try {
            let screenShorturl = [];
            const logoResponse = await this.bucket.createFile(conf.AppwritePostAppImageBucketID, id, logo);
            const coverPhotoResponse = await this.bucket.createFile(conf.AppwritePostAppImageBucketID, id, coverPhoto);
            for (let i = 0; i < screenShort.length; i++) {
                    const screenShortResponse = await this.bucket.createFile(conf.AppwritePostAppImageBucketID, id, screenShort[i]);
                    const screenShortURL = await this.getfilePrevie(screenShortResponse.$id);
                    screenShorturl.push({ id: screenShortResponse.$id, url: screenShortURL });
                }
            const logoURL = await this.getfilePrevie(logoResponse.$id);
            const coverPhotoURL = await this.getfilePrevie(coverPhotoResponse.$id);
                const resp = {
                    logo: { id: logoResponse.$id, url: logoURL },
                    screenShort: screenShorturl,
                    coverPhoto: { id: coverPhotoResponse.$id, url: coverPhotoURL }
                };
                console.log(resp);
                return resp;
            } catch (error) {
                return 'Error Iamge Upload :', error;
            }
        } 




    async uploadDelete(fileId) {
        try {
            return await this.bucket.deleteFile(conf.AppwriteBucketID,
                fileId)
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getfilePrevie(fileId) {
        try {
            return  this.bucket.getFilePreview(conf.AppwriteBucketID, fileId).href;
        } catch {
            return "Error getting file preview";
        }
    }
    getFileDownloadLink(fileId) {
        return this.bucket.getFileDownload(conf.AppwriteBucketID, fileId);
    }


}
const databaseService = new DatabaseService();
export default databaseService;
