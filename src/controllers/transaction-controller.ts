import { TAuthRequest } from '@custom-types/custom-types';
import { TProjectInTransaction, TTransaction } from '@models';
import { companyService, projectService, transactionService } from '@services';
import { ApiError } from '@utils/ApiError';
import { calculAmount, calculStripeAmount } from '@utils/calculs';
import { generateUUID } from '@utils/generate-uuid';
import { stripe } from '@utils/stripe';
import { Response } from 'express';
import httpStatus from 'http-status';

const checkProject = async (project: TProjectInTransaction) => {
    if (!project._id) throw new ApiError(httpStatus.BAD_REQUEST, 'Project id is required');
    if (!project.quantity) throw new ApiError(httpStatus.BAD_REQUEST, `Project ${project._id} has no quantity`);

    const projectInDb = await projectService.getProjectById(project._id.toString(), {
        select: 'isDeleted isActive isPublished carbon dates minimumAmountToBuy'
    });
    if (!projectInDb) throw new ApiError(httpStatus.NOT_FOUND, `Project ${project._id} not found`);

    const projectWithQuantity = {
        ...projectInDb.toObject(),
        quantity: project.quantity
    };

    if (projectWithQuantity.isDeleted)
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `Project ${project._id} has been deleted on ${projectWithQuantity.dates.delete}`
        );
    if (!projectWithQuantity.isActive)
        throw new ApiError(httpStatus.BAD_REQUEST, `Project ${project._id} is not active`);
    if (!projectWithQuantity.isPublished)
        throw new ApiError(httpStatus.BAD_REQUEST, `Project ${project._id} is not published`);

    if (
        !projectWithQuantity.carbon.forSaleVolume ||
        projectWithQuantity.carbon.forSaleVolume <= projectWithQuantity.quantity
    )
        throw new ApiError(httpStatus.BAD_REQUEST, `Project ${project._id} has not enough carbon to sell`);

    if (projectWithQuantity.minimumAmountToBuy > projectWithQuantity.quantity)
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `The minimum amount to buy for project ${project._id} is ${projectWithQuantity?.minimumAmountToBuy}`
        );
};

export const createTransaction = async (req: TAuthRequest, res: Response) => {
    const transactionData: TTransaction & { projects: TProjectInTransaction[] } = req.body;

    if (!req.user || !req.user._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');
    if (!Array.isArray(transactionData.projects))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Projects must be an array');
    if (transactionData.projects.length === 0)
        throw new ApiError(httpStatus.BAD_REQUEST, 'At least one project is required');

    await Promise.all(
        transactionData.projects.map(async (project: TProjectInTransaction) => {
            if (!project._id) throw new ApiError(httpStatus.BAD_REQUEST, 'Project id is required');

            const projectInDb = await projectService.getProjectById(project._id.toString(), {
                select: 'isDeleted isActive isPublished carbon dates minimumAmountToBuy'
            });
            if (!projectInDb) throw new ApiError(httpStatus.NOT_FOUND, `Project ${project._id} not found`);

            const projectWithQuantity: TProjectInTransaction = {
                ...projectInDb.toObject(),
                quantity: project.quantity
            };

            await checkProject(projectWithQuantity);

            const company = await companyService.getCompanyById(project.company.toString(), {
                select: 'canTakeTransfers'
            });
            if (!company) throw new ApiError(httpStatus.NOT_FOUND, `Company ${project.company} not found`);
            if (!company.canTakeTransfers)
                throw new ApiError(httpStatus.BAD_REQUEST, `Company ${project.company} can't take transfers`);
        })
    );

    const amount = calculAmount(transactionData.projects);
    const stripeAmount = calculStripeAmount(amount);
    console.log('🚩', amount);
    const transferGroup = generateUUID();

    const paymentIntent = await stripe.paymentIntents.create({
        amount: stripeAmount,
        currency: 'eur',
        transfer_group: transferGroup
    });
    console.log('🚩', paymentIntent);
    transactionData.origin = {
        source: 'website'
    };
    transactionData.amount = amount;
    transactionData.stripe = {
        clientSecret: paymentIntent.client_secret,
        transferGroup: transferGroup
    };

    const transaction = await transactionService.createTransaction(transactionData);

    res.status(httpStatus.CREATED).send(transaction);
};
