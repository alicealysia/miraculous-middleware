import {User} from '../../../types'
import database from '../../database'

//is the user me?

//future versions may allow for groups to be assigned to PMs and user admins, so watch this space.

export default (user: User, userId: number) => user.id === userId;