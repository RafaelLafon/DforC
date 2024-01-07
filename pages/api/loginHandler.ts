import { PrismaClient } from '@prisma/client'
import { randomInt } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  email: string
  password: string
}

const prisma = new PrismaClient()

export default async function LoginFormHandler( req: NextApiRequest,
  res: NextApiResponse<Data>){
  {  
    var form=JSON.parse(req.body)
    
    const verif = await prisma.user.findFirstOrThrow({Email:form.email})
    res
  }
}

