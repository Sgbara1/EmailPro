// Handles email content parsing
export class EmailParser {
  parseEmail(emailContent) {
    const {content, subject, from, to} = emailContent;
    
    return {
      content: this.cleanContent(content),
      metadata: {
        subject,
        from,
        to,
        timestamp: new Date().toISOString()
      }
    };
  }

  cleanContent(content) {
    return content
      .trim()
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+$/gm, '');
  }
}