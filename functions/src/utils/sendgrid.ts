import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

export const sendEmail = (data: {
  to: string;
  templateId: string;
  dynamicTemplateData: { [key: string]: any };
}) => {
  const msg = {
    to: data.to,
    from: 'ssktty514@gmail.com',
    templateId: data.templateId,
    dynamicTemplateData: data.dynamicTemplateData,
  };
  return sgMail.send(msg);
};
