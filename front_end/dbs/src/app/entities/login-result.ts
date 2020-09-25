export interface LoginResult {
    // login
    login_status: boolean;
}

export class LoginResultImpl implements LoginResult{
    login_status: boolean;
}