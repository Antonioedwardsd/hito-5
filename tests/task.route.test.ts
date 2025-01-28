import request from 'supertest';
import app from '../src/index';
import { describe, it, expect, beforeAll } from 'vitest';
import { sequelize } from '../src/config/sequelize';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Task Route Validations', () => {
  it('should fail validation if title is missing on task creation', async () => {
    const response = await request(app).post('/api/v1/tasks/12345').send({
      description: 'Valid description',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['title'],
          message: 'Title is required',
        }),
      ])
    );
  });

  it('should fail validation if description is missing on task creation', async () => {
    const response = await request(app).post('/api/v1/tasks/12345').send({
      title: 'Valid title',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['description'],
          message: 'Description is required',
        }),
      ])
    );
  });

  it('should create task successfully with valid data', async () => {
    const response = await request(app).post('/api/v1/tasks/12345').send({
      title: 'Valid Task',
      description: 'Valid Task Description',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Valid Task');
    expect(response.body).toHaveProperty('description', 'Valid Task Description');
  });
});
