import { useState, useEffect } from "react";

export const useImageFileType = (initialFileType) => {
    const [fileType, setFileType] = useState(initialFileType);

    const getFileType = (value) => {
        if (value !== "DELETE" && value !== "" && value !== null && value !== undefined) {
            const base64Arr = value?.split(",");
            setFileType(base64Arr[0]?.match(/:(.*?);/)[1]?.split("/")[0] ?? "image");
        } else {
            setFileType("image");
        }
    };

    useEffect(() => {
        getFileType(initialFileType);
    }, [initialFileType]);

    return { fileType };
};
