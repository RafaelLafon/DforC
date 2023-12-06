import { PrismaClient } from '@prisma/client'
import { randomInt } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  email: string
  password: string
}

const prisma = new PrismaClient()

async function LoginFormHandler( req: NextApiRequest,
  res: NextApiResponse<Data>){
  {
    var form=JSON.parse(req.body)
    const user = await prisma.user.create({
      data: {
        Email: form["email"],
        Password: form["password"],
        Name:"admin" ,
        Tag: "Test"+req.body.email+randomInt(10000),
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


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("fdp")
  LoginFormHandler(req,res)
}
