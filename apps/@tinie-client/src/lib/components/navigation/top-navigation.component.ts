/** @format */

import { createComponent, each } from '@grainular/nord';
import logo from '../../../assets/images/hero.webp';
import github from '../../../assets/images/github.svg';
import { Link } from '../ui-changed/link/link.component';
import { scrollTop } from '../../directives/scroll-top.directive';

export const TopNavigation = createComponent((html) => {
    const links = [
        {
            label: 'Story',
            href: '',
        },
        {
            label: 'Statistics',
            href: '',
        },
        {
            label: 'API',
            href: '/api',
        },
    ];

    return html`<div class="fixed left-0 right-0 top-0 z-20 transition-colors duration-500 border-b border-zinc-700 border-opacity-0" ${scrollTop('border-opacity-100 bg-zinc-950')}>
        <nav class="py-4 px-8 flex flex-row gap-4 font-sans max-w-7xl w-full m-auto">
            <!-- Logo group -->
            <div class="flex flex-row gap-2 items-center max-sm:hidden">
                ${Link({ label: 'Tinie.link', href: '/' }, (html) => html`<img class="w-6 h-6 rounded-lg border" src="${logo}" />`)}
            </div>
            <!-- Link Group -->
            <div class="ml-auto items-center">
                <ul class="flex flex-row gap-6 items-center h-full">
                    ${each(links).as((link) => html`<li>${Link({ ...link })}</li>`)}
                </ul>
            </div>
            <!-- Controls Group -->
            <div class="border-l border-zinc-700 text-zinc-100 pl-4 flex">
                ${Link({ href: 'https://github.com/iamsebastiandev/tinie.link', classes: 'h-full' }, (html) => html`<img class="w-5 h-5" src="${github}" /> `)}
            <div>
        </nav>
    </div>`;
});
