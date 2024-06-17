export enum Genres {
  Masculino = 'Masculino',
  Feminino = 'Feminino',
}

export enum Condition {
  Fat = 'Obeso',
  Eutrophic = 'Eutrófico',
  Athletic = 'Atleta',
}

export enum LevelOfPhysicalActivity {
  Sedentary = 'Sedentário',
  Light = 'Leve',
  Moderate = 'Moderado',
  VeryActive = 'Muito ativo',
  Athletic = 'Atleta',
}

export const genres = [
  { name: Genres.Masculino, value: Genres.Masculino },
  { name: Genres.Feminino, value: Genres.Feminino },
]

export const conditions = [
  { name: Condition.Fat, value: Condition.Fat },
  { name: Condition.Eutrophic, value: Condition.Eutrophic },
  { name: Condition.Athletic, value: Condition.Athletic },
]

export const levels = [
  { name: LevelOfPhysicalActivity.Sedentary, value: LevelOfPhysicalActivity.Sedentary },
  { name: LevelOfPhysicalActivity.Light, value: LevelOfPhysicalActivity.Light },
  { name: LevelOfPhysicalActivity.Moderate, value: LevelOfPhysicalActivity.Moderate },
  { name: LevelOfPhysicalActivity.VeryActive, value: LevelOfPhysicalActivity.VeryActive },
  { name: LevelOfPhysicalActivity.Athletic, value: LevelOfPhysicalActivity.Athletic },
]
