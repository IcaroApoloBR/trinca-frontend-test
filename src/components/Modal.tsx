import React, { ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string
    children: ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
    return (
        <Transition appear show={open}>
            <Dialog as="div" className="relative z-20" onClose={onClose}>
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="max-w-2xl mobile:max-w-md tablet:max-w-md transform overflow-hidden rounded-2xl bg-whitePrimary dark:bg-darkPrimary text-left shadow-xl transition-all">
                                <div className="flex justify-between items-center p-4 rounded-t border-b border-gray-200 dark:border-gray-600">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-200">
                                        {title}
                                    </h3>
                                    <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 transition-colors hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};