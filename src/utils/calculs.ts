import { TProjectTransaction } from '@models';

export const calculateAmount = (projects: TProjectTransaction[]) => {
    let amount = 0;
    if (!projects) return amount;

    projects.forEach((project: TProjectTransaction) => {
        if (!project.carbon) return;
        if (!project.isWithoutCarbonCredit && project.carbon.volume && project.carbon.unitPrice) {
            amount += project.carbon.volume * project.carbon.unitPrice;
        }
    });

    amount = Math.round(amount * 100) / 100;
    return amount;
};
