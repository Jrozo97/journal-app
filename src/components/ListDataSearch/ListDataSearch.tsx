import { ParamsListDataSearch } from '@/types/components.types'
import { InputAdornment, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';
import MenuActions from '../MenuActions/MenuActions';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const ListDataSearch: React.FC<ParamsListDataSearch> = ({
	setPage,
	page,
	setSearch,
	totalPage,
	error,
	isLoading,
	notes
}) => {

	const [inputSearch, setInputSearch] = useState("");
	const [typingTimeout, setTypingTimeout] = useState(0);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}

		setInputSearch(e.target.value)
		setSearch(e.target.value)
	}


	const handleDeleteSearch = () => {
		setInputSearch("")
		setSearch("")
	}

	const optionsListData = [
		{
			id: 1,
			name: 'Editar nota',
			icon: <EditNoteIcon />,
			handlerOption: () => console.log('Editar nota')
		},
		{
			id: 2,
			name: 'Eliminar nota',
			icon: <DeleteForeverIcon />,
			handlerOption: () => console.log('Eliminar nota')
		},
	];

	return (
		<div className='w-full flex flex-col mt-16'>

			<input
				type='text'
				className='w-80 h-12 border border-gray rounded-md px-4 mb-8'
				placeholder='Buscar la nota'
				value={inputSearch}
				onChange={handleSearch}			
			/>

			<div className='w-56 h-56 rounded-lg shadow-custom-tooltip px-4 pt-4 pb-3 flex flex-col gap-4 items-center'>
				<Image
					src='/icons/iconNotes.svg'
					alt='search'
					width={152}
					height={152}
				/>
				<div className='w-full flex justify-between items-center'>
					<div className='flex flex-col '>
							<p className='text-xs font-medium'>Nota del dia</p>
							<p className='text-[10px] font-medium'>15/03/2024</p>
					</div>
						<MenuActions 
							options={optionsListData}
						/>
				</div>

			</div>
		</div>
	)
}

export default ListDataSearch