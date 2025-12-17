import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../shared/config/database';
import { TestAttempt } from '../../../../shared/entities/tests/TestAttempt';

export class TestAttemptRepository {
  private repo: Repository<TestAttempt>;

  constructor() {
    this.repo = AppDataSource.getRepository(TestAttempt);
  }

  async create(data: Partial<TestAttempt>): Promise<TestAttempt> {
    const attempt = this.repo.create(data);
    return this.repo.save(attempt);
  }

  async findById(id: string): Promise<TestAttempt | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByUserId(userId: string, limit: number = 10, offset: number = 0): Promise<[TestAttempt[], number]> {
    return this.repo.findAndCount({
      where: { userId },
      take: limit,
      skip: offset,
      order: { completedAt: 'DESC' },
    });
  }

  async findByTestId(testId: string, limit: number = 10): Promise<TestAttempt[]> {
    return this.repo.find({
      where: { testId },
      take: limit,
      order: { completedAt: 'DESC' },
    });
  }

  async update(id: string, data: Partial<TestAttempt>): Promise<TestAttempt | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async getAverageScore(testId: string): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('attempt')
      .select('AVG(attempt.score)', 'average')
      .where('attempt.testId = :testId', { testId })
      .getRawOne();

    return result?.average || 0;
  }

  async getPassRate(testId: string): Promise<number> {
    const total = await this.repo.count({ where: { testId } });
    const passed = await this.repo.count({ where: { testId, isPassed: true } });
    return total > 0 ? (passed / total) * 100 : 0;
  }
}
