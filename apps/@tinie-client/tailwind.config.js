/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Raleway', 'ui-sans-serif', 'system-ui'],
                quicksand: 'Quicksand',
            },
            boxShadow: {
                glow: ['0 0px 20px rgba(245, 158, 11, 0.25)', '0 0px 65px rgba(245, 158, 11, 0.1)'],
            },
        },
    },
    plugins: [
        require('tailwind-heropatterns')({
            variants: ['topography'],
            colors: {
                default: 'rgb(24, 24, 27)',
            },
            opacity: {
                default: '0.3',
            },
        }),
    ],
};
