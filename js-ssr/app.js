import { createSSRApp } from 'vue';
import Test from '../src/components/Test.vue';

export function createApp() {
  //return createSSRApp({ data: () => ({ count: 1 }), template: `<button @click="count++">{{ count }}</button>`});
  return createSSRApp(Test);
}
