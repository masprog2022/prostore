import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/users.actions";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
//import ShippingAddressForm from './shipping-address-form';
import CheckoutSteps from "@/components/product/checkout-steps";
import ShippingAddressForm from "./shipping-address-form";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/cart");
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("No user ID");

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
