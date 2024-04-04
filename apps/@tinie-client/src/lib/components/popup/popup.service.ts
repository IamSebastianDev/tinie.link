/** @format */

import { Component, grain, readonly } from '@grainular/nord';

const popup = grain<null | Component<any>>(null);
const data = grain<null | Record<PropertyKey, unknown>>(null);
const result = grain<null | any>(null);

export const popupService = {
    popup: readonly(popup),
    data: readonly(data),
    open: <T extends Record<PropertyKey, unknown>>(component: Component<T>, cData: T) => {
        document.body.style.overflow = 'hidden';
        const outlet = document.querySelector('#popup-content')!;
        result.set(null);
        data.set(cData);
        popup.set(component);
        [...(outlet?.childNodes ?? [])].forEach((n) => n.remove());
        outlet?.append(...component(cData));

        return readonly(result);
    },
    close: (res?: any) => {
        const outlet = document.querySelector('#popup-content')!;
        [...(outlet?.childNodes ?? [])].forEach((n) => n.remove());
        popup.set(null);
        data.set(null);
        result.set(res);
        document.body.style.overflow = 'auto';
    },
};
