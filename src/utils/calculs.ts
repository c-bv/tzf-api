import { TProjectInTransaction } from '@models';

export const calculAmount = (projects: TProjectInTransaction[]): number => {
    let amount = 0;
    if (!projects) return amount;

    projects.forEach((project: TProjectInTransaction) => {
        if (!project.carbon) return;
        if (!project.isWithoutCarbonCredit && project.carbon.volume && project.carbon.unitPrice) {
            amount += project.carbon.volume * project.carbon.unitPrice;
        }
    });

    amount = Math.round(amount * 100) / 100;
    return amount;
};

export const calculStripeAmount = (amount: number): number => {
    return Math.round(amount * 100);
};
