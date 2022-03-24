import { useRouter } from "next/router"
import { useContext, useEffect, useMemo } from "react"

import { AuthContext } from "../contexts/auth"

export default function Callback() {
    const { query } = useRouter()
    const code = useMemo(() => query.code, [query])

    const { authenticate } = useContext(AuthContext)

    useEffect(() => {
        if(code) {    
            authenticate(code as string)
        }
    }, [code, authenticate])

    return (
        <div 
        className="
            flex
            h-screen
            justify-center
            items-center

            bg-slate-800
        ">

            <div
                className="
                    block
                    w-8
                    h-8
                    bg-slate-200

                    animate-bounce
                "
            ></div>

        </div>
    )
}