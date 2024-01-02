import { Client, Account } from 'appwrite';
import conf  from './utils/VarConfing'


const client = new Client()
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectID);

        
export const account = new Account(client);
export default client;

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
