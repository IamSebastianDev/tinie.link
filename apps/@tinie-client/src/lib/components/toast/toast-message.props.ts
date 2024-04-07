/** @format */

export type ToastMessageProps = {
    type: 'ERROR' | 'SUCCESS';
    content: string;
    close: () => void;
};
