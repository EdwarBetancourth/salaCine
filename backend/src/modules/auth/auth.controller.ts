import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService){}

    @UseGuards(LocalGuard)
    @Post('login')
    login(@Req() Req: any) {
        return this.authService.login(Req.user)
    }

    @Post('signup')
    signup(@Body() body: any) {
        return this.authService.signup(body)
    } 

    @Post('forgot')
    forgot(@Body() body: any) {
        return this.authService.forgot(body)
    }
    
}
