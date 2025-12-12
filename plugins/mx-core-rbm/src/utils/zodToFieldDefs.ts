// plugins/mx-core-rbm/src/utils/zodToFieldDefs.ts
import { logger } from './logger';
import {
  ZodObject,
  ZodRawShape,
  ZodTypeAny,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodString,
  ZodNumber,
  ZodBoolean,
  ZodDate,
} from 'zod';

import { FieldDefinition } from '@/models/asset-type-schema';

function isFieldOptional(zodType: ZodTypeAny): boolean {
  const optional =
    zodType instanceof ZodOptional ||
    zodType instanceof ZodNullable ||
    zodType instanceof ZodDefault;

  const typeName = (zodType._def as any)?.typeName ?? 'Unknown';

  logger.debug(`🔍 [isFieldOptional] Tipe: ${typeName}, Optional: ${optional}`);

  return optional;
}

export function zodToFieldDefs<T extends ZodRawShape>(
  schema: ZodObject<T>
): FieldDefinition[] {
  const shape = schema.shape;

  logger.info('🧠 [zodToFieldDefs] Memproses schema Zod → FieldDefinition[]');
  logger.debug('🧠 [zodToFieldDefs] Schema shape:', shape);

  const fields = Object.entries(shape).map(([name, def]) => {
    const zodType = def as ZodTypeAny;

    let type: FieldDefinition['type'] = 'string';

    if (zodType instanceof ZodString) type = 'string';
    else if (zodType instanceof ZodNumber) type = 'number';
    else if (zodType instanceof ZodBoolean) type = 'boolean';
    else if (zodType instanceof ZodDate) type = 'date';

    const required = !isFieldOptional(zodType);

    logger.debug(`➡️ Field: ${name} | Type: ${type} | Required: ${required}`);

    return {
      name,
      label: name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      type,
      required,
    };
  });

  logger.info(`✅ [zodToFieldDefs] ${fields.length} field berhasil diparse`);
  return fields;
}
