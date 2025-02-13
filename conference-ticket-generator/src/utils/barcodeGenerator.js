export const generateBarcodeId = () => {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  };
  
  export const generateBarcodePattern = (id) => {
    // Convert ID to binary-like pattern for visual representation
    return id.toString().split('').map(num => 
      parseInt(num) > 5 ? 'L' : 'S'
    ).join('');
  };