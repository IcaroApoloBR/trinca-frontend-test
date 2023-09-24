import { useContext, useState } from "react";
import { getSession } from 'next-auth/react';
import { ThemeContext } from "../../src/context/ThemeContext";
import { CardInfo } from "../../src/components/CardInfo";
import Navbar from "../../src/components/Navbar";
import { Header } from "../../src/components/Header";
import Footer from "../../src/components/Footer";
import { Button } from "../../src/components/Button";
import { LoadingScreen } from "../../src/components/LoadingScreen";
import { FormInput } from "../../src/components/FormInput";
import { Modal } from "../../src/components/Modal";
import { FilterInput } from "../../src/components/FilterInput";
import { Switch } from "@headlessui/react";
import { Icon } from "@iconify/react";
import moment from "moment";
import { toast } from "react-toastify";
import { motion } from 'framer-motion'

interface UserFormDataProps {
    id: number;
    name: string;
    moneyUserWithBeer: boolean;
    paid: boolean;
}

interface BarbecueFormDataProps {
    id: number;
    date: string;
    description: string;
    observation?: string;
    valueWithBeer: string | number;
    valueWithoutBeer: string | number;
    barbecueUsers: UserFormDataProps[];
}

interface FormErrorsProps {
    description: string;
    date: string;
    valueWithBeer: string | number;
    valueWithoutBeer: string | number;
}

