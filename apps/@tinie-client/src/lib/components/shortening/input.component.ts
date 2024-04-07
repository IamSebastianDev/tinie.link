/** @format */

import { createComponent } from '@grainular/nord';
import { createControl, required, createControlGroup } from '@grainular/nord-forms';
import { Button } from '../ui/button/button.component';
import link from '../../../assets/images/link.svg';
import { popupService } from '../../services/popup.service';

export type InputProps = {
    onSubmit: (short: string) => void;
};
export const Input = createComponent<InputProps>((html, { onSubmit }) => {
    const form = createControlGroup({
        link: createControl<string | null>({ value: null }, [required]),
    });

    const onFormSubmit = async () => {
        if (!form.isValid || !form.link.rawValue) {
            // @todo: Handle error message
            return;
        }

        onSubmit(form.link.rawValue);
    };

    // Handle link and input state
    const disabled = popupService.isOpen;
    popupService.isOpen.subscribe((isOpen) => {
        // If the popup is opened, disable
        if (isOpen) {
            form.link.disable();
            return;
        }

        form.link.enable();
        form.link.reset();
    });

    return html`<form class="px-4" ${form.handle({ onSubmit: () => onFormSubmit() })}>
        <label
            for="url"
            class="flex flex-row rounded-full overflow-hidden bg-zinc-900 pl-4 max-w-2xl w-full m-auto border-2 border-amber-600 text-zinc-200  focus-within:border-sky-800 shadow-glow duration-200 focus-within:shadow-none"
        >
            <img src="${link}" class="w-6 h-6 mx-2 my-auto" />
            <input
                ${form.link.control}
                type="text"
                id="url"
                name="url"
                autocomplete="off"
                class="grow py-5 px-3 outline-none bg-transparent bg-none font-quicksand leading-relaxed"
                placeholder="http://shorten.me"
            />
            ${Button({
                disabled,
                label: 'Shorten me!',
                type: 'submit',
                classes:
                    'rounded-full px-6 border-4 border-zinc-900 bg-sky-800 hover:bg-sky-600 text-zinc-300 active:bg-sky-400 duration-200 font-semibold whitespace-nowrap max-md:font-normal max-sm:text-sm max-sm:px-3 disabled:bg-slate-500',
            })}
        </label>
    </form>`;
});
