import cookie from 'js-cookie'
import Router from 'next/router'

type content = {
  id:number,
  token:boolean,
  configured:boolean
}


export const login = ({ id ,isConfigured}) => {
  var cookieContent:content={"id":id,"token":true,"configured":isConfigured}
  var stringified=JSON.stringify(cookieContent)
  console.log(stringified)

  cookie.set('connectCookie',stringified,{ expires:1/24,secure:true})
  return
  }

export const logout = () => {
  cookie.remove("connectCookie")
  Router.replace('/')
  return
}
