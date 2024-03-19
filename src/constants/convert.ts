export function base64(file: File | undefined): Promise<string | undefined> {
    return new Promise((resolve) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      } else {
        resolve(undefined);
      }
    });
  }
  