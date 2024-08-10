let timeout: number | undefined
const timeoutLength = 500

export function debounceUsernameCheck(checkUsernameFunction: Function, username: string){
    clearTimeout(timeout)
    timeout = setTimeout(() => checkUsernameFunction(username), timeoutLength)
}