import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SENDGRID_API_KEY not configured. Email features will not work.');
}

export const emailService = {
  send: async (to: string, subject: string, html: string, text?: string) => {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('Email not sent: SENDGRID_API_KEY not configured');
      return;
    }

    try {
      await sgMail.send({
        to,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@psychology-practice.com',
        subject,
        text,
        html,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },
};

