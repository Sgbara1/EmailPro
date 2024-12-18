// Validates email content
export class EmailValidator {
  validateEmail(emailContent) {
    if (!emailContent?.content) {
      throw new Error('No email content found');
    }

    if (!emailContent?.from) {
      throw new Error('Sender information missing');
    }

    return true;
  }
}