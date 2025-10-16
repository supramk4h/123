
export const generateId = (prefix: string, lastId: string): string => {
  const lastNumber = parseInt(lastId.split('-')[1], 10);
  const newNumber = lastNumber + 1;
  return `${prefix}-${String(newNumber).padStart(4, '0')}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
