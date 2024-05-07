import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useContext, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { MenuActionsProps } from '@/interface/components.interface';
import { DarkModeContext } from '@/context/darkModeContext';


const MenuActions: React.FC <MenuActionsProps> = ({ options }) => {

  const { theme } = useContext(DarkModeContext);


	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				aria-label="menu"
				id='menu-actions'
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
				sx={{ padding: '0px' }}

			>
				<MoreVertIcon 
					sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
				/>
			</IconButton>

			<Menu
				id="menu-actions"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: 48 * 4.5,
						width: '20ch',
					},
				}}
			>
				{options.map((option) => (
					<MenuItem key={option.id} onClick={() => {
						option.handlerOption()
						handleClose()
					}} className='flex gap-2'>
						{option.icon}
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</>


	)
}

export default MenuActions