import type { Config } from './config.interface';

const config: Config = {
  application: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Tools Manager Backend API',
    description: 'Tools Manager - API Docs',
    version: '1.0',
    path: 'docs',
  },
  security: {
    expiresIn: '3200s',
    refreshIn: '7d',
    secret: 'secret',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
