import { Document, DocumentQuery } from 'mongoose';
import { MultipleDocuments, MultipleOptionalDocuments } from '../mongoose/Controllers/controller.types';

/**
 * execute a single query on an array
 * @api public
 * @param {Function} query to perform on an array
 * @param {Array} requestsData array to use for the query
 * @returns {Promise<MultipleDocuments>}
 */
export function multipleQueriesHandler<
  T extends (data: any) => DocumentQuery<Document | null, Document, {}>
>(
  query: T,
  requestsData: any[]
): Promise<MultipleDocuments>;

/**
 * execute a single query on an array
 * @api public
 * @param {Function} query to perform on an array
 * @param {Array} requestsData array to use for the query
 * @param {Boolean} acceptNull whether or not to accept null in the result
 * @returns {Promise<MultipleOptionalDocuments>}
 */
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

          // if we accept null or if the document isn't null
          // then we set the document at the end of the array of documents
          if (acceptNull || document) {
            documents[documents.length] = document;
          }

          // if the amount of requests succeeded is equal
          // to the amount of requests to perform
          // then we send the result
          if (++requestsSucceeded === requestAmount) {
            resolve({ success: true, documents: documents });
          }
        })
        .catch(reject);
    });
  });
}
