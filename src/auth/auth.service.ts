import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker'
import { IAuthenticate, Role } from './interface/user.interface';
import { AuthenticationDto } from './dto/authenticate.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    users = [
        {
            id: faker.datatype.uuid(),
            userName: 'Huameng Lim',
            password: 'Huameng',
            role: Role.Admin
        },
        {
            id: faker.datatype.uuid(),
            userName: 'Kimchhoung Lim',
            password: 'Kimchhoung',
            role: Role.Customer
        },
    ];

    authenticate(authenticateDto: AuthenticationDto) {
        // console.log(authenticateDto)
        const user = this.users.find(
            (u) =>
                // console.log(u) =>
                u.userName == authenticateDto.userName &&
                u.password == authenticateDto.password,
        );

        if (!user) throw new NotFoundException('Invalid credentials');

        const token = sign({ ...user }, 'secrete');

        return { user, token };
        // return ;
    }
}
