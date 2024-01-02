import { Client, Databases,Storage,ID,Query } from "appwrite";
import conf  from './VarConfing'


export class DatabaseService{
        client = new Client()
        database;
        bucket;
        constructor(){
                this.client.setEndpoint(conf.appwriteUrl) 
                .setProject(conf.appwriteProjectID);
                this.database = new Databases(this.client)
                this.bucket = new Storage(this.client)
        }


        async createUserInfo(UserInfo){
            
              try {
                // Assuming authService.databases is your Appwrite databases instance
                const response = await this.database.createDocument(conf.AppwriteDatabaseID, conf.AppwriteCollectionUserInfoID,UserInfo.userId,
                    UserInfo);
                console.log('Document created successfully:', response);
              } catch (error) {
                console.error('Error creating document:', error);
              }
            
            
        }
    
        async UpdateUserInfo(UserInfo,UserId){
              try {
                // Assuming authService.databases is your Appwrite databases instance
                const response = await this.database.updateDocument(conf.AppwriteDatabaseID, conf.AppwriteCollectionUserInfoID,UserId,
                    UserInfo);
                console.log('Document created successfully:', response);
              } catch (error) {
                console.error('Error creating document:', error);
              }
            
            
        }


        async getUserInfo(UserId){
            try {
            return await this.database.getDocument(conf.AppwriteDatabaseID,conf.AppwriteCollectionUserInfoID,UserId);
        }catch (error){
            console.error("getUserInfo ::: "+error);
        }
        }

        async getAllUserByNotIsAccountDev(type){
            try {
            return await this.database.listDocuments(conf.AppwriteDatabaseID,conf.AppwriteCollectionUserInfoID,[
                Query.equal('IsAccountDev', type)
            ]);

            }catch(error){

            console.error("getAllUser ::: "+error);
            }
        }

        async getAllUser(){
            try {
            return await this.database.listDocuments(conf.AppwriteDatabaseID,conf.AppwriteCollectionUserInfoID);
            }catch(error){
            console.error("getAllUser ::: "+error);
            }
        }

        // 

        async uploadFile(file){
            
            try {
                const response =  await this.bucket.createFile(conf.AppwriteBucketID,
                    ID.unique(),
                    file);
                return response.$id
            } catch (error) {
                console.log(error);                
                return false;
            }
        }
        async uploadDelete(fileId){
            try {
                return await this.bucket.deleteFile(conf.AppwriteBucketID,
                    fileId)
            } catch (error) {
                console.log(error);                
                return false;
            }
        }
        async getfilePrevie(fileId){
            try {
            return this.bucket.getFilePreview(conf.AppwriteBucketID,fileId);
        }catch{
            return false;
        }
        }
        getFileDownloadLink(fileId){
            return this.bucket.getFileDownload(conf.AppwriteBucketID, fileId);
        }



}
const databaseService = new DatabaseService();
export default databaseService;
