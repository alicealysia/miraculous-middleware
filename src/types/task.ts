interface Note {
    id?: number;
    note: string;
    noteDate: Date;
}

interface Contract {
    id?: number;
    referringAgent?: number;
    billerCode?: string;
    quoteLink?: string;
    invoiceLink?: string;
    cost?: number;
}

interface OTAssessment {
    id?: number;
    referralReason: string;
    billableCode: string;
    assessmentDate: Date;
}

enum TaskType {
    simple= 0,
    contract = 1,
    assessment = 2
}

interface Task {
    id?: number;
    assignment?: number;
    taskName?: string;
    due?: Date;
    taskType?: TaskType;
    estimatedTravel?: number;
    estimatedHours?: number;
    actualHours?: number;
    actualTravel?: number;
    report?: string;
    complete?: Date;
    contracts?: Contract[];
    assessments?: OTAssessment[];
    notes?: Note[];
}

export { Contract, TaskType, Task, OTAssessment, Note}
