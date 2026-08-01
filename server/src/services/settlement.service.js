const settlementRepository = require("../repositories/settlement.repository");
const groupRepository = require("../repositories/group.repository");

const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const BadRequestError = require("../errors/BadRequestError");

const recordSettlement = async (groupId, requesterId, settlementData) => {
    const { payerId, receiverId, amount } = settlementData;

    // Check group exists
    const group = await groupRepository.getGroupById(groupId);

    if (!group) {
        throw new NotFoundError("Group not found");
    }

    // Check requester belongs to group
    const requesterMembership = await groupRepository.findMembership(
        groupId,
        requesterId
    );

    if (!requesterMembership) {
        throw new ForbiddenError(
            "You are not a member of this group"
        );
    }

    // Check payer belongs to group
    const payerMembership = await groupRepository.findMembership(
        groupId,
        payerId
    );

    if (!payerMembership) {
        throw new BadRequestError(
            "Payer is not a member of this group"
        );
    }

    // Check receiver belongs to group
    const receiverMembership = await groupRepository.findMembership(
        groupId,
        receiverId
    );

    if (!receiverMembership) {
        throw new BadRequestError(
            "Receiver is not a member of this group"
        );
    }

    if (payerId === receiverId) {
        throw new BadRequestError(
            "Payer and receiver cannot be the same"
        );
    }

    return settlementRepository.createSettlement({
        groupId: Number(groupId),
        payerId,
        receiverId,
        amount,
    });
};

const getSettlementHistory = async (groupId, requesterId) => {
    const group = await groupRepository.getGroupById(groupId);

    if (!group) {
        throw new NotFoundError("Group not found");
    }

    const membership = await groupRepository.findMembership(
        groupId,
        requesterId
    );

    if (!membership) {
        throw new ForbiddenError(
            "You are not a member of this group"
        );
    }

    return settlementRepository.getSettlementHistory(groupId);
};

module.exports = {
    recordSettlement,
    getSettlementHistory,
};