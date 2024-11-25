import type { Metadata } from "next";
import "./globals.css";
import { MyContextProvider, useMyContext } from "./Context/MyContextProvider";
import ToasterContext from "./Context/ToastContext";


export const metadata: Metadata = {
  title: "CMS ",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MyContextProvider>
          <ToasterContext/>
            {children}
        </MyContextProvider>
      </body>
    </html>
  );
}
