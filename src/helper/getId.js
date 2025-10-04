import jwt from 'jsonwebtoken';
export function getId(token) {

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const id = decoded.id
        return id
    } catch (error) {
        console.error('Error decoding token:', error);
        throw new Error('Invalid token' + error.message);
    }
}

