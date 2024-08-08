import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
        <MaxWidthWrapper> 
              <div className='flex justify-between items-center h-14'>
                  <Link href="/" className='font-semibold text-3xl flex pl-5'>
                    Kan<span className='text-orange-500'>x</span>a
                  </Link>

                  <div className='sm:flex items-center'>
                    <Link
                      href ="/pricing"
                      className={buttonVariants({
                        size:"sm",
                        variant:'ghost'
                      })}
                    >
                      Pricing
                    </Link>
                      
                    <SignInButton>
                      <Button 
                        className={buttonVariants({
                          size:"sm",
                          variant:'ghost'
                        })}
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                      
                    <SignUpButton>
                      <Button 
                        className={buttonVariants({
                          size:"sm",
                          variant:'ghost',
                          className:'flex justify-center items-center gap-1'
                        })}
                      >
                        Get Started
                        <ArrowRight className=''/>
                      </Button>
                    </SignUpButton>
                  </div>
                  
              </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default NavBar