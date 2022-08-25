/**
 * Convert file blob to data.
 *
 * @param {Blob} file The original file.
 * @return {Promise<string>} File converted to Data URL.
 */
export const blobToData = (file: Blob) =>
  new Promise(resolve => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })

/**
 * Rotate a two-dimensional matrix by 90 degrees by swapping the first and the second indices between each other.
 *
 * @param {[][]} originalMatrix The two-dimensional matrix to rotate.
 *
 * @return {[][]} The rotated matrix.
 */
export function rotateMatrix(originalMatrix) {
  const rotatedMatrix = []

  // Go over the first dimension
  for (const key1 in originalMatrix) {
    if (originalMatrix.hasOwnProperty(key1)) {

      // Go over the second dimension
      for (const key2 in originalMatrix[key1]) {
        if (originalMatrix[key1].hasOwnProperty(key2)) {
          rotatedMatrix[key2] = rotatedMatrix[key2] ?? []

          // Create a copy with the swapped indices
          rotatedMatrix[key2][key1] = originalMatrix[key1][key2]
        }
      }
    }
  }

  return rotatedMatrix
}
