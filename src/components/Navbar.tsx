import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion'

import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
    const [toggle, setToggle] = useState(false)

    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <motion.nav initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.0 }} className="w-full flex items-center justify-center fixed top-0 z-10">
            <div className="w-full flex items-center justify-between mx-4">
                <Link href="/">
                    <Image width={60} height={40} src="/logo.png" alt="Image Logo" />
                </Link>

                <ul className="text-gray-900 dark:text-white flex flex-col items-center">
                    <li className="font-bold">Olá, {session?.user?.name}</li>
                    <button className="text-sm underline hover:scale-95 font-medium" onClick={handleLogout}>Clique para deslogar</button>
                </ul>

                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <Image width={28} height={28} src={toggle ? '/close.svg' : '/menu.svg'}
                        alt="Menu Icon"
                        className="w-[28px] h-[28px] object-contain cursor-pointer"
                        onClick={() => setToggle(!toggle)}
                    />

                    <div className={`${!toggle ? 'hidden' : 'flex'} p-6  bg-whiteSecondary dark:bg-darkSecondary border border-colorSecondary absolute top-14 right-0 mx-4 my-2 min-w-[140px] flex justify-center z-10 rounded-xl`}>
                        <ul className="text-gray-900 dark:text-white flex flex-col items-center">
                            <li className="font-bold">Olá, {session?.user?.name}</li>
                            <button className="text-sm underline hover:scale-95 font-medium" onClick={handleLogout}>Clique aqui para deslogar</button>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.nav >
    )
}