import { Genres, LevelOfPhysicalActivity } from './options'

const levelsOfActivity: Record<LevelOfPhysicalActivity, number> = {
  [LevelOfPhysicalActivity.Sedentary]: 1.2,
  [LevelOfPhysicalActivity.Light]: 1.4,
  [LevelOfPhysicalActivity.Moderate]: 1.6,
  [LevelOfPhysicalActivity.VeryActive]: 1.8,
  [LevelOfPhysicalActivity.Athletic]: 2,
}

export const getTRMFat = (bodyMass: number, height: number, age: number, genre: string) => {
  const genreValue = genre === Genres.Masculino ? 1 : 0

  return 9.99 * bodyMass + 6.25 * height - 4.92 * age + 166 * genreValue - 161
}

export const getTMREutrophic = (bodyMass: number, height: number, age: number, genre: string) => {
  if (genre === Genres.Masculino) {
    return 66.5 + 13.75 * bodyMass + 5.003 * height - 6.755 * age
  }

  return 655.1 + 9.563 * bodyMass + 1.85 * height - 4.676 * age
}

export const getTMRAthletic = (bodyMass: number) => {
  return 24.8 * bodyMass + 10
}

export const getLevelOfPhysicalActivity = (TMR: number, levelOfActivity: string) => {
  return TMR * levelsOfActivity[levelOfActivity as LevelOfPhysicalActivity]
}
