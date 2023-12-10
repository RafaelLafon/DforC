import { PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt';
import {allowTag}  from "../../auth/auth"
import { Console } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
import { RedirectType, redirect } from 'next/navigation'

type Data = {
  id: string
}

type Return = {
    message: string
    successful: boolean
  }




export default async function ConfigFormHandler( req: NextApiRequest,
  res: NextApiResponse<Return>)
  {  
    const prisma = new PrismaClient()
    var info=JSON.parse(req.body)
    console.log(info)

    var user=await prisma.user.findFirst({where:{Id:info.id}})
    if (user?.IsConfigured){
        res.status(400).json({message:"the email already exist",successful:false})
        return
    }
    await prisma.user.update({where:{Id:info.id},data:{Name:info.name,Tag:await allowTag(info.name)}})
    res.redirect("/").json({message:"configured successfully",successful:true})
    return
}

