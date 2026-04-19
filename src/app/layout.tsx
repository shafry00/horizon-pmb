import { ReactNode } from "react";
import "./globals.css";
type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return children;
}
