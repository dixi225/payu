import db from "@repo/db/client";
import express from "express"

const app=express()

app.use(express.json())



app.post("/hdfcWebhook", async (req, res) => {
        const paymentInfo:{
            token:string,
            userId:string,
            amount:string
        }={
            token:req.body.token,
            userId:req.body.userId,
            amount:req.body.amount
        }
        try {
            await db.$transaction([
                db.balance.update({
                    where:{
                        userId:Number(paymentInfo.userId)
                    },
                    data:{
                        amount:{
                            increment:Number(paymentInfo.amount)
                        }
                    }
                }),
                db.onRampTransaction.update({
                    where:{
                        token:paymentInfo.token
                    },
                    data:{
                        status:"Success"
                    }
                })
            ])
            res.status(200).json({
                "message":"Captured"
            })
        } catch (error) {
            await db.onRampTransaction.update({
                where:{
                    token:paymentInfo.token
                },
                data:{
                    status:"Failure"
                }
            })
            res.status(400).json({
                "message":"Error while processing webhook"
            })
        }
})


app.listen(3003,()=>console.log(3003))