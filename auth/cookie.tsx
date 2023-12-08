
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import Router from 'next/router'

export const login = ({ tag }) => {
    cookie.set('tag', tag, { expires:3600,secure:true})
    Router.push('/')
  }