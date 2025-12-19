// modules/users/repositories/UserPaymentRepository.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../shared/config/database';
import { UserPayment } from '../../../../shared/entities/users/UserPayment';

export class UserPaymentRepository {
  private repo: Repository<UserPayment>;

  constructor() {
    this.repo = AppDataSource.getRepository(UserPayment);
  }

  async findById(id: string) {
    return this.repo.findOne({
      where: { user_payment_id: id },
      relations: ['user', 'userSubscription'],
    });
  }

async findAll(
  limit: number = 10,
  offset: number = 0,
  user_id?: string,
  user_subscription_id?: string
): Promise<[UserPayment[], number]> {

  const whereCondition: any = {};

  if (user_id) {
    whereCondition.user_id = user_id;
  }

  if (user_subscription_id) {
    whereCondition.user_subscription_id = user_subscription_id;
  }

  return this.repo.findAndCount({
    where: whereCondition,
    relations: ['user'],
    take: limit,
    skip: offset,
    order: { created_at: 'DESC' },
  });
}


  async create(data: Partial<UserPayment>) {
    const p = this.repo.create(data);
    return this.repo.save(p);
  }

  async update(id: string, data: Partial<UserPayment>) {
    await this.repo.update({ user_payment_id: id }, data);
    return this.findById(id);
  }

  async delete(id: string) {
    const result = await this.repo.delete({ user_payment_id: id });
    return (result.affected || 0) > 0;
  }
}
