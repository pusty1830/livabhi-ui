import { createAxiosClient } from "./axiosConfig";
import { jwtDecode } from "jwt-decode";

// const BASE_URL = 'http://localhost:8080/api/'

// const BASE_URL = 'http://3.105.187.169:8080/api/'

const BASE_URL="https://livabhi-server.vercel.app/api/"


export function getCurrentAccessToken() {
    return localStorage.getItem('accessToken');
}

export function isLoggedIn() {
    if (localStorage.getItem('accessToken')) {
        return true;
    }
    else {
        return false;
    }
}

export async function logout() {
    localStorage.clear();
    window.location.href = '/login';
    return 0;
}


export function setCurrentAccessToken(accessToken: any) {
    return localStorage.setItem('accessToken', accessToken)
}



export function getfirstName(): string {
    let token: any = localStorage.getItem('accessToken');
    if (token) {
        let decoded: any = jwtDecode(token);
        // console.log("user Details bro!=",decoded)
        return decoded.firstName || '';
    }
    else {
        return '';
    }
}

export function getlastName(): string {
    let token: any = localStorage.getItem('accessToken');
    if (token) {
        let decoded: any = jwtDecode(token);
        // console.log()
        // console.log("user Details bro!=",decoded)
        return decoded.lastName || '';
    }
    else {
        return '';
    }
}


export function getUserId(): number {
    let token: any = localStorage.getItem('accessToken');
    if (token) {
        let decoded: any = jwtDecode(token);
        return decoded.id || 0;
    }
    else {
        return 0;
    }
}

export function getUserType(): string {
    let token: any = localStorage.getItem('accessToken');
    if (token) {
        let decoded: any = jwtDecode(token);
        return decoded.userType || '';
    }
    else {
        return '';
    }
}


export function getUserRoll(): string {
    let token: any = localStorage.getItem('accessToken');
    if (token) {
        let decoded: any = jwtDecode(token);
        return decoded.roll || '';
    }
    else {
        return '';
    }
}


export function getUserEmail(): number {
    let token: any = localStorage.getItem('accessToken');
    if (token) {
        let decoded: any = jwtDecode(token);
        return decoded.email_id || '';
    }
    else {
        return 0;
    }
}

export function getUserDetails(): any | null {
    let token = localStorage.getItem('accessToken');
    if (token) {
        try {
            let res: any = jwtDecode(token);
            console.log(res)
            return {
                profileImage:res.profileImage,
                email: res.email_id,
                coverImage:res.coverImage,
                firstName:res.name,
                lastName:res.lastName,
                createdAt:res.createdAt,
            
            };
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    } else {
        return null;
    }
}



export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
        }
    },
    getCurrentAccessToken,
})