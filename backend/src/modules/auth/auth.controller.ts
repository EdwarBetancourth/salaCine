import { Body, Req, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';

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

    @Post('recover')
    forgot(@Body() body: any) {
        return this.authService.recover(body)
    }
    
}
