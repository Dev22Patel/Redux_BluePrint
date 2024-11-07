import { ReactElement,JSXElementConstructor,ReactNode,ReactPortal } from "react";

export interface Product {
    title: string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined;
    id: number;
    price: number;
    category:ReactNode;
  }

export interface CartItem extends Product {
    quantity: number
}
