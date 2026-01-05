export const COMPLAINT_STEPS = [
    { id: 'Submitted', label: 'Submitted', role: 'admin' },
    { id: 'Assigned', label: 'Assigned to Dept', role: 'admin' },
    { id: 'In Progress', label: 'In Progress', role: 'admin' },
    { id: 'Awaiting Approval', label: 'Awaiting Approval', role: 'admin' }, // Only Admin can move TO here (from In Progress)
    { id: 'Resolved', label: 'Resolved', role: 'gov_admin' } // Only Gov Admin can move TO here
];

export const getNextStatus = (currentStatus) => {
    const currentIndex = COMPLAINT_STEPS.findIndex(s => s.id === currentStatus);
    if (currentIndex === -1 || currentIndex >= COMPLAINT_STEPS.length - 1) return null;
    return COMPLAINT_STEPS[currentIndex + 1];
};
