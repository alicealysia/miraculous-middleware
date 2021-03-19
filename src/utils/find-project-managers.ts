import {database} from '../library'

export default async () => {
    const userList = await database.user.read.list();
    return userList.filter(user => user.accessRights.includes('projectManager'));
}