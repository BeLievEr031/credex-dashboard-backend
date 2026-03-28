import createError from "http-errors";
import User from "../../models/User.ts";
import type { IUser } from "./auth.interface.ts";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/tokenUtils.ts";

class AuthService {
    async register(userData: Partial<IUser>) {
        const { email } = userData;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw createError(409, "User with this email already exists");
        }

        const user = await User.create(userData);
        const userResponse = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        };

        return userResponse;
    }

    async login(credentials: Partial<IUser>) {
        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.comparePassword(password!))) {
            throw createError(401, "Invalid email or password");
        }

        const accessToken = generateAccessToken({ id: user._id.toString(), email: user.email });
        const refreshToken = generateRefreshToken({ id: user._id.toString(), email: user.email });

        // Store refresh token in user document
        user.refreshToken = refreshToken;
        await user.save();

        const userResponse = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        };

        return { user: userResponse, accessToken, refreshToken };
    }

    async refreshToken(token: string) {
        try {
            const decoded = verifyRefreshToken(token);
            const user = await User.findById(decoded.id).select("+refreshToken");

            if (!user || user.refreshToken !== token) {
                throw createError(401, "Invalid refresh token");
            }

            const accessToken = generateAccessToken({ id: user._id.toString(), email: user.email });
            const newRefreshToken = generateRefreshToken({ id: user._id.toString(), email: user.email });

            user.refreshToken = newRefreshToken;
            await user.save();

            return { accessToken, refreshToken: newRefreshToken };
        } catch (error) {
            console.log(error)
            throw createError(401, "Invalid or expired refresh token");
        }
    }

    async getProfile(userId: string) {
        const user = await User.findById(userId);
        if (!user) {
            throw createError(404, "User not found");
        }

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        };
    }

    async changePassword(userId: string, data: { oldPassword: string; newPassword: string }) {
        const { oldPassword, newPassword } = data;

        const user = await User.findById(userId).select("+password");
        if (!user || !(await user.comparePassword(oldPassword))) {
            throw createError(401, "Invalid old password");
        }

        user.password = newPassword;
        user.refreshToken = undefined; // Invalidate current session's refresh token on password change
        await user.save();

        return { message: "Password changed successfully" };
    }
}

export default new AuthService();