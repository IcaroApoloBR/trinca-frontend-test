import { motion } from 'framer-motion';
import { socials } from '../constants';
import Image from 'next/image';

export default function Footer() {

    return (
        <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.0 }}
            className="w-full flex flex-col bg-colorPrimary border-t border-colorSecondary border-opacity-50 fixed bottom-0">
            <div className="flex flex-col">
                <div className="h-[2px] bg-white opacity-10" />

                <div className="flex items-center justify-around gap-4 px-4">
                    <a href="#" className="font-bold text-lg text-gray-900 dark:text-colorSecondary cursor-pointer hover:animate-bounce">Ícaro Apolo</a>
                    <div className="flex gap-4">
                        {socials.map((social) => (
                            <>
                                <a key={social.name} href={social.href} target="_blank" className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                                    <Image
                                        key={social.name}
                                        alt={social.name}
                                        src={social.url}
                                        className="object-contain hover:animate-pulse hover:scale-95"
                                    />
                                </a>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </motion.footer >
    )
}