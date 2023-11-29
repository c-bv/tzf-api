import { TTransaction, TransactionModel } from '@models';

/**
 * Creates a new transaction.
 * @param transaction The transaction document to be created.
 * @returns The created transaction document.
 */
export const createTransaction = async (transaction: TTransaction) => {
    return await TransactionModel.create(transaction);
};
