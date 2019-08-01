import { adjective, noun } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = (): string => {
  const randomNumber = Math.floor(Math.random() * adjective.length);
  return `${adjective[randomNumber]} ${noun[randomNumber]}`;
};

const nodemailerOptions = {
  auth: {
    api_user: process.env.SENDGRID_USERNAME,
    api_key: process.env.SENDGRID_PASSWORD
  }
};

const client = nodemailer.createTransport(sgTransport(nodemailerOptions));

export const sendSecret = async (
  email: string,
  secret: string
): Promise<void> => {
  const sendedMail = {
    from: "wontalk",
    to: email,
    subject: "📌원톡 시크릿 키📌",
    html: `원톡 시크릿키 입니다 👉 <strong>${secret}</strong>`
  };
  client.sendMail(sendedMail);
};

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!);
};
