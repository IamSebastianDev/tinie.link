/** @format */

import { Component, grain, readonly } from '@grainular/nord';

class PopupService {
    private _popup = grain<null | Component<any>>(null);
    public popup = readonly(this._popup);

    private _data = grain<null | Record<PropertyKey, unknown>>(null);
    public data = readonly(this._data);

    private _result = grain<null | any>(null);
    public result = readonly(this._result);

    private get outlet() {
        return document.querySelector('#popup-content')!;
    }

    open<T extends Record<PropertyKey, unknown>>(component: Component<T>, payload: T) {
        this._result.set(null);
        this._data.set(payload);
        this._popup.set(component);

        const nodes = component(payload);
        document.body.style.overflow = 'hidden';
        [...(this.outlet?.childNodes ?? [])].forEach((n) => n.remove());
        this.outlet?.append(...nodes);

        return {
            result: readonly(this._result),
        };
    }

    close(res: any = null) {
        [...(this.outlet?.childNodes ?? [])].forEach((n) => n.remove());
        this._popup.set(null);
        this._data.set(null);
        this._result.set(res);
        document.body.style.overflow = 'auto';
    }
}

export const popupService = new PopupService();