export default function Home() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const [barbecue, setBarbecue] = useState<BarbecueFormDataProps[]>([
        {
            id: 0,
            date: '01/01/2023',
            description: 'Churras de boas-vindas',
            observation: 'Teste técnico',
            valueWithBeer: '100',
            valueWithoutBeer: '80',
            barbecueUsers: [],
        },
    ]);

    const [newBarbecue, setNewBarbecue] = useState<BarbecueFormDataProps>({
        id: 1,
        date: '',
        description: '',
        observation: '',
        valueWithBeer: '',
        valueWithoutBeer: '',
        barbecueUsers: [],
    });

    const [editedBarbecue, setEditedBarbecue] = useState<BarbecueFormDataProps>({
        id: 1,
        date: '',
        description: '',
        observation: '',
        valueWithBeer: '',
        valueWithoutBeer: '',
        barbecueUsers: [],
    });

    const [newUser, setNewUser] = useState<UserFormDataProps>({
        id: 1,
        name: '',
        moneyUserWithBeer: true,
        paid: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModalCreateBarbecue, setIsOpenModalCreateBarbecue] = useState(false);
    const [isOpenModalEditBarbecue, setIsOpenModalEditBarbecue] = useState(false);

    const [formErrors, setFormErrors] = useState<FormErrorsProps>({
        description: '',
        date: '',
        valueWithBeer: '',
        valueWithoutBeer: '',
    });

    const [filterText, setFilterText] = useState<string>('');

    const filteredBarbecue = barbecue.filter((item) =>
        item.description.toLowerCase().includes(filterText.toLowerCase().trim())
    );

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value);
    };

    const handleEditAndOpenModal = (barbecueId: Number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const editedItem = barbecue.find((item) => item.id === barbecueId);

        setEditedBarbecue(editedItem!);

        setIsOpenModalEditBarbecue(true);
    };

    const addNewBarbecue = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsLoading(true);

            const formErrors = validateForm(newBarbecue);

            if (typeof formErrors === 'object' && Object.keys(formErrors).length > 0) {
                setFormErrors(formErrors);
                return;
            }

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const newBarbecueId = barbecue.length > 0 ? barbecue[barbecue.length - 1].id + 1 : 1;

            const createdBarbecue: BarbecueFormDataProps = {
                ...newBarbecue,
                id: newBarbecueId,
            };

            setBarbecue([...barbecue, createdBarbecue]);

            handleCleanModal()

            toast.success('Evento cadastrado com sucesso!')

        } catch (error) {
            toast.error('Houve algum erro ao cadastrar o evento, tente novamente!')
        } finally {
            setIsLoading(false);
        }
    };

    const editBarbecue = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            let barbecueIndex = 0
            barbecue.forEach((barbecue, index) => {
                if (barbecue.id == editedBarbecue.id) {
                    barbecueIndex = index;
                }
            })

            const newBarbecueList = barbecue;
            newBarbecueList[barbecueIndex] = editedBarbecue

            setBarbecue(newBarbecueList);

            handleCleanModal()

            toast.success('Evento editado com sucesso!')
        } catch (error) {
            toast.error('Houve algum erro ao cadastrar o evento, tente novamente!')
        } finally {
            setIsLoading(false);
        }
    };

    const removeBarbecue = (barbecueId: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        try {
            const updatedBarbecueList = barbecue.filter((barbecue) => barbecue.id !== barbecueId);

            setBarbecue(updatedBarbecueList);

            toast.success('Churrasco removido com sucesso!');
        } catch (error) {
            toast.error('Houve um erro ao remover o churrasco, tente novamente!');
        }
    };

    const addUserToBarbecue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (!newUser.name || newUser.name.trim() === "") {
            toast.error('Adicione um integrante à lista');
        }

        if (newUser.name?.trim() !== "") {
            const newUserWithId = {
                ...newUser,
                id: newUser.id + 1,
            };

            setNewBarbecue({
                ...newBarbecue, barbecueUsers: [...newBarbecue.barbecueUsers, newUserWithId]
            })

            setNewUser({
                id: newUser.id + 1,
                name: "",
                moneyUserWithBeer: true,
                paid: false
            });
        }
    };

    const editUserToBarbecue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (!newUser.name || newUser.name.trim() === "") {
            toast.error('Adicione um integrante à lista');
        }

        if (newUser.name?.trim() !== "") {
            const newUserWithId = {
                ...newUser,
                id: newUser.id + 1,
            };

            setEditedBarbecue({
                ...editedBarbecue, barbecueUsers: [...editedBarbecue.barbecueUsers, newUserWithId]
            })

            setNewUser({
                id: newUser.id + 1,
                name: "",
                moneyUserWithBeer: true,
                paid: false
            });
        }
    };

    const removeUserFromBarbecue = (userId: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const updatedBarbecueUsers = newBarbecue.barbecueUsers.filter((user) => user.id !== userId);

        setNewBarbecue({ ...newBarbecue, barbecueUsers: updatedBarbecueUsers });
    };

    function getBarbecueTotalPrice(barbecueItem: BarbecueFormDataProps): number {
        try {
            const valuesArray = barbecueItem.barbecueUsers.map((user) => {
                return user.moneyUserWithBeer ? Number(barbecueItem.valueWithBeer) : Number(barbecueItem.valueWithoutBeer)
            })
            const value = valuesArray.reduce((a, b) => {
                return a + b
            })
            return value
        } catch (error) {
            return 0
        }
    }

    const validateForm = (formData: FormErrorsProps) => {
        const errors: any = {};

        if (!formData.description) {
            errors.description = 'Informe o título.';
        }

        if (!formData.date) {
            errors.date = 'A data do evento é obrigatório.';
        }

        if (!formData.valueWithBeer) {
            errors.valueWithBeer = 'O valor com bebida é obrigatório.';
        }

        if (!formData.valueWithoutBeer) {
            errors.valueWithoutBeer = 'O valor sem bebida é obrigatório.';
        }

        return errors;
    };

    function handleCleanModal() {
        setNewUser({
            id: 0,
            name: "",
            moneyUserWithBeer: true,
            paid: false
        });

        setNewBarbecue({
            id: 1,
            date: '',
            description: '',
            observation: '',
            valueWithBeer: '',
            valueWithoutBeer: '',
            barbecueUsers: [],
        });

        setFormErrors({
            description: '',
            date: '',
            valueWithBeer: '',
            valueWithoutBeer: '',
        });

        setIsOpenModalCreateBarbecue(false);
        setIsOpenModalEditBarbecue(false);
    }

    return (
        <>
            {isLoading && (
                <LoadingScreen>
                    <p className="text-white font-medium text-xl">
                        Um instante, estamos <span className="text-colorPrimary">organizando</span> o seu churrasco ...
                    </p>
                </LoadingScreen>
            )}

            <Modal title="Cadastrar churrasco" open={isOpenModalCreateBarbecue ? true : false} onClose={handleCleanModal}>
                <form onSubmit={addNewBarbecue}>
                    <div className="p-6 space-y-4">
                        <div className="flex gap-4">
                            <FormInput
                                label="Título do evento"
                                type="text"
                                id="description"
                                value={newBarbecue.description}
                                onChange={(value) => setNewBarbecue({ ...newBarbecue, description: value })}
                                placeholder="Ex: Churras de boas-vindas"
                                error={formErrors.description}
                            />

                            <FormInput
                                label="Data do acontecimento"
                                type="date"
                                id="date"
                                value={newBarbecue.date}
                                onChange={(value) => setNewBarbecue({ ...newBarbecue, date: value })}
                                error={formErrors.date}
                            />
                        </div>

                        <div className="flex gap-4">
                            <FormInput
                                label="Valor com bebida"
                                type="number"
                                id="valueWithBeer"
                                value={newBarbecue.valueWithBeer}
                                onChange={(value) => setNewBarbecue({ ...newBarbecue, valueWithBeer: value })}
                                placeholder="R$ 00,00"
                                error={formErrors.valueWithBeer}
                            />

                            <FormInput
                                label="Valor sem bebida"
                                type="number"
                                id="valueWithoutBeer"
                                value={newBarbecue.valueWithoutBeer}
                                onChange={(value) => setNewBarbecue({ ...newBarbecue, valueWithoutBeer: value })}
                                placeholder="R$ 00,00"
                                error={formErrors.valueWithoutBeer}
                            />
                        </div>

                        <FormInput
                            label="Observação"
                            type="text"
                            id="observation"
                            value={newBarbecue.observation || ""}
                            onChange={(value) => setNewBarbecue({ ...newBarbecue, observation: value })}
                            placeholder="Ex: Churras de boas-vindas"
                        />
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="flex gap-4 items-end">
                            <FormInput
                                label="Integrante do Churrasco"
                                type="text"
                                id="name"
                                value={newUser.name || ""}
                                onChange={(value) => setNewUser({ ...newUser, name: value })}
                                placeholder="Ex: Ícaro Apolo"
                            />

                            <div className="flex-1 text-center">
                                <div className="flex items-center">
                                    <FormInput
                                        label="Com Bebida"
                                        type="checkbox"
                                        id="moneyUserWithBeer"
                                        value={newUser.moneyUserWithBeer === true}
                                        onChange={() => setNewUser({ ...newUser, moneyUserWithBeer: true })}
                                    />

                                    <FormInput
                                        label="Sem Bebida"
                                        type="checkbox"
                                        id="moneyUserWithoutBeer"
                                        value={newUser.moneyUserWithBeer === false}
                                        onChange={() => setNewUser({ ...newUser, moneyUserWithBeer: false })}
                                    />
                                </div>
                            </div>

                            <button onClick={(event) => addUserToBarbecue(event)} className="p-1 w-12 h-12 flex items-center justify-center rounded-lg hover:bg-opacity-70 bg-colorPrimary hover:scale-95 border-colorSecondary border-2">
                                <Icon icon="mdi:user-add" color="#998220" width="24" height="24" />
                            </button>

                        </div>

                        {newBarbecue.barbecueUsers.length > 0 &&
                            <>
                                <hr className="text-gray-200 dark:text-gray-600" />

                                <ul className="text-sm font-medium leading-relaxed">
                                    {newBarbecue.barbecueUsers.map((user, index) => (
                                        <li key={index} className="w-full flex justify-between">
                                            {user.name} - {" "}
                                            {user.moneyUserWithBeer ?
                                                `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(newBarbecue.valueWithBeer))}` :
                                                `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(newBarbecue.valueWithoutBeer))}`
                                            }

                                            <button onClick={(event) => removeUserFromBarbecue(user.id, event)} className="hover:text-colorPrimary text-colorSecondary hover:scale-95">
                                                <Icon icon="ph:trash-bold" width="24" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        }

                    </div>

                    <div className="flex items-center justify-end p-4 space-x-6 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button type="button" className="text-gray-900 dark:text-gray-200 hover:scale-95 hover:bg-opacity-70 transition-all" onClick={handleCleanModal}>Cancelar</button>
                        <Button type="submit">{isLoading ? "Cadastrando" : "Cadastrar"}</Button>
                    </div>
                </form>
            </Modal>

            <Modal title="Editar churrasco" open={isOpenModalEditBarbecue ? true : false} onClose={handleCleanModal}>
                <div className="flex flex-col p-6">
                    <div className="flex items-center justify-between text-gray-900 dark:text-gray-200">
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-3xl font-extrabold">
                                {moment(editedBarbecue.date).format('L')}
                            </span>

                            <span className="text-xl font-bold">{editedBarbecue.description}</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div title="Total de participantes" className="flex items-center gap-3">
                                <Icon icon="ion:people-outline" color="#ffd836" width="24" />
                                <span className="text-center text-xl font-medium">{editedBarbecue.barbecueUsers.length}</span>
                            </div>

                            <div title="Valor arrecadado" className="flex items-center gap-3">
                                <Icon icon="jam:coin-f" color="#ffd836" width="24" />
                                <span className="text-center text-xl font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getBarbecueTotalPrice(editedBarbecue))}</span>
                            </div>
                        </div>
                    </div>

                    {editedBarbecue.barbecueUsers.map((user, index) => (
                        <div key={user.id} className={`${user.paid ? "line-through text-lg" : "text-xl font-bold"} flex items-center justify-between text-gray-900 dark:text-gray-200 p-1 border-b border-[#E5C231] border-opacity-50`}>
                            <div className="flex gap-5">
                                <input
                                    type="checkbox"
                                    checked={user.paid}
                                    className="w-5 h-5 cursor-pointer rounded-full accent-colorPrimary"
                                    name={user.name}
                                    id={user.name}
                                    onChange={() => {
                                        const newArray = editedBarbecue.barbecueUsers;
                                        newArray[index].paid = !user.paid;
                                        setEditedBarbecue({ ...editedBarbecue, barbecueUsers: newArray });
                                    }}
                                />

                                <span className="">
                                    {user.name}
                                </span>
                            </div>
                            <span className="">
                                {user.moneyUserWithBeer ? `R$${Number(editedBarbecue?.valueWithBeer).toFixed(2)}` : `R$${Number(editedBarbecue?.valueWithoutBeer).toFixed(2)}`}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={editBarbecue}>
                    <div className="p-6 space-y-4">
                        <div className="flex gap-4 items-end">
                            <FormInput
                                label="Integrante do Churrasco"
                                type="text"
                                id="name"
                                value={newUser.name || ""}
                                onChange={(value) => setNewUser({ ...newUser, name: value })}
                                placeholder="Ex: Ícaro Apolo"
                            />

                            <div className="flex-1 text-center">
                                <div className="flex items-center">
                                    <FormInput
                                        label="Com Bebida"
                                        type="checkbox"
                                        id="moneyUserWithBeer"
                                        value={newUser.moneyUserWithBeer === true}
                                        onChange={() => setNewUser({ ...newUser, moneyUserWithBeer: true })}
                                    />

                                    <FormInput
                                        label="Sem Bebida"
                                        type="checkbox"
                                        id="moneyUserWithoutBeer"
                                        value={newUser.moneyUserWithBeer === false}
                                        onChange={() => setNewUser({ ...newUser, moneyUserWithBeer: false })}
                                    />
                                </div>
                            </div>

                            <button onClick={(event) => editUserToBarbecue(event)} className="p-1 w-12 h-12 flex items-center justify-center rounded-lg hover:bg-opacity-70 bg-colorPrimary hover:scale-95 border-colorSecondary border-2">
                                <Icon icon="mdi:user-add" color="#998220" width="24" height="24" />
                            </button>

                        </div>

                        {newBarbecue.barbecueUsers.length > 0 &&
                            <>
                                <hr className="text-gray-200 dark:text-gray-600" />

                                <ul className="text-sm font-medium leading-relaxed">
                                    {newBarbecue.barbecueUsers.map((user, index) => (
                                        <li key={index} className="w-full flex justify-between">
                                            {user.name} - {" "}
                                            {user.moneyUserWithBeer ?
                                                `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(newBarbecue.valueWithBeer))}` :
                                                `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(newBarbecue.valueWithoutBeer))}`
                                            }

                                            <button onClick={(event) => removeUserFromBarbecue(user.id, event)} className="hover:text-colorPrimary text-colorSecondary hover:scale-95">
                                                <Icon icon="ph:trash-bold" width="24" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        }

                    </div>

                    <div className="flex items-center justify-end p-4 space-x-6 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button type="button" className="text-gray-900 dark:text-gray-200 hover:scale-95 hover:bg-opacity-70 transition-all" onClick={handleCleanModal}>Cancelar</button>
                        <Button type="submit">{isLoading ? "Editando" : "Editar"}</Button>
                    </div>
                </form>
            </Modal >

            <section className="w-full h-screen bg-whitePrimary dark:bg-darkPrimary">
                <Navbar />

                <Header />

                <div className="flex flex-col gap-2 pb-20">
                    <div className="w-full flex flex-wrap gap-4 justify-center sm:justify-end p-4">
                        <FilterInput filterText={filterText} handleFilterChange={handleFilterChange} />

                        <Switch checked={darkMode} onChange={toggleDarkMode} className='inline-flex h-6 w-11 mt-5 items-center rounded-full bg-gray-300'>
                            <span className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} h-4 w-4 transform rounded-full transition ease-in-out duration-700 bg-whitePrimary flex justify-center items-center`}>
                                {darkMode ? <Icon icon="icon-park:moon" width="14" color="#1E88E5" /> : <Icon icon="noto:sun" color="#FFEB3B" width="14" />}
                            </span>
                        </Switch>
                    </div>

                    <div className="flex flex-wrap gap-6 justify-center">
                        <motion.ul
                            initial={{ x: -100 }}
                            whileInView={{ x: 0 }}
                            transition={{ duration: 1.0 }}
                            className="flex flex-wrap gap-6 justify-center"
                        >
                            {filteredBarbecue.map((barbecueItem, index) => (
                                <li key={index}>
                                    <CardInfo
                                        data={barbecueItem}
                                        allQtdUsers={barbecueItem.barbecueUsers.length}
                                        totalPrice={getBarbecueTotalPrice(barbecueItem)}
                                    />
                                    <div className="flex items-center justify-between text-gray-900 dark:text-gray-200 mt-1">
                                        <button
                                            className="hover:text-colorPrimary text-colorSecondary hover:scale-95 font-medium"
                                            onClick={(event) => handleEditAndOpenModal(barbecueItem.id, event)}
                                        >
                                            Ver detalhes
                                        </button>
                                        <button
                                            className="hover:text-colorPrimary text-colorSecondary hover:scale-95"
                                            onClick={(event) => removeBarbecue(barbecueItem.id, event)}
                                        >
                                            <Icon icon="ph:trash-bold" width="24" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.button
                            initial={{ x: 100 }}
                            whileInView={{ x: 0 }}
                            transition={{ duration: 1.0 }}
                            onClick={() => setIsOpenModalCreateBarbecue(true)}
                            title="Cadastrar churrasco"
                            className="w-72 h-48 shrink-0 flex items-center justify-center rounded-sm border-2 dark:border-colorSecondary bg-whiteSecondary dark:bg-darkSecondary text-gray-900 dark:text-gray-200 shadow-lg hover:opacity-80"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div className="bg-colorPrimary w-24 rounded-full text-center p-6">
                                    <Icon icon="mdi:grill-outline" color="#998220" width="44" />
                                </div>
                                <span className="text-xl text-center font-bold">Adicionar Churras</span>
                            </div>
                        </motion.button>
                    </div>

                    {filteredBarbecue.length === 0 && (
                        <p className="text-colorSecondary font-medium text-center mt-4">*Infelizmente não foi possível encontrar nenhum resultado na sua busca.</p>
                    )}
                </div>

                <Footer />
            </section >
        </>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    console.log(session)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}