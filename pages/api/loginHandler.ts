import { PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt';
import { Console } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
import { RedirectType, redirect } from 'next/navigation'

type Data = {
  name: string
  email: string
  password: string
}

const prisma = new PrismaClient()

export default async function LoginFormHandler( req: NextApiRequest,
  res: NextApiResponse<Data>)
  {  
    var form=JSON.parse(req.body)
    try{
    bcrypt.compare(form.password,(await prisma.user.findFirstOrThrow({where:{Email:form.email}})).Password, function(err, result) {
        if (result) {
            console.log("oui")
            res.redirect(200, `/`)
        } else{
            console.log("non")
            res.redirect(403, `/login`)
        }
    });
} catch (PrismaKnownClientError){
    console.log("existe pas")
}
}

