import React from 'react'

import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};
export default function Container({ children }: ContainerProps) {
  return (
    <div className='container max-w-1150px'>
      {children}
    </div>
  )
}
