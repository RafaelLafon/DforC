import { PrismaClient } from '@prisma/client'
import { randomInt } from 'crypto'
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Passions_Conflict } from 'next/font/google';
import {verifEmail,verifyPassword,allowTag} from '../../auth/auth'



type Data = {
  name: string
  email: string
  password: string
}

const prisma = new PrismaClient()



export default async function SigninFormHandler( req: NextApiRequest,
  res: NextApiResponse<Data>){
  {
    var form=JSON.parse(req.body)
    if (form.password=="" || form.email==""){
      res.redirect(200, `/signin`)
    }
    /*
    if (!verifEmail(form.email) && !verifyPassword(form.password)){
      res.redirect(200, `/signin`)
    }*/

    const hashedPassword = await bcrypt.hash(form.password, 10);
    const user = await prisma.user.create({
      data: {
        Email: form["email"],
        Password: hashedPassword,
        Name:"admin" ,
        Tag: await allowTag("admin"),
        Status: 1,
        Languages:"C#",
        Serveurs:"",
        Amis:"",
        Parameters:""
      }
    })
    console.log(user)
    
  }
}

