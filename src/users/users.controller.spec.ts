import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@test.com',
      }),
      find: jest.fn().mockResolvedValue([]),
      update: jest.fn(),
      remove: jest.fn(),
    };

    fakeAuthService = {
      signup: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@test.com',
      }),
      signin: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@test.com',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
