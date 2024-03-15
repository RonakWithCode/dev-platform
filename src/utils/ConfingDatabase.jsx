import { Client, Databases, Storage, ID, Query } from "appwrite";
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

        try {
            const timestamp = new Date().getTime();
            // const Id = uuidv4().replace("-", "").toString();
            const Id = App.developerId + timestamp // genrate a unique id
            const Ids = ID.unique()  // genrate a unique id
            App.AppId = Id;
            const resp = await this.uploadAPP(App.appLogo,App.screenshots,App.appCoverPhoto,Ids)
            App.appLogo = resp.logo.id;
            App.appLogoUrl = resp.logo.url; 
            App.appCoverPhoto = resp.coverPhoto.id
            App.appCoverPhotoUrl = resp.coverPhoto.url
            const ScreenShortarrayUri= [];
            const ScreenShortarrayId= [];
            for (let index = 0; index < resp.screenShort.length; index++) {
                const id = resp.screenShort[index].id;
                const url = resp.screenShort[index].url;
                ScreenShortarrayUri.push(url); 
                ScreenShortarrayId.push(id); 
            }
            App.screenshots = ScreenShortarrayId;
            App.screenshotsUrl = ScreenShortarrayUri;
            console.log(App);
            const response = await this.database.createDocument(conf.AppwriteDatabaseID, conf.AppwriteAppinfoCollection, App.AppId, App);
            return response;
            }
         catch (error) {
            return 'Error creating document:', error;
        }
    }   

    async SaveDeveloperInfo(Info) {
        try {
          console.log("Inside the save developer info :: ", Info);
      
          // Check if "DeveloperName" is present in the Info object
          if (!Info.hasOwnProperty('developerName')) {
            throw new Error('Missing required attribute "DeveloperName"');
          }
      
          // Include "DeveloperName" in the Info object      
          const response = await this.database.createDocument(
            conf.AppwriteDatabaseID,
            conf.AppwriteDeveloperInformation,
            Info.developerId,
            Info
          );
      
          console.log('Document created successfully:', response);
          return response;
        } catch (error) {
          console.log('Document created error:', error);
          return error;
        }
      }
      
    async getApp(id){
        try {
            return await this.database.getDocument(conf.AppwriteDatabaseID, conf.AppwriteAppinfoCollection, id);
        } 
        catch (error) {
            return "Error fetching details";
        }
    }
    
    //  TODO 7/1/24 1:49AM :  make a changing in this code like added query; 
    async getAllApp() { 
        // query = Query.equal('pricingType', 'free')
        try {
            const output =  await this.database.listDocuments(conf.AppwriteDatabaseID, conf.AppwriteAppinfoCollection);
            const documents = output ? output.documents :  <ErrorDialogBox title={"Not Found"} color="text-yellow-600" liteColor="bg-yellow-100"/>;
            console.log(documents);
            return documents;
        } catch (error) {
            return <ErrorDialogBox title={"Error"} message={error} color="text-red-600" liteColor="bg-red-100" />;

        }
    }


    async getAppbyQuery(query) {
        try {
// TODO This is not completely 
        const output =  await this.database.listDocuments(conf.AppwriteDatabaseID, conf.AppwriteAppinfoCollection, query);
        const documents = output? output.documents :  <ErrorDialogBox title={"Not Found"} color="text-yellow-600" liteColor="bg-yellow-100"/>;
        console.log(documents);
        return documents;
        }
        catch (error) {
            return <ErrorDialogBox title="Error" message={error} />
        }


    }


// save error and log error :
//  TODO 13/1/24 : there are tow functions that will not check is working or is not working 
     async saveError(error) {
        try {
        const response = await this.database.createDocument(
            conf.AppwriteDatabaseID,
            conf.AppwriteLogandErrorCollection,
            ID.unique(),
            error
          );
          return response;
        } catch (error) {
          console.log('Document created error:', error);
          return <ErrorDialogBox title={"Database error"} message="Error"/>;
        }
      }

      async getErrorbyUserId(id) {
        const query = [Query.equal('getLogById', id)]
        try {
            const output =  await this.database.listDocuments(conf.AppwriteDatabaseID, conf.AppwriteLogandErrorCollection, query);
            const documents = output? output.documents : <ErrorDialogBox title={"Not Found"}  color="text-yellow-600" liteColor="bg-yellow-100" />;
            return documents;
        } catch (error) {
            return <ErrorDialogBox title={"Error"} message={error} color="text-red-600" liteColor="bg-red-100" />;
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
            throw error;
        }
    }
    
    async uploadAPP(logo, screenShort, coverPhoto, id) {
        try {
            let screenShorturl = [];
    
            // Create logo file
            const logoResponse = await this.bucket.createFile(conf.AppwritePostAppImageBucketID, id, logo);
            const logoURL = await this.AppGetFilePreview(logoResponse.$id);
    
            // Create cover photo file
            const coverPhotoResponse = await this.bucket.createFile(conf.AppwritePostAppImageBucketID, id, coverPhoto);
            const coverPhotoURL = await this.AppGetFilePreview(coverPhotoResponse.$id);
    
            // Create screenshot files
            for (let i = 0; i < screenShort.length; i++) {
                const screenShortResponse = await this.bucket.createFile(conf.AppwritePostAppImageBucketID, id, screenShort[i]);
                const screenShortURL = await this.AppGetFilePreview(screenShortResponse.$id);
                screenShorturl.push({ id: screenShortResponse.$id, url: screenShortURL });
            }
    
            const resp = {
                logo: { id: logoResponse.$id, url: logoURL },
                screenShort: screenShorturl,
                coverPhoto: { id: coverPhotoResponse.$id, url: coverPhotoURL }
            };
    
            console.log(resp);
            return resp;
        } catch (error) {
            console.error('Error Image Upload:', error);
            return 'Error Image Upload';
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
            const url =  this.bucket.getFileDownload(conf.AppwriteBucketID, fileId).href;
            console.log(url);
            return url;
        } catch {
            return "Error getting file preview";
        }
    }

    async AppGetFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.AppwritePostAppImageBucketID, fileId).href;
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
