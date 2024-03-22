import { Client, Databases, Storage, ID, Query ,AppwriteException } from "appwrite";
import conf from './VarConfing'
import ErrorDialogBox from '../components/ErrorDialogBox';



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
                UserInfo);
            console.log('Document created successfully:', response);
            return response;
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }


    }

    async getUserInfo(UserId) {
        try {
            return await this.database.getDocument(conf.AppwriteDatabaseID, conf.AppwriteCollectionUserInfoID, UserId);
        } catch (error) {
            console.error("getUserInfo ::: " + error);
        }
    }



}
const databaseService = new DatabaseService();
export default databaseService;
