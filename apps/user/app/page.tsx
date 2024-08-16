"use client"
import useBalance from "@repo/store/useBalance"
export default function Home() {
  try{
    console.log(useBalance())
  }catch(err){console.log("here"+err)}
  return<>
    <div className=" font-semibold text-9xl">
      Hello from user

    </div>
  </>
}
