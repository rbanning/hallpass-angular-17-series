import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

export type AppEnvironmentKey = 'api_key' | 'api_key_header' | 'api_seed' | 'api_seed_header' | 'api_base_url' | 'app_version' | 'production';
type AppEnvironmentKeyValuePair = {[key in AppEnvironmentKey]: string | boolean | number};

//translate the keys from environment.ts to the keys above
type KeyTranslator = {[key in AppEnvironmentKey]: string};
const keyTranslator: KeyTranslator = {
  'api_key': 'MOCK_API_KEY',
  'api_key_header': "MOCK_API_KEY_HEADER",
  'api_base_url': 'MOCK_API_URL',
  'api_seed': 'MOCK_API_SEED',
  'api_seed_header': 'MOCK_API_SEED_HEADER',
  'app_version': 'APP_VERSION',
  'production': 'production',
};

@Injectable({
  providedIn: 'root'
})
export class AppEnvironmentService {
  private _config: AppEnvironmentKeyValuePair;

  constructor() {
    this._config = Object.keys(keyTranslator)
          .reduce((ret, _key) => {
            const key = _key as AppEnvironmentKey;
            ret[key] = (environment as any)[keyTranslator[key]];
            return ret;
          }, {} as Partial<AppEnvironmentKeyValuePair>) as AppEnvironmentKeyValuePair;  

    console.log("DEBUG: built AppEnvironmentService", this._config);
  }

  get(key: AppEnvironmentKey) {
    return this._config[key];
  }
}