export const useFileSize = (file) => {
    let base64 = file?.base_64;
    const type = base64?.split(";")[0]?.split(":")[1];
    let y = base64[base64?.length - 2] === "=" ? 2 : 1;
    const size = base64?.length * (3 / 4) - y;
    const sizeInMB = size / (1024 * 1024);
    return { size: size, sizeInMB: sizeInMB, type: type };
};

export const useImageSize = (file) => {
    let base64 = file?.image;
    const type = base64?.split(";")[0]?.split(":")[1];
    let y = base64[base64?.length - 2] === "=" ? 2 : 1;
    const size = base64?.length * (3 / 4) - y;
    const sizeInMB = size / (1024 * 1024);
    return { size: size, sizeInMB: sizeInMB, type: type };
};
