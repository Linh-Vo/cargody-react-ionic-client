import {BehaviorSubject } from 'rxjs';
import { authConfig, AuthConfig } from "../_core/authConfig";
declare var window: any;

class AuthService {
    private storage: Storage;
    private accessTokenSubject = new BehaviorSubject<string | null>(null);
    private accessTokenStorageKey = 'access_token';
    public getAccessTokenSubscription() {
        return this.accessTokenSubject;
    }
    constructor() {
        this.configure(authConfig);
    }

    configure(config: AuthConfig) {
        this.storage = config.storage !== undefined ? config.storage: sessionStorage;
    }

    tryLogin() {
        try {
            const savedAccessToken = this.getFromStore(this.accessTokenStorageKey);
            if(!savedAccessToken) {
                var useLoginFlowInApp = window.cordova !== undefined;
                if(useLoginFlowInApp) {
                    this.initateLoginFlow()
                    .then((loggedInResult) => {
                        this.store(this.accessTokenStorageKey,
                            loggedInResult[this.accessTokenStorageKey]);
                        this.accessTokenSubject.next(loggedInResult[this.accessTokenStorageKey]);
                    })
                    .catch((error) => {
                        this.accessTokenSubject.next(error);
                    });
                }
                else {
                    // handle for window browser
                    var paramsAsObject = this.getFragmentParams(window.location.href);
                    if(paramsAsObject[this.accessTokenStorageKey] !== undefined) {
                        this.storage.setItem(this.accessTokenStorageKey, paramsAsObject[this.accessTokenStorageKey]);
                        this.accessTokenSubject.next(paramsAsObject[this.accessTokenStorageKey]);
                    } 
                    else {
                        this.initLoginFlowOnWindowBrowser();
                    }
                }
            }
            else {
                this.accessTokenSubject.next(savedAccessToken);
            }
        }
        catch(err) {
            this.accessTokenSubject.error(err);
        }
        
    }

    public initateLoginFlow(): Promise<any> {
        let url = this.createLoginFlowUrl(authConfig);
        return new Promise((resolve, reject) => {
            var browserRef = window.cordova.InAppBrowser.open(url, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf("http://localhost") === 0) {
                    browserRef.removeEventListener("exit", () => {});
                    browserRef.close();
                    var paramsAsObject = this.getFragmentParams(event.url);
                    var parsedResponse = {};
                    parsedResponse[this.accessTokenStorageKey] = paramsAsObject[this.accessTokenStorageKey];
                    if (parsedResponse[this.accessTokenStorageKey] !== undefined
                        && parsedResponse[this.accessTokenStorageKey] !== null) {
                        resolve(parsedResponse);
                    } else {
                        reject("Problem authenticating");
                    }
                }
            });
            browserRef.addEventListener("exit", function(event) {
                reject("The sign in flow was canceled");
            });
        });
    }

    private initLoginFlowOnWindowBrowser() {
        let url = this.createLoginFlowUrl(authConfig);
        window.open(url, "_self");
    }

    private createLoginFlowUrl(config: AuthConfig): string {
        return config.loginUrl +
        '?' +
        'clientId=' +
        encodeURIComponent(config.clientId) +
        '&returnUrl=' +
        encodeURIComponent(config.returnUrl) +
        '&scope=' +
        encodeURIComponent(config.scope);
    }

    getFragmentParams(fullUrl) {
        /** @type {?} */
        let queryString = fullUrl;
        queryString = decodeURIComponent(queryString);
        if (queryString.indexOf('#') >= 0) {
            return {};
        }
        /** @type {?} */
        const questionMarkPosition = queryString.indexOf('?');
        if (questionMarkPosition > -1) {
            queryString = queryString.substr(questionMarkPosition + 1);
        }
        else {
            queryString = queryString.substr(1);
        }
        return this.parseQueryString(queryString);
    }

    parseQueryString(queryString: string): Object {
        /** @type {?} */
        const data = {};
        /** @type {?} */
        let pairs;
        /** @type {?} */
        let pair;
        /** @type {?} */
        let separatorIndex;
        /** @type {?} */
        let escapedKey;
        /** @type {?} */
        let escapedValue;
        /** @type {?} */
        let key;
        /** @type {?} */
        let value;
        if (queryString === null) {
            return data;
        }
        pairs = queryString.split('&');
        for (let i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            separatorIndex = pair.indexOf('=');
            if (separatorIndex === -1) {
                escapedKey = pair;
                escapedValue = null;
            }
            else {
                escapedKey = pair.substr(0, separatorIndex);
                escapedValue = pair.substr(separatorIndex + 1);
            }
            key = decodeURIComponent(escapedKey);
            value = decodeURIComponent(escapedValue);
            if (key.substr(0, 1) === '/') {
                key = key.substr(1);
            }
            data[key] = value;
        }
        return data;
    }

    store(key, value) {
        // maybe need to switch to local storage
        this.storage.setItem(key, value);
    }

    getFromStore(key) {
        return this.storage.getItem(key);
    }

    logout() {
        this.storage.removeItem(this.accessTokenStorageKey);
        this.accessTokenSubject.next(null);
        this.tryLogin();
    }
}

const authService = new AuthService();
export default authService;