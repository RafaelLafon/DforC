import { PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt';
import { useCookies } from "react-cookie"
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
    const [cookie, setCookie] = useCookies(["user"])
    try{ 
    bcrypt.compare(form.password,(await prisma.user.findFirstOrThrow({where:{Email:form.email}})).Password, async function(err, result) {
        if (result) {
            var user= (await prisma.user.findFirstOrThrow({where:{Email:form.email}}))
            
            setCookie("user", {"name":user.Name} ,{
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
              })
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

