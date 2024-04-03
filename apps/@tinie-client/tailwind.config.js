/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Raleway', 'Montserrat', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
};
