import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID} from 'appwrite';
import { Alert } from "@material-tailwind/react";

import { DatabaseService } from "./ConfingDatabase";
const AuthContext = createContext()
export const AuthProvider = ({children}) => {
        const navigate = useNavigate()

        const [loading, setLoading] = useState(true)
        const [user, setUser] = useState(null)

        useEffect(() => {
            //setLoading(false)
            checkUserStatus()
         }, [])

         const loginUser = async (userInfo) => {
            setLoading(true)

            console.log('userInfo',userInfo)

            try{
                let response = await account.createEmailSession(userInfo.email, userInfo.password)
                let accountDetails = await account.get();
                setUser(accountDetails)
            }catch(error){
                console.error(error)
            }
            setLoading(false)
            
         }

         const logoutUser = async () => {
            await account.deleteSession('current');
            setUser(null)
         }

         const registerUser = async (userInfo,file) => {
            setLoading(true)

            try{
                
                const Fullname = userInfo.firstName +" "+ userInfo.lastName;
                let response = await account.create(ID.unique(), userInfo.email, userInfo.password1, Fullname);
                if (response) {
                  await account.createEmailSession(userInfo.email, userInfo.password1)
                  let accountDetails = await account.get();
                  setUser(accountDetails)
                  console.log("User id ",accountDetails.$id)
                  const databaseService = new DatabaseService();
                  databaseService.uploadFile(file).then((fileId) => {
                    if (fileId) {
                        // File was uploaded successfully, and fileId contains the ID
                        console.log('File uploaded successfully. File ID:', fileId);
                        console.log('File uploaded successfully. File ID SIZE:', String(fileId).length);
                        userInfo.userId = accountDetails.$id;
                        userInfo.IsAccountDev = true;
                        userInfo.coverPhoto = String(fileId);
                        databaseService.createUserInfo(userInfo)
                        navigate('/')
                      } else {
                        // There was an issue with the upload
                        console.error('File upload failed.');

                        return false;
                      }
                  }
                  )
                  .catch((error) => { 
                    // Handle any errors that occurred during the upload
                    console.error('Error uploading file:', error);
                  });
                } else {
                  return Alert("Error To Create Account")
                }
           
            }catch(error){
                throw error;
            }
        
            setLoading(false)
         }

         const checkUserStatus = async () => {
            try{
                let accountDetails = await account.get();
                setUser(accountDetails)
            }catch(error){
                
            }
            setLoading(false)
         }

        const contextData = {
            user,
            loginUser,
            logoutUser,
            registerUser
        }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

//Custom Hook
export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;