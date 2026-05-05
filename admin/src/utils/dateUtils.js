/**
 * Format a date string to dd-mm-yyyy
 * @param {string} dateStr - Date string (ISO or yyyy-mm-dd)
 * @returns {string} Formatted date in dd-mm-yyyy
 */
export const formatDate = (dateInput) => {
    if (!dateInput) return '';
    // Handle Firestore Timestamp
    const d = dateInput.toDate ? dateInput.toDate() : new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

/**
 * Format a date input to dd-mm-yyyy hh:mm
 * @param {string|object} dateInput - Date string or Firestore Timestamp
 * @returns {string} Formatted datetime in dd-mm-yyyy hh:mm
 */
export const formatDateTime = (dateInput) => {
    if (!dateInput) return '';
    // Handle Firestore Timestamp
    const d = dateInput.toDate ? dateInput.toDate() : new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
};
/**
 * Format a Date object to yyyy-mm-dd (Local Time)
 * @param {Date} d 
 * @returns {string} yyyy-mm-dd
 */
export const toISODate = (dateInput) => {
    if (!dateInput) return null;
    const d = dateInput.toDate ? dateInput.toDate() : new Date(dateInput);
    if (isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
