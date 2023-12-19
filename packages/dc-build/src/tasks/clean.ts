import { run } from '../utils/process'
export const clean = () => run('rimraf dist')
