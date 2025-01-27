// route /api/v1/users
import dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';
import express from 'express';
import { describe, expect, it } from 'vitest';

const app = express();

app.get('/api/v1/users', (req, res) => {
  res.json({ ok: true, users: [] });
});

app.get('/api/v1/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ ok: true, id });
});

describe('user routes', () => {
  it('GET /api/v1/users -should return code 200', async () => {
    const response = await request(app).get('/api/v1/users');
    const statusCode = response.statusCode;

    expect(statusCode).toBe(200);
  });

  it('GET /api/v1/users/:id - should return the user ID', async () => {
    const testId = '12345';
    const response = await request(app).get(`/api/v1/users/${testId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ok: true, id: testId });
  });
});
