import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../shared/config/database';
import { Question } from '../../../../shared/entities/contents/Question';

export class QuestionRepository {
  private repo: Repository<Question>;

  constructor() {
    this.repo = AppDataSource.getRepository(Question);
  }

  async findById(id: number): Promise<Question | null> {
    return this.repo.findOne({ where: { question_id:id } });
  }

  // async findByTestId(testId: number): Promise<Question[]> {
  //   return this.repo.find({
  //     where: {  },
  //     order: { sequenceNumber: 'ASC' },
  //   });
  // }

  async create(data: Partial<Question>): Promise<Question> {
    const question = this.repo.create(data);
    return this.repo.save(question);
  }

  async update(id: number, data: Partial<Question>): Promise<Question | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected || 0) > 0;
  }

  async findByDifficulty(difficulty: string, limit: number = 10): Promise<Question[]> {
    return this.repo.find({
      where: { difficulty_level: difficulty as any },
      take: limit,
    });
  }

  async findByChapter(chapter_id: number, limit: number = 10): Promise<Question[]> {
    return this.repo.find({
      where: { chapter_id },
      take: limit,
    });
  }
}
