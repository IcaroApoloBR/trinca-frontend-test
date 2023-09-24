import { Icon } from "@iconify/react"
import { useState } from "react";

export const ChurrasDetails = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleMemberClick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <section className="w-full flex justify-center px-6 mt-[-40px]">

            <button className="min-w-[588px] shrink-0 rounded-sm bg-white shadow-lg p-6 hover:scale-95 hover:bg-opacity-95">

                <div className="flex flex-col gap-11">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-black text-3xl font-extrabold">
                                21/12
                            </span>

                            <span className="text-xl font-bold">Niver do Gui</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div title="Total de participantes" className="flex items-center gap-3">
                                <Icon icon="ion:people-outline" color="#ffd836" width="24" />
                                <span className="text-black text-center text-xl font-medium">15</span>
                            </div>

                            <div title="Valor arrecadado" className="flex items-center gap-3">
                                <Icon icon="jam:coin-f" color="#ffd836" width="24" />
                                <span className="text-black text-center text-xl font-medium">R$ 15</span>
                            </div>
                        </div>
                    </div>

                    <div className={`${isChecked ? "line-through" : ""} flex items-center justify-between pb-1 border-b border-[#E5C231] border-opacity-50`}>
                        <div className="flex gap-5">
                            <input type="checkbox" checked={isChecked} className="w-5 h-5 cursor-pointer rounded-full accent-colorPrimary" name="teste" id="teste" />

                            <span onClick={handleMemberClick} className="text-black text-xl font-bold">Teste</span>
                        </div>
                        <span className="text-black text-xl font-bold">R$20,00</span>
                    </div>


                </div>
            </button>

        </section>
    )
}