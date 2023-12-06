import { Prisma, PrismaClient } from '@prisma/client'
import { randomInt } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

async function Reset(){
   prisma.user.deleteMany()
}


export default function handler()  {
  
  Reset()
}
