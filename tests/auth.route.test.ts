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

describe('Auth - Register', () => {
  it('should register a new user and return a token', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: 'Password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('newUser');
    expect(response.body).toHaveProperty('token');
  });
});
