// modules/users/repositories/UserSubscriptionRepository.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../shared/config/database';
import { UserSubscriptionPlan } from '../../../../shared/entities/users/UserSubcriptions';

export class UserSubscriptionRepository {
  private repo: Repository<UserSubscriptionPlan>;

  constructor() {
    this.repo = AppDataSource.getRepository(UserSubscriptionPlan);
  }

  async findAll(
    limit: number = 10,
    offset: number = 0,
    user_id?: string
  ): Promise<[UserSubscriptionPlan[], number]> {

    const whereCondition = user_id ? { user_id } : {};

    return this.repo.findAndCount({
      where: whereCondition,
      relations: ['plan','user','payments'],
      take: limit,
      skip: offset,
      order: { created_at: 'DESC' },
    });
  }

  async findById(id: string) {
    return this.repo.findOne({
      where: { user_subscription_id: id },
      relations: ['user', 'plan', 'payments'],
    });
  }

  // async findByUser(userId: string) {
  //   return this.repo.find({
  //     where: { user_id: userId },
  //     relations: ['plan', 'payments'],
  //     order: { created_at: 'DESC' },
  //   });
  // }

  async create(data: Partial<UserSubscriptionPlan>) {
    const sub = this.repo.create(data);
    return this.repo.save(sub);
  }

  async update(id: string, data: Partial<UserSubscriptionPlan>) {
    await this.repo.update({ user_subscription_id: id }, data);
    return this.findById(id);
  }

  async delete(id: string) {
    const result = await this.repo.delete({ user_subscription_id: id });
    return (result.affected || 0) > 0;
  }
}
