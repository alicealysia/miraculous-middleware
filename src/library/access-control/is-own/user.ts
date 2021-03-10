import {User} from '../../../types'
import database from '../../database'

export default (user: User, userId: number) => user.id === userId;