import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/MFB_Combo_Generator/',
    plugins: [react()],
});
