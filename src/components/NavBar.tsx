import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import {buttonVariants } from './ui/button'
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/server'



const NavBar = () => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
        <MaxWidthWrapper> 
              <div className='flex justify-between items-center h-14'>
                  <Link href="/" className='font-semibold text-3xl flex pl-5'>
                    Kan<span className='text-orange-500'>x</span>a
                  </Link>

                  <div className='sm:flex items-center space-x-3.5'>
                    <Link
                      href ="/pricing"
                      className={buttonVariants({
                        size:"sm",
                        variant:'ghost'
                      })}
                    >
                      Pricing
                    </Link>
                      
                    <LoginLink
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'sm',
                    })}>
                    Sign in
                  </LoginLink>
                  <RegisterLink
                    className={buttonVariants({
                      size: 'sm',
                    })}>
                    Get started{' '}
                  </RegisterLink>

                </div>
                  
              </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default NavBar