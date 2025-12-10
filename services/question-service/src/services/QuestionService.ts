import { QuestionRepository } from '../repositories/QuestionRepository.js';
// import { cacheGetJSON, cacheSetJSON, cacheDelete } from '../../../../shared/config/redis';
// import { publishEvent } from '../../../../shared/config/kafka';
import { Question } from '../../../../shared/entities/Question.js';

export class QuestionService {
  private questionRepository: QuestionRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  async createQuestion(data: Partial<Question>): Promise<Question> {
    const question = await this.questionRepository.create(data);

    // await publishEvent('question-events', [
    //   {
    //     key: question.id,
    //     value: JSON.stringify({
    //       type: 'QUESTION_CREATED',
    //       questionId: question.id,
    //       testId: question.testId,
    //       timestamp: new Date(),
    //     }),
    //   },
    // ]);

    return question;
  }

  async getQuestionById(id: string): Promise<Question | null> {
    return this.questionRepository.findById(id);
  }

  async getQuestionsByTestId(testId: string): Promise<Question[]> {
    return this.questionRepository.findByTestId(testId);
  }

  async updateQuestion(id: string, data: Partial<Question>): Promise<Question | null> {
    return this.questionRepository.update(id, data);
  }

  async deleteQuestion(id: string): Promise<void> {
    const deleted = await this.questionRepository.delete(id);
    if (deleted) {
      // await publishEvent('question-events', [
      //   {
      //     key: id,
      //     value: JSON.stringify({
      //       type: 'QUESTION_DELETED',
      //       questionId: id,
      //       timestamp: new Date(),
      //     }),
      //   },
      // ]);
    }
  }

  async getByDifficulty(difficulty: string, limit: number = 10): Promise<Question[]> {
    return this.questionRepository.findByDifficulty(difficulty, limit);
  }

  async getBySubject(subject: string, limit: number = 10): Promise<Question[]> {
    return this.questionRepository.findBySubject(subject, limit);
  }
}
