// modules/users/services/UserPaymentService.ts
import { UserPayment } from '@shared/entities/users/UserPayment';
import { UserPaymentRepository } from '../repositories/UserPaymentRepository';

export class UserPaymentService {
  private repo: UserPaymentRepository;

  constructor() {
    this.repo = new UserPaymentRepository();
  }

  async getAllPayments(limit: number = 10, offset: number = 0, user_id?: string, user_subscription_id?: string) {
    return this.repo.findAll(limit, offset, user_id, user_subscription_id);
  }

  async createPayment(data: Partial<UserPayment>) {
    const { user_subscription_id, user_id, amount } = data;

    if (!user_subscription_id || !user_id || !amount) {
      throw new Error('user_subscription_id, user_id and amount are required');
    }

    // extra safety: status default active
    const payload: Partial<UserPayment> = {
      user_subscription_id,
      user_id,
      amount,
      comment_1: (data.comment_1 as string),
      comment_2: (data.comment_2 as string),
      payment_date: (data.payment_date as Date),
      payment_method: (data.payment_method as string),
      transaction_no: (data.transaction_no as string),
      payment_status: (data.payment_status as any) || 'pending',
    };

    return this.repo.create(payload);
  }

  async getPaymentById(id: string) {
    return this.repo.findById(id);
  }

  async updatePayment(id: string, data: Partial<UserPayment>) {
    // agar kuch bhi nahi bheja to error
    if (!data || Object.keys(data).length === 0) {
      throw new Error('No data provided to update payment');
    }

    // status allowed values check (optional)
    if (data.payment_status && !['pending', 'success', 'failed', 'refunded'].includes(data.payment_status)) {
      throw new Error('Invalid status value');
    }

    return this.repo.update(id, data);
  }


  async deletePayment(id: string) {
    return this.repo.delete(id);
  }
}
