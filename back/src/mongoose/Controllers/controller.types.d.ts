import { DocumentQuery, Document } from 'mongoose';

export type ArrayQuery = DocumentQuery<Document[], Document, {}>;
export type NullableQuery = DocumentQuery<Document | null, Document, {}>;
export type Query = DocumentQuery<Document, Document, {}>;

export type MultipleDocuments = MultipleQueries<Document>;
export type MultipleOptionalDocuments = MultipleQueries<Document | null>;

export interface MultipleQueries <T>{
  success: boolean;
  documents: T[];
}
