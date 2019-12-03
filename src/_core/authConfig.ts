export class AuthConfig {
    public clientId?: string;
    public returnUrl?: string;
    public loginUrl?: string;
    public issuer?: string;
    public scope?: string;
    public responseType?: string;
    public storage?: Storage;
}
export const authConfig: AuthConfig = {
    clientId: 'angular_practice',
    returnUrl: window.location.origin,
    loginUrl: 'http://localhost:8081/authService/login',
    issuer: 'http://localhost:8081',
    // loginUrl: 'http://207.148.99.251/authService/login',
    // issuer: 'http://207.148.99.251',
    scope: 'profile email',
    responseType: 'token',
    storage: localStorage
} 