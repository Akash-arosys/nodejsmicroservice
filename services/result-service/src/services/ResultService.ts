import { TestAttemptRepository } from '../repositories/TestAttemptRepository';
// import { cacheGetJSON, cacheSetJSON } from '../../config/redis';
// import { publishEvent } from '../../config/kafka';
import { TestAttempt } from '../../../../shared/entities/tests/TestAttempt';

export class ResultService {
  private attemptRepository: TestAttemptRepository;

  constructor() {
    this.attemptRepository = new TestAttemptRepository();
  }

  async recordTestAttempt(data: Partial<TestAttempt>): Promise<TestAttempt> {
    const attempt = await this.attemptRepository.create(data);

    // await publishEvent('result-events', [
    //   {
    //     key: attempt.id,
    //     value: JSON.stringify({
    //       type: 'RESULT_RECORDED',
    //       resultId: attempt.id,
    //       userId: attempt.userId,
    //       testId: attempt.testId,
    //       score: attempt.score,
    //       timestamp: new Date(),
    //     }),
    //   },
    // ]);

    return attempt;
  }

  async getAttemptById(id: string): Promise<TestAttempt | null> {
    return this.attemptRepository.findById(id);
  }

  async getUserAttempts(userId: string, limit: number = 10, offset: number = 0): Promise<[TestAttempt[], number]> {
    return this.attemptRepository.findByUserId(userId, limit, offset);
  }

  async getTestAttempts(testId: string, limit: number = 10): Promise<TestAttempt[]> {
    return this.attemptRepository.findByTestId(testId, limit);
  }

  async updateAttempt(id: string, data: Partial<TestAttempt>): Promise<TestAttempt | null> {
    return this.attemptRepository.update(id, data);
  }

  async getTestAnalytics(testId: string) {
    const attempts = await this.attemptRepository.findByTestId(testId, 1000);
    const averageScore = await this.attemptRepository.getAverageScore(testId);
    const passRate = await this.attemptRepository.getPassRate(testId);

    return {
      totalAttempts: attempts.length,
      averageScore: Math.round(averageScore * 100) / 100,
      passRate: Math.round(passRate * 100) / 100,
      highestScore: Math.max(...attempts.map(a => a.score)),
      lowestScore: Math.min(...attempts.map(a => a.score)),
    };
  }
}
