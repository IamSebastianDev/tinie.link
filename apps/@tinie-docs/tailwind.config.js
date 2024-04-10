/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Raleway', 'ui-sans-serif', 'system-ui'],
                quicksand: 'Quicksand',
            },
        },
    },
    plugins: [],
};
