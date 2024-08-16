import CredentialProvider from "next-auth/providers/credentials";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt"

export const options={
    providers:[
        CredentialProvider({
            name:"Credentials",
            credentials:{
                phone:{label:"Phone number", type:"text",placeholder:"Your Phone Number"},
                password:{label:"Password",type:"password",placeholder:"Password"}
            },
            async authorize(credentials:any){
                    console.log("Hi")
                    if(!credentials.password||!credentials.phone) return null
                    const {phone,password}=credentials
                    const existingUser = await prisma.user.findFirst({
                        where: {
                            phone
                        }
                    });
                    if(existingUser){
                        const isPasswordValid=await bcrypt.compare(existingUser.password||"",password)
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
            secret: process.env.JWT_SECRET || "secret",
}