import { PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt';

import { Console } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
import { RedirectType, redirect } from 'next/navigation'

type Data = {
  tag: string
  token:string
  isConfigured:boolean
}




export default async function LoginFormHandler( req: NextApiRequest,
  res: NextApiResponse<Data>)
  {  
    const prisma = new PrismaClient()
    var form=JSON.parse(req.body)
    try{ 
    bcrypt.compare(form.password,(await prisma.user.findFirstOrThrow({where:{Email:form.email}})).Password, async function(err, result) {
        if (result) {
            var user= (await prisma.user.findFirstOrThrow({where:{Email:form.email}}))
            var configured = user.IsConfigured
              prisma.$disconnect()
              return res.status(200).json({"tag":user.Tag,"token":"true",isConfigured:configured})
        } else{
            console.log("non")
            prisma.$disconnect()
            return res.status(403).json({"tag":"","token":"false",isConfigured:false})
        }
    });
} catch (PrismaKnownClientError){
    console.log("existe pas")
    prisma.$disconnect()
    return res.status(403).json({"tag":"","token":"false",isConfigured:false})
}
}

