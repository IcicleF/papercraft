export function checkEmail(email: string | null | undefined, accepted: string | undefined): boolean {
    console.log(email);
    console.log(accepted);
    if (!email || !accepted)
        return false;
    
    return accepted.indexOf(email) > -1;
}