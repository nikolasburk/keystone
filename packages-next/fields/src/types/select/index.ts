import { Text } from '@keystonejs/fields';

import type { FieldConfig } from '../../interfaces';
import type { FieldType } from '@keystone-spike/types';
import type { BaseGeneratedListTypes } from '@keystone-spike/types';
import { resolveView } from '../../resolve-view';

export type SelectFieldConfig<TGeneratedListTypes extends BaseGeneratedListTypes> = FieldConfig<
  TGeneratedListTypes
> &
  (
    | {
        options: { label: string; value: string }[];
        dataType?: 'string' | 'enum';
      }
    | {
        options: { label: string; value: number }[];
        dataType: 'integer';
      }
  );

const views = resolveView('select/views');

export const select = <TGeneratedListTypes extends BaseGeneratedListTypes>(
  config: SelectFieldConfig<TGeneratedListTypes>
): FieldType<TGeneratedListTypes> => ({
  type: Text,
  config,
  getAdminMeta: () => ({
    options: config.options,
    dataType: config.dataType ?? 'string',
  }),
  views,
  getBackingType(path: string) {
    return {
      [path]: {
        optional: true,
        type: 'string | null',
      },
    };
  },
});
