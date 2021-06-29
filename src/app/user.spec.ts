import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User('hey', '052-1234567')).toBeTruthy();
  });
});
