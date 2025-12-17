// modules/users/services/SubscriptionPlanService.ts
import { SubscriptionPlanRepository } from '../repositories/SubcriptionsRepository';
import { SubscriptionPlan } from '../../../../shared/entities/users/SubcriptionPlan';

export class SubscriptionPlanService {
  private repo: SubscriptionPlanRepository;

  constructor() {
    this.repo = new SubscriptionPlanRepository();
  }

  // yahan required fields validate kar rahe hain
  async createPlan(data: Partial<SubscriptionPlan>) {
    const { plan_name, plan_duration, plan_price } = data;

    if (!plan_name || !plan_duration || !plan_price) {
      throw new Error('plan_name, plan_duration and plan_price are required');
    }

    // extra safety: status default active
    const payload: Partial<SubscriptionPlan> = {
      plan_name,
      plan_duration,
      plan_price,
      accessible_sections_and_modules_json: data.accessible_sections_and_modules_json,
      plan_description: data.plan_description,
      plan_status: (data.plan_status as any) || 'active',
    };

    return this.repo.create(payload);
  }

  async getPlanById(id: string) {
    return this.repo.findById(id);
  }

  async getAllPlans(limit: number = 10, offset: number = 0) {
    return this.repo.findAll(limit, offset);
  }

  async updatePlan(id: string, data: Partial<SubscriptionPlan>) {
    // agar kuch bhi nahi bheja to error
    if (!data || Object.keys(data).length === 0) {
      throw new Error('No data provided to update plan');
    }

    // status allowed values check (optional)
    if (data.plan_status && !['active', 'inactive', 'delete'].includes(data.plan_status)) {
      throw new Error('Invalid plan_status value');
    }

    return this.repo.update(id, data);
  }

  async deletePlan(id: string) {
    return this.repo.delete(id);
  }
}
