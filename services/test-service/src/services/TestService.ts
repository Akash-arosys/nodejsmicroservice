import { TestRepository } from '../repositories/TestRepository.js';
import { cacheGetJSON, cacheSetJSON, cacheDelete } from '../../../../shared/config/redis.js';
import { publishEvent } from '../../../../shared/config/kafka.js';
import { generateToken } from '../../../../shared/utils/jwt.js';
import { Test } from '../../../../shared/entities/Test.js';

export class TestService {
  private testRepository: TestRepository;

  constructor() {
    this.testRepository = new TestRepository();
  }

  async createTest(data: Partial<Test>): Promise<Test> {
    const test = await this.testRepository.create(data);

    await publishEvent('test-events', [
      {
        key: test.id,
        value: JSON.stringify({
          type: 'TEST_CREATED',
          testId: test.id,
          title: test.title,
          timestamp: new Date(),
        }),
      },
    ]);

    await cacheSetJSON(`test:${test.id}`, test, 3600);
    return test;
  }

  async getTestById(id: string): Promise<Test | null> {
    const cached = await cacheGetJSON<Test>(`test:${id}`);
    if (cached) return cached;

    const test = await this.testRepository.findById(id);
    if (test) {
      await cacheSetJSON(`test:${test.id}`, test, 3600);
    }
    return test;
  }

  async getAllTests(limit: number = 10, offset: number = 0): Promise<[Test[], number]> {
    return this.testRepository.findAll(limit, offset);
  }

  async updateTest(id: string, data: Partial<Test>): Promise<Test | null> {
    const test = await this.testRepository.update(id, data);
    if (test) {
      await cacheDelete(`test:${id}`);
    }
    return test;
  }

  async deleteTest(id: string): Promise<void> {
    const deleted = await this.testRepository.delete(id);
    if (deleted) {
      await cacheDelete(`test:${id}`);
      await publishEvent('test-events', [
        {
          key: id,
          value: JSON.stringify({
            type: 'TEST_DELETED',
            testId: id,
            timestamp: new Date(),
          }),
        },
      ]);
    }
  }

  async publishTest(id: string): Promise<Test | null> {
    const test = await this.testRepository.publishTest(id);
    if (test) {
      await cacheDelete(`test:${id}`);
    }
    return test;
  }

  async searchTests(query: string, limit: number = 10, offset: number = 0): Promise<[Test[], number]> {
    return this.testRepository.search(query, limit, offset);
  }

  async getPopularTests(limit: number = 10): Promise<Test[]> {
    return this.testRepository.getPopularTests(limit);
  }
}