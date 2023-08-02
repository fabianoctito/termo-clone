export function removerPrimeiraOcorrencia(array, elementoParaRemover) {
    const indice = array.indexOf(elementoParaRemover);
    if (indice !== -1) {
      array.splice(indice, 1);
    }
  }

  