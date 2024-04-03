/** @format */

import { createComponent } from '@grainular/nord';
import { Link } from '../ui/Link/Link.component';

export const Footer = createComponent((html) => {
    const year = new Date().getFullYear();
    const classes = 'text-zinc-500 font-normal';

    return html`<footer
        class="w-full p-4 bg-zinc-950 text-zinc-500 text-sm flex flex-col justify-between gap-2 text-center"
    >
        <div>
            Built with ❤️, ${Link({ label: 'TailwindCSS', href: 'https://tailwindcss.com', classes, target: '_blank' })}
            & ${Link({ label: 'Nørd.js', href: 'https://nordjs.dev', classes, target: '_blank' })}
        </div>
        <div>
            &copy; ${year}
            ${Link({ label: 'Sebastian Heinz', href: 'https://github.com/iamsebastiandev', classes, target: '_blank' })}
        </div>
    </footer>`;
});
