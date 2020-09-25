export interface CustomerResult {
    // login
    status: boolean;
}

export class CustomerResultImpl implements CustomerResult{
    status: boolean;
}