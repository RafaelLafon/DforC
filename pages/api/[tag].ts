import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextApiHandler } from "next";
import { UserInfo } from '@/struct/struct'
import { useCookies } from "react-cookie"
import { verifCookie,getUserInfo } from "../../auth/auth"



export default async function infoHandler( req: NextApiRequest,
  res: NextApiResponse<UserInfo>)
  {
  const { id } = req.query;
  var info=await getUserInfo(id)
  if (info!=undefined){
    res.status(200).json(info)
  } else{
    var result:UserInfo={name:"none",tag: "none",image: "none"}
    res.status(404).end();
  } 
}

