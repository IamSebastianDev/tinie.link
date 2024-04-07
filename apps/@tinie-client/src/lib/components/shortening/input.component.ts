/** @format */

import { combined, createComponent } from '@grainular/nord';
import { createControl, required, createControlGroup, Control, controlError } from '@grainular/nord-forms';
import { Button } from '../ui/button/button.component';
import link from '../../../assets/images/link.svg';
import { popupService } from '../../services/popup.service';
import { isUrl } from '../../scripts/is-url.validator';
import { isValid } from '../../directives/is-valid.directive';

export type InputProps = {
    onSubmit: (short: string) => void;
};

export const Input = createComponent<InputProps>((html, { onSubmit }) => {
    // Create the Form
    const form = createControlGroup({
        link: createControl<string>({ value: null }, [required, isUrl]),
    });

    // Submit handler
    const onFormSubmit = async () => {
        if (!form.isValid || !form.link.isValid || !form.link.rawValue) {
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

    const errors = {
        required: 'Enter a URL to shorten it 🥳',
        url: 'Please provide a valid URL 🥺',
    };

    const controlValidity = (control: Control<any>) =>
        combined([control.focused, control.valid, control.touched], ([focused, valid, touched]) => {
            return !touched ? focused || valid : touched && !focused ? valid : true;
        });

    return html`<form
        class="relative px-4 flex flex-col gap-2 items-center"
        ${form.handle({ onSubmit: () => onFormSubmit() })}
    >
        <label
            ${isValid(controlValidity(form.link))}
            for="url"
            class="flex flex-row rounded-full overflow-hidden bg-zinc-900 pl-4 max-w-2xl w-full m-auto border-2 border-amber-600 text-zinc-200  focus-within:border-sky-800 shadow-glow duration-200 focus-within:shadow-none data-[is-valid=false]:border-red-600"
        >
            <img src="${link}" class="w-6 h-6 mx-2 my-auto" />
            <input
                ${form.link.control}
                ${isValid(controlValidity(form.link))}
                type="text"
                id="url"
                name="url"
                autocomplete="off"
                class="grow py-5 px-3 outline-none bg-transparent bg-none font-quicksand leading-relaxed data-[is-valid=false]:text-red-600"
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
        <div
            ${isValid(controlValidity(form.link))}
            class="hidden data-[is-valid=false]:flex absolute justify-center items-center bg-zinc-900 text-red-600 top-full py-1 px-8 border-red-600 border-2 z-10 -m-2 text-sm rounded-lg"
        >
            ${controlError(form.link.errors).fromDict(errors)}
        </div>
    </form>`;
});
