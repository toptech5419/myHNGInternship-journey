import html2canvas from 'html2canvas';

export const downloadTicket = async (ticketRef) => {
  try {
    const canvas = await html2canvas(ticketRef.current);
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'techember-ticket.png';
    link.click();
  } catch (error) {
    console.error('Error downloading ticket:', error);
  }
};