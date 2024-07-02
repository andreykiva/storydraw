import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './ActionsMenu.module.scss';
import ActionItem from './ActionItem/ActionItem';
import muteIcon from '@/assets/icons/messages/mute.svg?url';
import deleteIcon from '@/assets/icons/messages/delete.svg?url';
import pinIcon from '@/assets/icons/messages/pin.svg?url';
import reportIcon from '@/assets/icons/report.svg?url';
import blockIcon from '@/assets/icons/block.svg?url';
import { openReport } from '@/features/report/reportSlice';
import WrapperWithTriangle from '@/components/ui/WrapperWithTriangle/WrapperWithTriangle';
import { MENU_POSITION } from '@/constants/ui';

type ActionsMenuProps = {
	chatmateId: string;
};

const ActionsMenu = ({ chatmateId }: ActionsMenuProps) => {
	const dispatch = useDispatch();

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'account', targetId: chatmateId }));
	};

	return (
		<WrapperWithTriangle position={MENU_POSITION.BOTTOM_LEFT} className={styles.ActionsMenu}>
			<ul className={styles.ActionsList}>
				<ActionItem actionTitle="Mute" icon={muteIcon} />
				<ActionItem actionTitle="Delete" icon={deleteIcon} />
				<ActionItem actionTitle="Pin to top" icon={pinIcon} />
				<ActionItem actionTitle="Report" icon={reportIcon} onClick={handleOpenReport} />
				<ActionItem actionTitle="Block" icon={blockIcon} />
			</ul>
		</WrapperWithTriangle>
	);
};

export default ActionsMenu;
