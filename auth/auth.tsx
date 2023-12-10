import { PrismaClient} from '@prisma/client'
import { randomInt } from 'crypto'
import { RedirectType, redirect } from 'next/navigation'
import Router from 'next/router'
import { UserInfo } from '@/struct/struct'



export function verifEmail(email:string){
    if (email.includes("@")){
      if (email.endsWith(".com") || email.endsWith(".fr") || email.endsWith(".org") || email.endsWith(".net")){
        return true
      }
    }
    return false
  }
  
  
export function verifyPassword(password:string){
if (password.match(/[0-9]/) && password.match(/[A-Z]/) && password.length>=8){
    return  true
}
return false
}

export async function allowTag(name:string){
    var DispoTag=[]
    for(var i=1;i<10000;i++){
        if (i<10){
            DispoTag.push(`[000${i}]`)
        }
        else if (i<100){
            DispoTag.push(`[00${i}]`)
        }
        else if (i<1000){
            DispoTag.push(`[0${i}]`)
        } else{
            DispoTag.push(`[${i}]`)
        }
        
    }
    const prisma = new PrismaClient()
    var users=await prisma.user.findMany({where:{Name:name}})
    var allTag: string[] =[]
    users.forEach(element => {
        allTag.push(element.Tag.substring(element.Tag.length-5,element.Tag.length-1))
    });
    if (allTag!=undefined){
    DispoTag.filter(el=> allTag.includes(el))
    }
    prisma.$disconnect()
    return name+DispoTag[randomInt(DispoTag.length)]
}


export function verifCookie(cookie) {
    if (cookie.connectCookie === undefined || cookie.connectCookie.token=="false") {
        return false
    }    
    return true
}


export async function getUserInfo(id =0,tag =""){
    if (id!=0){
    var prisma= new PrismaClient()
    var user=await prisma.user.findFirst({where:{Id:id}})
    prisma.$disconnect
    return {"name":user?.Name || "","tag":user?.Tag  || "","image":""}
    } else if (tag!=""){
        var prisma= new PrismaClient()
    var user=await prisma.user.findFirst({where:{Tag:tag}})
    prisma.$disconnect
    return {"name":user?.Name || "","tag":user?.Tag  || "","image":""}
    }
}

