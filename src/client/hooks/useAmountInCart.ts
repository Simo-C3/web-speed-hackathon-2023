import { useAuthUser } from './useAuthUser';

export const useAmountInCart = (productId: number) => {
  const { authUser, authUserLoading, isAuthUser } = useAuthUser();

  const order = authUser?.orders.find((order) => order.isOrdered === false);
  const shoppingCartItems = order?.items ?? [];
  const amountInCart = shoppingCartItems.find((item) => item.product.id === productId)?.amount ?? 0;

  return { amountInCart, authUser, authUserLoading, isAuthUser };
};
