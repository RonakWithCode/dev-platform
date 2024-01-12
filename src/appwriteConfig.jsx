import { Client, Account } from 'appwrite';
import conf  from './utils/VarConfing'


const client = new Client()
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectID);

        
export const account = new Account(client);
export default client;
// TODO 12/01/23 This is a Service for getting accounts from appwrite but this is support my code, Appcations later i need to fix it.
// export class AuthService {
//         client = new Client()
//         account;
//         constructor(){
                // this.client.setEndpoint(conf.appwriteUrl) 
//                 .setProject(conf.appwriteProjectID);
//                 this.account = new Account(this.client)
//         }
// }

// const authService = new AuthService();
// export default authService;
