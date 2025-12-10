import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export const validate = (dtoClass: any, data: any) => {
  const dtoObj = plainToClass(dtoClass, data);
  const errors = validateSync(dtoObj, { skipMissingProperties: true });

  if (errors.length > 0) {
    const message = errors.map(error => Object.values(error.constraints || {})).join(', ');
    throw new Error(message);
  }
  return dtoObj;
};

export const isValidUUID = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};
