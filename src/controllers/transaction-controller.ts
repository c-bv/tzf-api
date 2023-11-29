import { TProjectTransaction, TTransaction } from '@/models';
import { TAuthRequest } from '@custom-types/custom-types';
import { companyService, transactionService } from '@services';
import { ApiError } from '@utils/ApiError';
import { calculateAmount } from '@utils/calculs';
import { Response } from 'express';
import httpStatus from 'http-status';

export const createTransaction = async (req: TAuthRequest, res: Response) => {
    const transactionData: TTransaction & { projects: TProjectTransaction[] } = req.body;

    if (!req.user || !req.user._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');
    if (!transactionData.projects) throw new ApiError(httpStatus.BAD_REQUEST, 'Projects are required');

    await Promise.all(
        transactionData.projects.map(async (project: TProjectTransaction) => {
            const company = await companyService.getCompanyById(project.company.toString(), {
                select: 'canTakeTransfers'
            });
            if (!company) throw new ApiError(httpStatus.NOT_FOUND, `Company ${project.company} not found`);
            if (!company.canTakeTransfers)
                throw new ApiError(httpStatus.BAD_REQUEST, `Company ${project.company} can't take transfers`);
        })
    );

    transactionData.user = req.user._id;
    transactionData.status = 'IN PROGRESS';

    const amount = calculateAmount(transactionData.projects);
    transactionData.amount = amount;

    const transaction = await transactionService.createTransaction(transactionData);

    res.status(httpStatus.CREATED).send(transaction);
};
