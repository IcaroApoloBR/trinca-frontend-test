import moment from "moment"
import "moment/locale/pt-br"
import { Popover } from "@headlessui/react"
import { Icon } from "@iconify/react"

interface BarbecueProps {
    data: {
        date: string;
        description: string;
        observation?: string;
    };
    allQtdUsers: number;
    totalPrice: number;
}

export const CardInfo = ({ data, allQtdUsers, totalPrice }: BarbecueProps) => {
    return (
        <div title="Visualizar detalhes" className="w-80 h-48 shrink-0 rounded-sm border-2 dark:border-colorSecondary bg-whiteSecondary dark:bg-darkSecondary shadow-lg p-6 text-gray-900 dark:text-gray-200 hover:opacity-80">
            <div className="flex justify-between">
                <div className="flex flex-col items-start gap-2">
                    <span className="text-3xl font-extrabold">
                        {moment(data?.date).format('L')}
                    </span>

                    <span className="text-xl font-bold">{data?.description}</span>
                </div>

                {data?.observation != "" &&
                    <Popover className="relative">
                        <Popover.Button className="focus:outline-none">
                            <Icon icon="heroicons-solid:information-circle" className="transition-colors text-colorSecondary hover:text-colorPrimary active:text-colorSecondary" width="16" height="16" />
                        </Popover.Button>
                        <Popover.Panel className="absolute z-10">
                            <div className="absolute bottom-7 right-0 z-10 transform px-4 sm:px-0 w-60">
                                <div className="overflow-hidden border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg">
                                    <div className="relative p-2 text-sm text-darkPrimary dark:text-gray-200 bg-whitePrimary dark:bg-darkPrimary">
                                        {data?.observation}
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Popover>
                }
            </div>

            <div className="flex items-center justify-between mt-12">
                <div title="Total de participantes" className="flex items-center gap-3">
                    <Icon icon="ion:people-outline" color="#ffd836" width="24" />
                    <span className="text-center text-xl font-medium">{allQtdUsers ? allQtdUsers : '-'}</span>
                </div>

                <div title="Valor arrecadado" className="flex items-center gap-3">
                    <Icon icon="jam:coin-f" color="#ffd836" width="24" />
                    <span className="text-center text-xl font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice ? totalPrice : 0)}</span>
                </div>
            </div>
        </div>
    )
}