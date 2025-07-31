export interface IServiceProps {
    context: any;
    Apilink: string;
    subscriptionId: string;
    OcpApimKey: string;
    Subject: string;
}
export interface IUserProfile {
    displayName: string;
    jobTitle: string;
    department: string;
    employeeId: string;
}
export interface IServiceRequestFormData {
    requestedBy?: string;
    requestedFor: string;
    requestedFor_Title: string;
    requestedFor_key: string;
    serviceName: string;
    serviceName_key: string;
    officeLocation: string;
    PhoneNumber: string;
    GroupName: string;
    UpdatedMailGroupName: string;
    GroupOwner: string;
    GroupOwner_Title: string;
    GroupOwner_key: string;
    Member: string;
    Member_key: string;
    Member1: string;
    Member2: string;
    Member3: string;
    Member4: string;
    Member5: string;
    Member6: string;
    Member1_Title: string;
    Member2_Title: string;
    Member3_Title: string;
    Member4_Title: string;
    Member5_Title: string;
    Member6_Title: string;
    description: string;
    files?: any;
    Contractdate?: Date;
}
//# sourceMappingURL=IServiceProps.d.ts.map