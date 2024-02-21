/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'very-light-gray': '#F5F6FA',
				'light-gray': '#E9EBF0',
				white: '#FFFFFF',
				'moderate-blue': '#5357B6',
			},
		},
	},
	plugins: [],
};
