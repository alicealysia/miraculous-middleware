interface Note {
    id?: number;
    note: string;
    noteDate: Date;
}

export const isNote = (obj: any): obj is Note => true;

export interface InsertNote {
    note: string;
    noteDate: Date;
}

export const isInsertNote = (obj: any): obj is InsertNote => true;

interface Contract {
    id: number;
    referringAgent: number;
    billerCode: string;
    quoteLink?: string;
    invoiceLink?: string;
    cost?: number;
}

export const isContract = (obj: any): obj is Contract => true;

export interface InsertContract {
    referringAgent: number;
    billerCode: string;
}

export const isInsertContract = (obj: any): obj is InsertContract => true;

interface OTAssessment {
    id: number;
    referralReason: string;
    billableCode: string;
    assessmentDate: Date;
}

export const isOTAssessment = (obj: any): obj is OTAssessment => true;

export interface InsertOTAssessment {
    referralReason: string;
    billableCode: string;
    assessmentDate: Date;
}

export const isInsertOTAssessment = (obj: any): obj is InsertOTAssessment => true;

enum TaskType {
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

export const isTask = (obj: any): obj is Task => true;

export interface InsertTask {
    assignment: number;
    taskName: string;
    due: Date;
    taskType: TaskType;
    contract?: InsertContract;
    assessment?: InsertOTAssessment;
}

export const isInsertTask = (obj: any): obj is InsertTask => true;

export interface BeginTask {
    id: number;
    estimatedHours: number,
    estimatedTravel: number,
    actualHours: number,
    actualTravel: number,
    note: InsertNote
}

export const isBeginTask = (obj: any): obj is BeginTask => true;

export interface CompleteTask {
    id: number,
    actualHours: number,
    actualTravel: number,
    note: InsertNote,
    report: string
}

export const isCompleteTask = (obj: any): obj is CompleteTask => true;

export { Contract, TaskType, Task, OTAssessment, Note}
