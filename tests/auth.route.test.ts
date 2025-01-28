// route /api/v1/auth/register
import dotenv from 'dotenv';
dotenv.config();
import app from '../src/index';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import { sequelize } from '../src/config/sequelize';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Auth Route Validations', () => {
  it('should fail validation if email is invalid on register', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      email: 'invalid-email',
      password: 'ValidPass123',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['email'],
          message: 'Invalid email format',
        }),
      ])
    );
  });

  it('should fail validation if password is too short on register', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: '123',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['password'],
          message: 'Password must be at least 8 characters long',
        }),
      ])
    );
  });

  it('should fail validation if email is missing on login', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      password: 'ValidPass123',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['email'],
          message: 'Required',
        }),
      ])
    );
  });

  it('should pass validation and register user successfully', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      email: 'valid@example.com',
      password: 'ValidPass123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('newUser');
    expect(response.body.newUser).toHaveProperty('email', 'valid@example.com');
  });
});
