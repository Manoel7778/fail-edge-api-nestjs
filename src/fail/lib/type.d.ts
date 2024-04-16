type dataEdgeProps = {
    id: number;
    workflowConfiguration: workflowConfigProps[];
    container: boolean;
    source: string;
    sourceId: string;
    userId: string;
    agentName: string;
    agentDeleted: boolean;
    status: string;
    workflowResponse: string;
    retriedCount: number;
    totalOperations: number;
    successfulOperations: number;
    createdBy: number;
    createdDate: number;
    lastUpdatedDate: number;
    executionStartTime: number;
    completedDate: number;
    enableTermination: boolean;
    priority: string;
    workflowVersion: number;
    workflowVersionTag: string;
    consumedPremiumUnits: number;
    consumedBotTimeInMinutes: number;
    workflowName: string;
};

type workflowConfigProps = {
        id: number;
        name: string;
}
