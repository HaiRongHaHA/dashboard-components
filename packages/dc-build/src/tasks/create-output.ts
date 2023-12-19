import { mkdir } from 'fs/promises'
import { dcOutput } from '../paths'

export const createOutput = () => mkdir(dcOutput, { recursive: true })
