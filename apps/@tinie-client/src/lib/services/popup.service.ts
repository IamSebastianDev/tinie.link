/** @format */

import { Component, Grain, grain, readonly } from '@grainular/nord';

class PopupService {
    private _isOpen = grain<boolean>(false);
    public isOpen = readonly(this._isOpen);

    private unsubscribe: null | (() => void) = null;
    private onceResult = grain<any>(null);

    private _closed = grain(true);
    public closed = readonly(this._closed);

    private get outlet() {
        return document.querySelector('#popup-content')!;
    }

    open<T extends Record<PropertyKey, unknown>, R>(component: Component<T>, payload: T) {
        const result = grain<R | null>(null);
        this.unsubscribe = this.onceResult.subscribe((payload) => {
            result.set(payload);
        });

        this._isOpen.set(true);
        document.body.style.overflow = 'hidden';
        [...(this.outlet?.childNodes ?? [])].forEach((n) => n.remove());
        this.outlet?.append(...component(payload));

        return {
            closed: readonly(this._closed),
            result: readonly(result),
        };
    }

    private setResult(result: any) {
        this.onceResult.set(result);
        this.unsubscribe?.();
        this.unsubscribe = null;
    }

    close(res: any = null) {
        [...(this.outlet?.childNodes ?? [])].forEach((n) => n.remove());
        document.body.style.overflow = 'auto';
        this._isOpen.set(false);
        this._closed.set(true);

        this.setResult(res);
    }
}

export const popupService = new PopupService();
