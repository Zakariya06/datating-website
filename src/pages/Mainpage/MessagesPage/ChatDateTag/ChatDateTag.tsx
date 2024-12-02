import { memo } from 'react';

export interface IChatDateTagProps {
    date: string;
}

export const ChatDateTag = memo((props: IChatDateTagProps) => {
    const { date } = props;

    return (
        <div
            style={{
                width: 150,
                marginBottom: 16,
                textAlign: 'center',
                alignSelf: 'center',
                border: '1px solid rgb(226,226,226)',
                borderRadius: 100,
                color: 'rgb(226,226,226)',
            }}
        >
            {date}
        </div>
    );
});

export default ChatDateTag;
