interface Note {
    id?: number;
    note: string;
    noteDate: Date;
}

export interface InsertNote {
    note: string;
    noteDate: Date;
}

interface Contract {
    id: number;
    referringAgent: number;
    billerCode: string;
    quoteLink?: string;
    invoiceLink?: string;
    cost?: number;
    estimate: number;
}

export interface InsertContract {
    referringAgent: number;
    billerCode: string;
    estimate: number;
}


interface OTAssessment {
    id: number;
    referralReason: string;
    billableCode: string;
    assessmentDate: Date;
}

export interface InsertOTAssessment {
    referralReason: string;
    billableCode: string;
    assessmentDate: Date;
}


export enum TaskType {
    simple= 0,
    contract = 1,
    assessment = 2
}

interface Task {
    id: number;
    assignment: number;
    taskName: string;
    due: Date;
    taskType: TaskType;
    estimatedTravel?: number;
    estimatedHours?: number;
    actualHours?: number;
    actualTravel?: number;
    report?: string;
    complete?: Date;
    contract?: Contract;
    assessment?: OTAssessment;
    notes?: Note[];
}

export interface InsertTask {
    assignment: number;
    taskName: string;
    due: Date;
    taskType: TaskType;
    contract?: InsertContract;
    assessment?: InsertOTAssessment;
}

export interface BeginTask {
    id: number;
    estimatedHours: number,
    estimatedTravel: number,
    actualHours: number,
    actualTravel: number,
    note: InsertNote
}

export interface CompleteTask {
    id: number,
    actualHours: number,
    actualTravel: number,
    note: InsertNote,
    report: string
}

export { Contract, Task, OTAssessment, Note}
