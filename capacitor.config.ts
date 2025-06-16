
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6fb5020ef08644df8c0d546432364d99',
  appName: 'TaskNotes',
  webDir: 'dist',
  server: {
    url: 'https://6fb5020e-f086-44df-8c0d-546432364d99.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
