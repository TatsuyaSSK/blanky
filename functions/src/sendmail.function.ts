import * as functions from 'firebase-functions';
import { sendEmail } from './utils/sendgrid';

export const welcomeEmail = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    if (user.email) {
      return sendEmail({
        to: user.email,
        templateId: 'd-b8d37070fbbe468398d4b91ab6aa089c',
        dynamicTemplateData: {
          subject: 'blankyへようこそ！',
          name: user.displayName,
        },
      });
    } else {
      return null;
    }
  });
