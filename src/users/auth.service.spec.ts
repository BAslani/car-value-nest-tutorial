import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: jest.fn().mockResolvedValue([]),
      create: jest
        .fn()
        .mockImplementation((email: string, password: string) =>
          Promise.resolve({ id: 1, email, password } as User),
        ),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'test');

    expect(user.password).not.toEqual('test');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws if signin is called with an unused email', async () => {
    (fakeUsersService.find as jest.Mock).mockResolvedValue([]);

    await expect(
      service.signin('does-not-exist@test.com', 'password'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if signin is called with an invalid password', async () => {
    const hashedPassword = await service.signup('valid@test.com', 'correct');

    (fakeUsersService.find as jest.Mock).mockResolvedValue([hashedPassword]);

    await expect(
      service.signin('valid@test.com', 'wrong-password'),
    ).rejects.toThrow(BadRequestException);
  });
});
