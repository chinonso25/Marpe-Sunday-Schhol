import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportPdf = async () => {
  const element = document.getElementById('hi'); // ID of your element
  const canvas = await html2canvas(element);
  const data = canvas.toDataURL('image/jpeg', 0.75);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });

  pdf.addImage(data, 'JPEG', 0, 0, canvas.width, canvas.height);

  // Convert PDF to Blob and append to FormData
  const pdfBlob = pdf.output('blob')
  const formData = new FormData();
  formData.append('pdf-file', pdfBlob, 'download.pdf');

  // Send the PDF
  sendPdf(formData);

};

export async function sendPdf(formData: FormData) {
  try {
    const response = await fetch('/api/Attendance', {
      method: 'post',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }
    const responseData = await response.json();

    alert('Form successfully sent');
  } catch (err) {
    console.error(err);
    alert("Error, please try resubmitting the form");
  }
};