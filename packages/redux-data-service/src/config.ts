export interface IAuthConfig {
  auth0: auth0.AuthOptions;
  logoutUri: string;
}

const currentConfig: IAuthConfig = {
  auth0: {
    domain: null as string,
    clientID: null as string,
    redirectUri: null as string,
    responseType: null as string,
    scope: null as string,
  },
  logoutUri: null as string,
};

export function configure(newConfig: IAuthConfig) {
  Object.assign(currentConfig, newConfig);
}

export const config = currentConfig;
