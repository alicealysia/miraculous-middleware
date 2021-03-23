import {User, Task} from '../../../types'

//tasks reference assignment id when created, meaning we just need to check the given ID vs the user assignments

// future versions may include projects PMs can assign users to, or user groups that PMs can assign projects to, or both with both conditions needing to be met, as a result
// this logic could grow in complexity, or multiple functions could be needed, so watch this space.

export const create = (user:User, assignmentId: number) => {
    if (!user.assignments) {
        return false;
    }
    return user.assignments.some(assignment => assignment.id === assignmentId);
}

// find tasks within assignments, compare task ID to assignment ID.

export const existing = async (user: User, taskId: number) => {
    if (!user.assignments) {
        return false;
    }
    const tasks = user.assignments.reduce<Task[]>((finalList: Task[], assignment) => finalList.concat(assignment.tasks), []);
    return tasks.some(task => task.id === taskId);
}

//contract, otAssessment