import { Calculation } from '@/store'
import { Condition, Genres, LevelOfPhysicalActivity } from '@/utils/options'

const mockAllValues: Calculation = {
  id: '42346',
  name: 'Test all filled values',
  genre: Genres.Feminino,
  bodyMass: 1.23,
  height: 4.56,
  age: 12,
  TMR: 10,
  NAF: 20,
  createdAt: new Date().toDateString(),
  levelOfActivity: LevelOfPhysicalActivity.Athletic,
  condition: Condition.Eutrophic,
  fatFreeMass: 6.78,
}

const mockOnlyRequiredValues: Calculation = {
  id: '123456',
  name: 'Test only required values',
  TMR: 10,
  NAF: 20,
  createdAt: new Date().toDateString(),
  condition: Condition.Athletic,
}

export { mockAllValues, mockOnlyRequiredValues }
