import cookie from 'js-cookie'
import Router from 'next/router'

type content = {
  tag:string,
  configured:boolean
}


export const login = ({ tag ,isConfigured}) => {
  var cookieContent:content={"tag":tag,"configured":isConfigured}
  var stringified=JSON.stringify(cookieContent)
  console.log(stringified)

  cookie.set('connectCookie',stringified,{ expires:3600,secure:true})
  Router.push('/')
  }

export const logout = () => {
  cookie.remove("connectCookie")
  Router.push('/')
}
