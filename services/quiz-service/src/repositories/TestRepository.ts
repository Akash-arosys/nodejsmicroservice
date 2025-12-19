import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../shared/config/database';
import { Test } from '../../../../shared/entities/tests/Test';

export class TestRepository {
  private repo: Repository<Test>;

  constructor() {
    this.repo = AppDataSource.getRepository(Test);
  }

  async findById(id: string): Promise<Test | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['question', 'attempts'],
    });
  }

  async findByIdWithQuestions(id: string): Promise<Test | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['question'],
    });
  }

  async create(data: Partial<Test>): Promise<Test> {
    const test = this.repo.create(data);
    return this.repo.save(test);
  }

  async update(id: string, data: Partial<Test>): Promise<Test | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async findAll(limit: number = 10, offset: number = 0): Promise<[Test[], number]> {
    return this.repo.findAndCount({
      where: { status: 'active', isPublished: true },
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
  }

  async findByStatus(status: string, limit: number = 10, offset: number = 0): Promise<[Test[], number]> {
    return this.repo.findAndCount({
      where: { status: status as any },
      take: limit,
      skip: offset,
    });
  }

  async findByCategory(category: string, limit: number = 10, offset: number = 0): Promise<[Test[], number]> {
    return this.repo.findAndCount({
      where: { category },
      take: limit,
      skip: offset,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected || 0) > 0;
  }

  async incrementAttemptCount(id: string): Promise<void> {
    const test = await this.findById(id);
    if (test) {
      test.attemptCount += 1;
      await this.repo.save(test);
    }
  }

  async updateAverageScore(id: string, newScore: number): Promise<void> {
    const test = await this.findById(id);
    if (test) {
      const newAverage =
        (test.averageScore * (test.attemptCount - 1) + newScore) / test.attemptCount;
      test.averageScore = Math.round(newAverage * 100) / 100;
      await this.repo.save(test);
    }
  }

  async search(query: string, limit: number = 10, offset: number = 0): Promise<[Test[], number]> {
    return this.repo
      .createQueryBuilder('test')
      .where('test.title LIKE :query', { query: `%${query}%` })
      .orWhere('test.description LIKE :query', { query: `%${query}%` })
      .andWhere('test.isPublished = true')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
  }

  async getPopularTests(limit: number = 10): Promise<Test[]> {
    return this.repo.find({
      where: { isPublished: true },
      order: { attemptCount: 'DESC' },
      take: limit,
    });
  }

  async getTestsByDifficulty(difficulty: number, limit: number = 10): Promise<Test[]> {
    return this.repo.find({
      where: { difficulty, isPublished: true },
      take: limit,
    });
  }

  async publishTest(id: string): Promise<Test | null> {
    await this.repo.update(id, {
      isPublished: true,
      publishedAt: new Date(),
    });
    return this.findById(id);
  }

  async unpublishTest(id: string): Promise<Test | null> {
    await this.repo.update(id, { isPublished: false });
    return this.findById(id);
  }
}