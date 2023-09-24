import React from 'react';
import { motion } from 'framer-motion'

interface FilterInputProps {
    filterText: string;
    handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterInput = ({ filterText, handleFilterChange }: FilterInputProps) => {
    return (
        <motion.input initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.0 }}
            type="text"
            placeholder="Filtrar por descrição"
            value={filterText}
            onChange={handleFilterChange}
            className="bg-whitePrimary dark:bg-darkSecondary rounded-lg border-2 border-colorSecondary p-2.5 text-sm text-gray-900 dark:text-gray-200 focus:border-colorPrimary outline-colorPrimary -400 w-60"
        />
    );
};