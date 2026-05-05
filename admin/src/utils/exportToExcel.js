import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Format the file name with current date
    const dateStr = new Date().toISOString().split('T')[0];
    const finalFileName = `${fileName}_${dateStr}.xlsx`;

    XLSX.writeFile(wb, finalFileName);
};
