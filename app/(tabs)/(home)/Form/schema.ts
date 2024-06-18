import * as yup from 'yup'

import { Condition } from '@/utils/options'

export const schema = yup
  .object({
    name: yup
      .string()
      .required('Nome é obrigatório')
      .matches(/^[a-zA-Zà-úÀ-Ú ]+$/, 'O nome pode conter apenas letras e espaços')
      .min(3, 'O nome deve ter pelo menos 3 letras'),
    condition: yup.string().required('Condição é obrigatória'),
    genre: yup.string().when('condition', {
      is: (condition: string) => condition !== Condition.Athletic,
      then: (field) => field.required('Gênero é obrigatório'),
      otherwise: (field) => field,
    }),
    bodyMass: yup
      .number()
      .required('Massa corporal é obrigatória')
      .transform((_value, originalValue) => Number(originalValue.replace(/,/, '')))
      .typeError('Por favor, insira um número válido para massa corporal')
      .positive('Massa corporal deve ser positiva')
      .min(1, 'Massa corporal deve ser maior que 0'),
    height: yup.number().when('condition', {
      is: (condition: string) => condition !== Condition.Athletic,
      then: (field) =>
        field
          .required('Altura é obrigatória')
          .transform((_value, originalValue) => Number(originalValue.replace(/,/, '')))
          .typeError('Por favor, insira um número válido para altura')
          .positive('Altura deve ser positiva')
          .min(1, 'Altura deve ser maior que 0'),
      otherwise: (field) => field,
    }),
    age: yup.number().when('condition', {
      is: (condition: string) => condition !== Condition.Athletic,
      then: (field) =>
        field
          .required('Idade é obrigatória')
          .typeError('Por favor, insira um número válido para idade')
          .positive('Idade deve ser positiva')
          .integer('Idade precisa ser um número inteiro')
          .min(10, 'Idade deve ser maior que 10'),
      otherwise: (field) => field,
    }),
    levelOfActivity: yup.string().required('Nível de atividade física é obrigatório'),
  })
  .required()
