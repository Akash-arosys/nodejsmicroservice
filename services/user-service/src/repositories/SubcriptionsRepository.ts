// modules/users/repositories/SubscriptionPlanRepository.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../shared/config/database';
import { SubscriptionPlan } from '../../../../shared/entities/users/SubcriptionPlan';

export class SubscriptionPlanRepository {
  private repo: Repository<SubscriptionPlan>;

  constructor() {
    this.repo = AppDataSource.getRepository(SubscriptionPlan);
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { plan_id: id } });
  }

  async findAll(limit = 10, offset = 0): Promise<[SubscriptionPlan[], number]> {
    return this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { plan_name: 'ASC' },
    });
  }

  async create(data: Partial<SubscriptionPlan>) {
    const plan = this.repo.create(data);
    return this.repo.save(plan);
  }

  async update(id: string, data: Partial<SubscriptionPlan>) {
    await this.repo.update({ plan_id: id }, data);
    return this.findById(id);
  }

  async delete(id: string) {
    const result = await this.repo.delete({ plan_id: id });
    return (result.affected || 0) > 0;
  }
}
