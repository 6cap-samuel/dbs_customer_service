export interface CustomerResult {
    // login
    status: boolean;
    error: string;
}

export class CustomerResultImpl implements CustomerResult{
    status: boolean;
    error: string;
}