import { ReactElement,JSXElementConstructor,ReactNode,ReactPortal } from "react";

export interface Product {
    id: number;
    name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
    price: number;
    category:string;
  }

export interface CartItem extends Product {
    quantity: number
}
