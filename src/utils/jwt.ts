import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
export const signAccessToken = (user: any) => {
    const userId = user.userId || user.id;
    return jwt.sign({ userId, role: user.role }, JWT_SECRET, {
        expiresIn: '15m'
    });
};
// do khi đăng nhập dùng bảng có cột là id nên khi tạo token sẽ lấy trường id và token gán thành userId, nên khi gọi lại hàm signRefreshToken cũng phải lấy trường id để tạo token mới, nếu không sẽ bị lỗi khi giải mã token cũ vì trong payload không có trường userId
//thì cần phải kiểm tra thành trường userId nếu có thì lấy userId, nếu không có thì lấy id để tạo token mới
export const signRefreshToken = (user: any) => {
    const userId = user.userId || user.id;
    return jwt.sign({ userId, role: user.role }, JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, JWT_REFRESH_SECRET) as {
        userId: number;
        role: string;
    };
};
