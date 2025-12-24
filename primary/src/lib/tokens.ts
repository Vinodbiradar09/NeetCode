import jwt, { type Jwt } from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../prismadb.js";
dotenv.config();

const generateAccessToken = async( id : string , email : string)=>{
    const secret = process.env.ACCESS_TOKEN_SECRET!;
    const expire = process.env.ACCESS_TOKEN_EXPIRY!;
    if (!secret) throw new Error("ACCESS_TOKEN_SECRET missing");
    if (!expire) throw new Error("ACCESS_TOKEN_EXPIRY missing");
    try {
        return jwt.sign({id , email} , secret , {expiresIn : expire} as jwt.SignOptions);
    } catch (error) {
        console.log("failed to generate the access tokens" , error);
    }
}

const generateRefreshToken = async( id : string)=>{
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const expire = process.env.REFRESH_TOKEN_EXPIRY;
    if (!secret) throw new Error("REFRESH_TOKEN_SECRET missing");
    if (!expire) throw new Error("REFRESH_TOKEN_EXPIRY missing");
    try {
        return jwt.sign({id} , secret , {expiresIn : expire} as jwt.SignOptions);
    } catch (error) {
        console.log("failed to generate the refresh tokens" , error);
    }
}

const generateAccessAndRefreshTokens = async(userId : string)=>{
    try {
        const user = await prisma.user.findUnique({
            where : {
                id : userId,
            }
        })
        if(!user) throw new Error("user not found");
        const accessToken = await generateAccessToken(user.id , user.email);
        const refreshToken = await generateRefreshToken(user.id);
        await prisma.user.update({
            where : {
                id : user.id,
            },
            data : {
                refreshTokens : refreshToken!,
            }
        })
        return {accessToken , refreshToken};
    } catch (error) {
        console.log("error in generating the tokens" , error);
        throw new Error("error in generating the tokens");
    }
}
const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
}
export {generateAccessAndRefreshTokens , options};