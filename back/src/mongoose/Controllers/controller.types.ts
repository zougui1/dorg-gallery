import { DocumentQuery, Document } from 'mongoose';

export type ArrayQuery = DocumentQuery<Document[], Document, {}>;
export type NullableQuery = DocumentQuery<Document | null, Document, {}>;
export type Query = DocumentQuery<Document, Document, {}>;
