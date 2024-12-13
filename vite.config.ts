import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag == 'data-bound'
        }
      }
    })
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: './src/custom-elements/data-bound.ce.ts',
      name: 'data-bound',
      fileName: 'data-bound',



      // entry: [
      //   // "./src/custom-elements/code.ce.ts",
      //   "./src/custom-elements/data-bound.ce.ts"
      // ], 
      // fileName: (_, entryName) => {
      //   return `js/${entryName}.js`;
      // },
    }
  },
  esbuild: {
    target: "esnext"
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    },
  }
})