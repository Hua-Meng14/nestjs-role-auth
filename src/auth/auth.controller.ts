import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './jwt.guard';
import { RoleGuard } from './role/role.guard';
import { Roles } from './role/roles.decorator';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    login(@Res() res, @Body() authenticatDto: AuthenticationDto): any {
        try {
            // console.log("body:",authenticatDto)
            const response = this.authService.authenticate(authenticatDto);
            return res.status(HttpStatus.OK).json({ response });
        } catch (error) {
            return res.status(error.status).json(error.response);

        }
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    profile(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(req.user)
    }
}
