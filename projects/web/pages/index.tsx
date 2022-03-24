import type { NextPage } from 'next'
import Link from 'next/link'
import { useContext } from 'react'

import Logo from '../assets/devchat_logo.svg'
import { AuthContext } from '../contexts/auth'

export async function getStaticProps() {
  const signInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.gh_client_id}`;
  return {
    props: {
      signInUrl
    }
  }
}

const Home: NextPage<{ signInUrl: string }> = ({ signInUrl }) => {
  return (
    <div className='
      flex
      h-screen
      justify-center
      items-center
      bg-slate-800
    '>

      <Logo className='
        absolute
        top-[100px]
        scale-[500%]
        fill-slate-300
        
      ' />
      
      <Link
        href={signInUrl}
        
        passHref
      >
        <a
          className='
            absolute
            text-white
            border-2
            border-slate-400
            border-b-8
            py-4
            px-6
            cursor-pointer
            select-none
            transition-all
            bg-slate-700
            
            active:border-b-2
            active:mt-2
            hover:border-slate-300
          '
        >
          SignIn with GitHub
        </a>
      </Link>
    </div>
  )
}

export default Home
