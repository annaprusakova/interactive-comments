/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Rubik', 'sans-serif'],
		},
		extend: {
			colors: {
				'very-light-gray': '#F5F6FA',
				'light-gray': '#E9EBF0',
				'light-grayish-blue': '#C5C6EF',
				white: '#FFFFFF',
				'moderate-blue': '#5357B6',
				'dark-blue': '#334253',
				'grayish-blue': '#67727E',
			},
		},
	},
	plugins: [],
};
