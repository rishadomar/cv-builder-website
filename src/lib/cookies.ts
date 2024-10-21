import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string) => {
    const cookieOptions: Cookies.CookieAttributes = {
        secure: true, // Ensure the cookie is only sent over HTTPS
        sameSite: 'Strict', // Prevent cross-site request forgery
        expires: 7 // Set the cookie to expire in 7 days
    };
    Cookies.set(name, value, cookieOptions);
};

export const getCookie = (name: string) => {
    return Cookies.get(name);
};

export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
