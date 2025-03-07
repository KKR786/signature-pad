class SignatureService {
    saveSignature(dataUrl: string, format: 'png' | 'jpg'): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
            if (!dataUrl) {
              throw new Error('No signature data available.');
            }
    
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `signature.${format}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            resolve();
          } catch (error) {
            console.error('Error saving signature:', error);
            reject(error);
          }
      });
    }
  }
  
  export default new SignatureService();