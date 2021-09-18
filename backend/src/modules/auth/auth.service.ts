import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../routes/user/user.service';
import { enc, SHA256 } from 'crypto-js';

@Injectable()
export class AuthService {

    constructor(private userService: UserService){}

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

    private crypt = (password: string): string => {
        return SHA256(password).toString(enc.Hex);
    }

}
