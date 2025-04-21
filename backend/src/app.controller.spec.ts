import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
describe('AppController', () => {
  let appController: AppController;



  beforeEach(async () => {
    const mockUserService = {
      getUser: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com', password: 'password' })
    }

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('login', () => {
    it('should return a user', () => {
      const user = appController.login({ email: 'test@test.com', password: 'password' })
      expect(user).toBeDefined()
    })
    it('shouldnt return a user', () => {
      const user = appController.login({ email: 'test@test.com', password: 'wrongpassword' })
      expect(user).rejects.toThrow()
    })
  });
});
