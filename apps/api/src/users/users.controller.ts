import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.users.findAll(user.tenantId);
  }

  @Get('me')
  me(@CurrentUser() user: JwtUser) {
    return this.users.findMe(user.id);
  }
}
