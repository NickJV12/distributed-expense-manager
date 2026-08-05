const expenseRepository = require("../repositories/expense.repository");
const groupRepository = require("../repositories/group.repository");

const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const BadRequestError = require("../errors/BadRequestError");

const createExpense = async (groupId, userId, expenseData) => {

    const {
        description,
        totalAmount,
        paidBy,
        participants,
    } = expenseData;

    const group = await groupRepository.getGroupById(groupId);

    if(!group){
        throw new NotFoundError("Group not found");
    }

    const requester = await groupRepository.findMembership(
        groupId,
        userId
    );

    if(!requester){
        throw new ForbiddenError("You are not a member of this group");
    }

    const members = await groupRepository.getGroupMembers(groupId);
    
    console.log("Members:", members); //
     
    const memberIds = members.map((m) => m.userId);

    console.log("Member IDs:", memberIds);
    console.log("Paid By:", paidBy);
    console.log("Participants:", participants);

    if(!memberIds.includes(paidBy)){
        throw new BadRequestError("Payer must be a group member");
    }

    if(!participants.length){
        throw new BadRequestError("Expense must have at least one participant");
    }

    for(const participant of participants){
        if(!memberIds.includes(participant.userId)) {
            throw new BadRequestError(
                `User ${participant.userId} is not in this group`
            );
        }
    }

    const totalShares = participants.reduce(
        (sum, participant) => sum + Number(participant.shareAmount), 0
    );

    if(totalShares !== Number(totalAmount)){
        throw new BadRequestError("Total shares must equal total amount");
    }

    return expenseRepository.createExpense(
        {
            description,
            totalAmount,
            groupId: Number(groupId),
            paidBy,
        },
        participants
    );
};

const calculateBalances = async (groupId, userId) => {
    const group = await groupRepository.getGroupById(groupId);

    if(!group){
        throw new NotFoundError("Group not found");
    }

    const membership = await groupRepository.findMembership(
        groupId,
        userId
    );

    if(!membership){
        throw new ForbiddenError("You are not a member of this group");
    }

    const expenses = await expenseRepository.getGroupExpenses(groupId);

    const balances = {};

    for(const expense of expenses){
        if(!balances[expense.paidBy]){
            balances[expense.paidBy] = {
                userId: expense.paidBy,
                name: expense.payer.name,
                balance: 0,
            };
        }

        balances[expense.paidBy].balance += Number(expense.totalAmount);

        for(const participant of expense.participants){
            if(!balances[participant.userId]){
                balances[participant.userId] = {
                    userId: participant.user.id,
                    name: participant.user.name,
                    balance: 0,
                };
            }

            balances[participant.userId].balance -= Number(participant.shareAmount);
        }
    }
    return Object.values(balances);
};

const calculateSettlements = async (groupId, userId) => {
    const balance = await calculateBalances(groupId, userId);

    const creditors = [];
    const debtors = [];

    for(const person of balance){
        if(person.balance > 0){
            creditors.push({
                ...person,
            });
        } else if(person.balance < 0){
            debtors.push({
                ...person,
                balance: Math.abs(person.balance),
            });
        }
    }

    const settlements = [];
    let i = 0;
    let j = 0;
    while(
        i < debtors.length && 
        j < creditors.length
    ) {
        const debtor = debtors[i];
        const creditor = creditors[j];
        
        const amount = Math.min(
            debtor.balance,
            creditor.balance
        );

        settlements.push({
            from: {
                userId: debtor.userId,
                name: debtor.name,
            },

            to: {
                userId: creditor.userId,
                name: creditor.name,
            },
            amount,
        });

        debtor.balance -= amount;
        creditor.balance -= amount;

        if(debtor.balance === 0){
            i++;
        }

        if(creditor.balance === 0){
            j++;
        }
    }
    return settlements;
}

const getGroupExpenses = async (groupId, userId) => {
    const group = await groupRepository.getGroupById(groupId);

    if (!group) {
        throw new NotFoundError("Group not found");
    }

    const membership = await groupRepository.findMembership(
        groupId,
        userId
    );

    if (!membership) {
        throw new ForbiddenError(
            "You are not a member of this group"
        );
    }

    return expenseRepository.getGroupExpenses(groupId);
};

module.exports = {
    createExpense,
    calculateBalances,
    calculateSettlements,
    getGroupExpenses,
};