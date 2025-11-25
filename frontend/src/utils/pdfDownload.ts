/**
 * Utilidad para descargar archivos PDF desde cadenas Base64
 */

/**
 * Descarga un archivo PDF desde una cadena codificada en Base64
 * @param base64String - La cadena PDF codificada en Base64
 * @param filename - El nombre de archivo deseado para la descarga
 */
export function downloadPdfFromBase64(
  base64String: string,
  filename: string
): void {
  try {
    // Decodificar base64 a cadena binaria
    const byteCharacters = atob(base64String);

    // Convertir a arreglo de bytes
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Crear Blob con tipo mime PDF
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Crear URL temporal
    const url = window.URL.createObjectURL(blob);

    // Crear enlace invisible y disparar descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Limpieza
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw new Error('Error al descargar el archivo PDF');
  }
}
