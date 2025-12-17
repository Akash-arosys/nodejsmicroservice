// modules/users/services/UserSubscriptionService.ts
import { UserSubscriptionRepository } from '../repositories/UserSubcriptionRepository';
import { UserSubscriptionPlan } from '../../../../shared/entities/users/UserSubcriptions';
export class UserSubscriptionService {
  private repo: UserSubscriptionRepository;

  constructor() {
    this.repo = new UserSubscriptionRepository();
  }

  async getAllSubscriptions(limit: number = 10, offset: number = 0,user_id?:string) {
    return this.repo.findAll(limit, offset,user_id);
  }

  async addUserSubcriptions(data: Partial<UserSubscriptionPlan>) {
    const { plan_id, user_id, subscription_plan_purchase_date, subscription_plan_start_date, subscription_plan_end_date } = data;

    if (!plan_id || !user_id || !subscription_plan_purchase_date || !subscription_plan_start_date || !subscription_plan_end_date) {
      throw new Error('plan_id, user_id, subscription_plan_purchase_date,subscription_plan_start_date and subscription_plan_end_date are required');
    }

    // extra safety: status default active
    const payload: Partial<UserSubscriptionPlan> = {
      plan_id,
      user_id,
      subscription_plan_purchase_date,
      subscription_plan_start_date,
      subscription_plan_end_date,
      subscription_status: (data.subscription_status as any) || 'active',
    };

    return this.repo.create(payload);
  }

  async getSubscriptionById(id: string) {
    return this.repo.findById(id);
  }

  async updateSubscription(id: string, data: Partial<UserSubscriptionPlan>) {
    // agar kuch bhi nahi bheja to error
    if (!data || Object.keys(data).length === 0) {
      throw new Error('No data provided to update plan');
    }

    // status allowed values check (optional)
    if (data.subscription_status && !['active','expired','cancel', 'delete'].includes(data.subscription_status)) {
      throw new Error('Invalid status value');
    }

    return this.repo.update(id, data);
  }


  async deleteSubscription(id: string) {
    return this.repo.delete(id);
  }
}
