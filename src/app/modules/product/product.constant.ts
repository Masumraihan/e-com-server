export const productStatus = {
  IN_STOCK: 'in stock',
  OUT_OF_STOCK: 'out of stock',
} as const;

export const productSearchableFields = ['title', 'description', 'keywords.value', 'size', 'color'];
