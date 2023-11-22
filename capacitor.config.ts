import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'LancerIn-ProjectUAS',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  bundledWebRuntime: false
};

export default config;
