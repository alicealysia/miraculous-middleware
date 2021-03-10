import {User, Task} from '../../../types'

export const create = (user:User, assignmentId: number) => {
    if (!user.assignments) {
        return false;
    }
    return user.assignments.some(assignment => assignment.id === assignmentId);
}

//list

export const existing = async (user: User, taskId: number) => {
    if (!user.assignments) {
        return false;
    }
    const tasks = user.assignments.reduce<Task[]>((finalList: Task[], assignment) => finalList.concat(assignment.tasks), []);
    return tasks.some(task => task.id === taskId);
}

//contract, otAssessment