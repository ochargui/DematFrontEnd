import { DocumentPicture } from "./documentPicture";

export interface IRawDocument {
    id: string;
    documentName?: any;
    observation?: any;
    documentType: number;
    state: number;
    lot?: any;
    documentPicture: DocumentPicture;
    documentFields?: any;
    createdDate: Date;
    createdBy?: any;
    createdById?: any;
    modifiedDate?: any;
    modifiedBy?: any;
    modifiedById?: any;
}

