declare module '@tailwindcss/postcss' {
    import { PluginCreator } from 'postcss';
    const plugin: PluginCreator<unknown>;
    export default plugin;
  }
  
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }