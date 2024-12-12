/**
 * Custom wrapper for react-toastify to display toasts with dynamic durations.
 * Automatically calculates the toast's duration based on the message length.
 * @method success - Displays a success toast.
 * @method warning - Displays a warning toast.
 * @method error - Displays an error toast.
 * @method info - Displays an informational toast.
 *
 * @param {string} message - The message to display in the toast.
 * @param {Object} [options={}] - Additional options for the toast (e.g., position, theme).
 * @returns {void}
 *
 * @example
 * customToast.success("Operation successful!");
 */

import { toast } from "react-toastify";

const calculateDuration = (message) => {
    return Math.min(Math.max(message.length * 50, message.length < 20 ? 2000 : 3200), 15000);
};

const customToast = {
    success: (message, options = {}) => {
        toast.success(message, {
            autoClose: calculateDuration(message),
            ...options,
        });
    },
    warning: (message, options = {}) => {
        toast.warning(message, {
            autoClose: calculateDuration(message),
            ...options,
        });
    },
    error: (message, options = {}) => {
        toast.error(message, {
            autoClose: calculateDuration(message),
            ...options,
        });
    },
    info: (message, options = {}) => {
        toast.info(message, {
            autoClose: calculateDuration(message),
            ...options,
        });
    },
};

export default customToast;
