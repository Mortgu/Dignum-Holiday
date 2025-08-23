import jsonwebtoken from "jsonwebtoken";
import Cookie from "cookie";

export function  parseAuthCookie(cookieHandler) {
    if (!cookieHandler) return null;
    const cookies = Cookie.parse(cookieHandler);
    return cookies.authentication || null;
}

export function verifyToken(token) {
    try {
        return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    } catch (exception) {
        console.error("Jsonwebtoken verification failed! => " + exception);
        return null;
    }
}