import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, Paper, Typography } from '@mui/material';
import hourglassbottom from '../../../../../assets/images/icons/hourglass.png';
import ChatActionCreator from 'services/Chat/actions/ChatActionCreator';
import { useDispatch } from 'react-redux';
import ResourceService from 'services/i18n/ResourcesService';
import Config from 'config/config';

type Props = {
    open: boolean;
    onClose: () => void;
    setIsUnlocked: any;
    uuid: string | null; // Allow for null value initially;
    chatPartner: string;
    lastMessageTime?: string | number | Date;
};

const ChatUnlockDialog = (props: Props) => {
    const { onClose, open, uuid, setIsUnlocked, chatPartner, lastMessageTime } = props;
    const dispatch = useDispatch();

    const handleRestoreChat = () => {
        if (uuid) {
            dispatch(ChatActionCreator.restoreChat(uuid));
        } else {
            console.error('UUID is null');
        }
    };

    const calculateHoursRemaining = (lastMessageTime: string | number | Date) => {
        const now: number = new Date().getTime();
        const lastMessageDate: number = new Date(lastMessageTime).getTime();
        const oneWeekInMillis: number = 7 * 24 * 60 * 60 * 1000;
        const fortyEightHoursInMillis: number = 48 * 60 * 60 * 1000;
        const targetTime: number = lastMessageDate + oneWeekInMillis + fortyEightHoursInMillis;
        const remainingTimeInMillis: number = targetTime - now;
        const remainingTimeInHours: number = remainingTimeInMillis / (1000 * 60 * 60);
    
        return Math.max(Math.ceil(remainingTimeInHours), 0);
    };    
    

    const hoursRemaining: string = lastMessageTime !== undefined ? calculateHoursRemaining(lastMessageTime).toString() : '';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: { overflow: 'initial', width: 300, background: '#202020' },
                className: 'spacing double padding all text-align-center',
            }}
            maxWidth="xs"
            fullWidth
        >
            <img
                width={70}
                height={70}
                style={{
                    position: 'absolute',
                    top: -35,
                    left: '50%',
                    right: '50%',
                    zIndex: 999,
                    transform: 'translateX(-50%)',
                }}
                src={hourglassbottom}
                alt="hourglassbottom"
            />
            <Close sx={{ cursor: 'pointer', color: 'white' }} onClick={onClose} />
            <DialogTitle lineHeight={'23px'} color="white" fontWeight={600}>
                {ResourceService.replace(ResourceService.getCurrentResources().CHAT_DIALOG_EXPIRED, { name: chatPartner })}
            </DialogTitle>
            <DialogContent>
                <Typography color="white">
                    {ResourceService.replace(ResourceService.getCurrentResources().CHAT_DIALOG_RESTORE, { hours: hoursRemaining })}
                </Typography>
                <Button
                    fullWidth
                    sx={{
                        bgcolor: Config.GLOBAL_PRIMARY_COLOR,
                        borderRadius: '30px',
                        color: 'black',
                        mt: 2,
                        '&:hover': {
                            bgcolor: Config.GLOBAL_PRIMARY_COLOR,
                        },
                    }}
                    onClick={handleRestoreChat}
                >
                    {ResourceService.replace(ResourceService.getCurrentResources().UNLOCK, { Coins: '3' })}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ChatUnlockDialog;
