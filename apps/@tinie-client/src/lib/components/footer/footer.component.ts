/** @format */

import { createComponent } from '@grainular/nord';
import { Link } from '../ui/Link/Link.component';

export const Footer = createComponent((html) => {
    const year = new Date().getFullYear();

    return html`<footer class="w-full p-4 bg-zinc-950 text-zinc-300 text-sm flex justify-center">
        <div class="flex gap-1">Built with 🫶 - ${year}</div>
    </footer>`;
});
