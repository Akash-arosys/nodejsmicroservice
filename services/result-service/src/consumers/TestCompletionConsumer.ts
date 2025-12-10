import { Consumer } from 'kafkajs';
// import { getConsumer, connectConsumer } from '../../../../shared/config/kafka.js';
import { ResultService } from '../services/ResultService.js';

const resultService = new ResultService();

export class TestCompletionConsumer {
  private consumer: Consumer;

  // constructor() {
  //   this.consumer = getConsumer('result-service-group');
  // }

  async start() {
    try {
      // await connectConsumer(this.consumer, ['test-completed'], false);

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const event = JSON.parse(message.value?.toString() || '{}');

            if (event.type === 'TEST_COMPLETED') {
              await resultService.recordTestAttempt({
                userId: event.userId,
                testId: event.testId,
                score: event.score,
                totalQuestions: event.totalQuestions,
                correctAnswers: event.correctAnswers,
                wrongAnswers: event.wrongAnswers,
                unattempted: event.unattempted,
                duration: event.duration,
                percentage: (event.correctAnswers / event.totalQuestions) * 100,
                isPassed: event.score >= event.passingMarks,
                completedAt: new Date(),
              });

              console.log(`✅ Recorded result for user ${event.userId}`);
            }
          } catch (error) {
            console.error('Error processing message:', error);
          }
        },
      });

      console.log('✅ Test Completion Consumer started');
    } catch (error) {
      console.error('❌ Consumer start failed:', error);
      throw error;
    }
  }

  async stop() {
    await this.consumer.disconnect();
  }
}
