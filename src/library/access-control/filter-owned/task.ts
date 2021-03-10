import {User, Task} from '../../../types'

export default (user:User, tasks: Task[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const assignments = user.assignments;
    return tasks.filter(task => assignments.some(assignment => assignment.id === task.assignment));
}

//list