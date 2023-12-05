function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function getLegibleTextColor(bgColor: string): string {
    const rgb = parseInt(bgColor.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
  
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
    const randomHue = Math.floor(Math.random() * 360);
  
    const textColor = luminance > 0.5 ? `hsl(${randomHue}, 100%, 30%)` : `hsl(${randomHue}, 100%, 80%)`;
  
    return textColor;
  }
  
  export function generateProfileImage(username: string): { dataURL: string; imageFile: File } | null {
    if (!username) return null;
  
    const firstLetter = username.charAt(0).toUpperCase();
    const bgColor = getRandomColor();
    const textColor = getLegibleTextColor(bgColor);
  
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
  
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = bgColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      context.font = '48px Arial';
      context.fillStyle = textColor;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(firstLetter, canvas.width / 2, canvas.height / 2);
  
      const dataURL = canvas.toDataURL('image/png');
      const imageFile = dataURLtoFile(dataURL, 'profile.png');
  
      return { dataURL, imageFile };
    } else {
      throw new Error('Canvas context is not supported.');
    }
  }
  
  function dataURLtoFile(dataURL: string, filename: string): File {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  
  
