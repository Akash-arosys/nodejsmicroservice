import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../shared/config/database';
import { Question } from '../../../../shared/entities/questions/Question';

export class QuestionRepository {
  private repo: Repository<Question>;

  constructor() {
    this.repo = AppDataSource.getRepository(Question);
  }

  async findById(id: string): Promise<Question | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByTestId(testId: string): Promise<Question[]> {
    return this.repo.find({
      where: { testId },
      order: { sequenceNumber: 'ASC' },
    });
  }

  async create(data: Partial<Question>): Promise<Question> {
    const question = this.repo.create(data);
    return this.repo.save(question);
  }

  async update(id: string, data: Partial<Question>): Promise<Question | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected || 0) > 0;
  }

  async findByDifficulty(difficulty: string, limit: number = 10): Promise<Question[]> {
    return this.repo.find({
      where: { difficulty: difficulty as any },
      take: limit,
    });
  }

  async findBySubject(subject: string, limit: number = 10): Promise<Question[]> {
    return this.repo.find({
      where: { subject },
      take: limit,
    });
  }
}
