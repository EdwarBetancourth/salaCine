import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../routes/user/user.service';
import { enc, SHA256 } from 'crypto-js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService ) { }

    validateUser = async (username: string, password: string): Promise<any> => {
        const user = await this.userService.fyndByUserEmail(username);
        if (user) {
            if (user.password === this.crypt(password)) {
                const { password, ...payload } = user;
                return { payload }
            } else {
                throw new HttpException('La contraseña no es correcta', HttpStatus.UNAUTHORIZED)
            }
        } else {
            throw new HttpException('El usuario no existe en nuestra base de datos', HttpStatus.UNAUTHORIZED)
        }
    }

    login = async (data: any) => {
        return {
            access_token: this.jwtService.sign(data, {
                expiresIn: '8h'
            })
        }
    }

    recover = async (data: any) => {
        const user = await this.userService.fyndByUserEmail(data.username)
        data.password = this.crypt(data.password)
        return await this.userService.update(user.id, data)
    }

    signup = async (data: any) => {
        try {
            data.password = this.crypt(data.password)
            const user = await this.userService.create(data);
            const { password, ...payload } = user;
            return {
                access_token: this.jwtService.sign( {payload}, {
                    expiresIn: '8h'
                })
            }
        }
        catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.UNAUTHORIZED)
        }
    }

    private crypt = (password: string): string => {
        return SHA256(password).toString(enc.Hex);
    }

}
