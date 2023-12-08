import { PrismaClient } from '@prisma/client'
import { randomInt } from 'crypto'
import bcrypt from 'bcrypt';
import Router from 'next/router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Passions_Conflict } from 'next/font/google';
import {verifEmail,verifyPassword,allowTag} from '../../auth/auth'



type Data = {
  name: string
  email: string
  password: string
}

type Result ={
  message: string
  successful: boolean
}

const prisma = new PrismaClient()



export default async function SigninFormHandler( req: NextApiRequest,
  res: NextApiResponse<Result>){
  {
    var form=JSON.parse(req.body)
    if (form.password=="" || form.email==""){
      res.status(400).json({message:"the email or password can't be empty",successful:false})
    }
    if (await prisma.user.count({where:{Email:form.email}})>0){
      res.status(400).json({message:"the email already exist",successful:false})
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
    res.status(200).json({message:"User created",successful:true})
  }
}

