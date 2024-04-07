/** @format */

import { grain, readonly } from '@grainular/nord';

export type Message = {
    content: string;
    type: 'ERROR' | 'SUCCESS'; // Extend to show different messages
};

export type ComposedMessage = Message & { close: () => void; id: string };

class ToastMessageService {
    private _messages = grain<ComposedMessage[]>([]);
    public messages = readonly(this._messages);

    dispatch(message: Message, fade = 4000) {
        const id = crypto.randomUUID();
        const closed = grain(false);

        // When closed, remove the message manually
        const close = () => {
            this._messages.update((messages) => [...messages.filter((msg) => msg.id !== id)]);
            closed.set(true);
        };

        const composed = { close, id, ...message };
        this._messages.update((messages) => [...messages, composed]);

        // Remove message after timeout
        window.setTimeout(() => {
            this._messages.update((messages) => [...messages.filter(({ id }) => id !== composed.id)]);
        }, fade);

        return closed;
    }
}

export const toastMessageService = new ToastMessageService();
