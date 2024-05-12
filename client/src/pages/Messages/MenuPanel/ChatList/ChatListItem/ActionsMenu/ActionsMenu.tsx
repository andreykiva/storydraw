import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './ActionsMenu.module.css';
import ActionItem from './ActionItem/ActionItem';
import muteIcon from '@/assets/icons/messages/mute.svg?url';
import deleteIcon from '@/assets/icons/messages/delete.svg?url';
import pinIcon from '@/assets/icons/messages/pin.svg?url';
import reportIcon from '@/assets/icons/report.svg?url';
import blockIcon from '@/assets/icons/block.svg?url';
import { openReport } from '@/features/report/reportSlice';

type ActionsMenuProps = {
	chatmateId: string;
};

const ActionsMenu = ({ chatmateId }: ActionsMenuProps) => {
	const dispatch = useDispatch();

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'account', targetId: chatmateId }));
	};

	return (
		<div className={styles.ActionsMenu}>
			<div className={styles.MenuTriangle}></div>
			<ul className={styles.ActionsList}>
				<ActionItem actionTitle="Mute" icon={muteIcon} />
				<ActionItem actionTitle="Delete" icon={deleteIcon} />
				<ActionItem actionTitle="Pin to top" icon={pinIcon} />
				<ActionItem actionTitle="Report" icon={reportIcon} onClick={handleOpenReport} />
				<ActionItem actionTitle="Block" icon={blockIcon} />
			</ul>
		</div>
	);
};

export default ActionsMenu;
