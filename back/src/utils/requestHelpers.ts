import { Document, DocumentQuery } from 'mongoose';
import { MultipleDocuments, MultipleOptionalDocuments } from '../mongoose/Controllers/controller.types';

export function multipleQueriesHandler<
  T extends (data: any) => DocumentQuery<Document | null, Document, {}>
>(
  query: T,
  requestsData: any[]
): Promise<MultipleDocuments>;

export function multipleQueriesHandler<
  T extends (data: any) => DocumentQuery<Document | null, Document, {}>
>(
  query: T,
  requestsData: object[],
  acceptNull: boolean = false
): Promise<MultipleOptionalDocuments> {
  return new Promise((resolve, reject) => {

    let requestsSucceeded: number = 0;
    let requestAmount: number = requestsData.length;
    let documents: (Document | null)[] = [];

    requestsData.forEach(data => {
      query(data)
        .then(document => {

          if (acceptNull || document) {
            documents[documents.length] = document;
          }

          if (++requestsSucceeded === requestAmount) {
            resolve({ success: true, documents: documents });
          }
        })
        .catch(reject);
    });
  });
}
