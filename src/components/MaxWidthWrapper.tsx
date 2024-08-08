import { cn } from '@/lib/utils'
import React from 'react'

const MaxWidthWrapper = (
    { className, children }:
    {
        className?: String,
        children : React.ReactNode
    }
) => {
  return (
    <div className={cn("mx-auto w-full px-2.5 md:pd-20", className)}>
          {children}
    </div>
  )
}

export default MaxWidthWrapper