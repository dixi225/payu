import CredentialProvider from "next-auth/providers/credentials";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt"

export const options={
    secret: process.env.NEXTAUTH_SECRET,    
    providers:[
        CredentialProvider({
            name:"Credentials",
            credentials:{
                phone:{label:"Phone number", type:"text",placeholder:"Your Phone Number"},
                password:{label:"Password",type:"password",placeholder:"Password"}
            },
            async authorize(credentials:any):Promise<any>{
                    if(!credentials.password||!credentials.phone) return null
                    const {phone,password}=credentials
                    const existingUser = await prisma.user.findFirst({
                        where: {
                            phone
                        }
                    });
                    if(existingUser){
                        const isPasswordValid=await bcrypt.compare(password,existingUser.password)
                        if(isPasswordValid) return existingUser
                        else return null
                    }
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const user =await prisma.user.create({
                        data:{
                            phone,
                            password:hashedPassword
                        }
                    })
            return user}})],
            callbacks: {
                async session({ token, session }: any) {
                    try{
                        session.user.id = token.sub
                        return session
                    }
                    catch(err){
                        console.log(err)
                        return null
                    } 
                }
            }
        }