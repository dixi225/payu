"use client"
import { Appbar } from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
export default function Home() {
  const session=useSession()
  return<>
    {(session.data!=null&&session.data.user)?<Appbar user={session.data.user} onSignin={signIn} onSignout={signOut}/>:<Appbar onSignin={signIn} onSignout={signOut}/>}
    
  </>
}
