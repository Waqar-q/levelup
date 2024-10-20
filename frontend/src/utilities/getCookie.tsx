export const getCookie = (name: string): string => {
    let cookieValue = '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2){
        cookieValue = parts[1].split(';')[0]
    }
    return cookieValue;
}

export default getCookie;