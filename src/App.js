import { React, useState } from "react";
import { useEffect } from 'react';
import './Components/StyleGlobal.css';
import Letra from './Components/Letra';
import { removerPrimeiraOcorrencia } from './Components/utils/functions.js'

const App = () => {
  const [palavraDaVez, setPalavraDaVez] = useState('CARTA')
  const [linhaVez, setLinhaVez] = useState(1)
  const [tabela, setTabela] = useState(Array(5).fill(false).map(() => Array(5).fill(null)))
  const [tabelaStyle, setTabelaStyle] = useState(Array(25).fill({ estilo: {} }))

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleEnter();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const handleEnter = async () => {
    // Verifica se tem alguma célula da linha atual que é nula; se não houver, vai para a verificação da palavra
    let verifNulo = (tabela[linhaVez - 1].some((e) => { return e == null }))
    if (!verifNulo) {
      console.log(linhaVez)
      let palavraAtual = tabela[linhaVez - 1].join('')
      const res = await fetch(`https://api.dicionario-aberto.net/near/${(palavraAtual)}`);
      var data = await res.json();

      let indice = data.findIndex((a) => { return a.normalize('NFD').replace(/[\u0300-\u036f]/g, "") == palavraAtual })

      if (indice != -1) {
        handlePalavraAceita(data[indice].toUpperCase())
        setLinhaVez(prev => prev += 1)
      }
    }
  }

  const handlePalavraAceita = (palavraAceita) => {
    if (palavraAceita.normalize('NFD').replace(/[\u0300-\u036f]/g, "") == palavraDaVez) {
      let estiloVenc = [...tabelaStyle]
      for (let i = 0; i < 5; i++) {
        estiloVenc[linhaVez * 5 - 5 + i].estilo = { 'backgroundColor': 'green' }
      }
      setTabelaStyle(estiloVenc)
      alert("eba acertou")
    }

    else {
      let estiloVenc = [...tabelaStyle]
      let refPalavra = (Array(5))
      let arrayPalavraAceita = palavraAceita.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split('')
      let arrayPalavraDaVez = palavraDaVez.split('')
      let arrayControle = [...arrayPalavraDaVez]
      let contE = -1;

      arrayPalavraDaVez.forEach(e => {
        contE++
        let contI = -1;
        arrayPalavraAceita.forEach(i => {
          contI++

          if (e == i) {
            if (contE != contI && refPalavra[contI] == null && !(refPalavra.some((x) => { return x == contE })) && arrayControle.filter(x => x == e).length >= 1) {
              estiloVenc[linhaVez * 5 - 5 + contI] = {
                estilo: { 'backgroundColor': 'orange' },
                cor: 'orange',
              }
              setTabelaStyle(estiloVenc)
              refPalavra[contI] = contE
              removerPrimeiraOcorrencia(arrayControle, e)

            }

            else if (contI == contE) {
              estiloVenc[linhaVez * 5 - 5 + contI] = {
                estilo: { 'backgroundColor': 'green' },
              }
              if (refPalavra.some((x) => { return x == contE })) estiloVenc[linhaVez * 5 - 5 + refPalavra.some((x) => { if (x == contE) return (refPalavra.indexOf(x)) }) + 1].estilo = { 'backgroundColor': '' }
              setTabelaStyle(estiloVenc)
              refPalavra[contE] = contE
              removerPrimeiraOcorrencia(arrayControle, e)
            }
          }
        })
      });
    }
  }

  const handleLetra = (e) => {
    let letraAtual = e.target.value;
    let linhaAtual = linhaVez - 1;
    let classeAtual = e.target.className

    e.target.value = letraAtual.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/gi, '').trim()

    if (classeAtual == 'c1') {
      let jogada = [...tabela]
      jogada[linhaAtual][0] = letraAtual
      setTabela(jogada)
    }

    if (classeAtual == 'c2') {
      let jogada = [...tabela]
      jogada[linhaAtual][1] = letraAtual
      setTabela(jogada)
    }

    if (classeAtual == 'c3') {
      let jogada = [...tabela]
      jogada[linhaAtual][2] = letraAtual
      setTabela(jogada)
    }

    if (classeAtual == 'c4') {
      let jogada = [...tabela]
      jogada[linhaAtual][3] = letraAtual
      setTabela(jogada)
    }

    if (classeAtual == 'c5') {
      let jogada = [...tabela]
      jogada[linhaAtual][4] = letraAtual
      setTabela(jogada)
    }
  }

  return (
    <>
      <main>
        <div id="linha1" onChange={(e) => { handleLetra(e) }}>
          <Letra disabled={linhaVez - 1} class='c1' id='l1-c1' style={tabelaStyle[0].estilo} />
          <Letra disabled={linhaVez - 1} class='c2' id='l1-c2' style={tabelaStyle[1].estilo} />
          <Letra disabled={linhaVez - 1} class='c3' id='l1-c3' style={tabelaStyle[2].estilo} />
          <Letra disabled={linhaVez - 1} class='c4' id='l1-c4' style={tabelaStyle[3].estilo} />
          <Letra disabled={linhaVez - 1} class='c5' id='l1-c5' style={tabelaStyle[4].estilo} />
        </div>

        <div id="linha2" onChange={(e) => { handleLetra(e) }}>
          <Letra disabled={linhaVez - 2} class='c1' id='l2-c1' style={tabelaStyle[5].estilo} />
          <Letra disabled={linhaVez - 2} class='c2' id='l2-c2' style={tabelaStyle[6].estilo} />
          <Letra disabled={linhaVez - 2} class='c3' id='l2-c3' style={tabelaStyle[7].estilo} />
          <Letra disabled={linhaVez - 2} class='c4' id='l2-c4' style={tabelaStyle[8].estilo} />
          <Letra disabled={linhaVez - 2} class='c5' id='l2-c5' style={tabelaStyle[9].estilo} />
        </div>

        <div id="linha3" onChange={(e) => { handleLetra(e) }}>
          <Letra disabled={linhaVez - 3} class='c1' id='l3-c1' style={tabelaStyle[10].estilo} />
          <Letra disabled={linhaVez - 3} class='c2' id='l3-c2' style={tabelaStyle[11].estilo} />
          <Letra disabled={linhaVez - 3} class='c3' id='l3-c3' style={tabelaStyle[12].estilo} />
          <Letra disabled={linhaVez - 3} class='c4' id='l3-c4' style={tabelaStyle[13].estilo} />
          <Letra disabled={linhaVez - 3} class='c5' id='l3-c5' style={tabelaStyle[14].estilo} />
        </div>

        <div id="linha4" onChange={(e) => { handleLetra(e) }}>
          <Letra disabled={linhaVez - 4} class='c1' id='l4-c1' style={tabelaStyle[15].estilo} />
          <Letra disabled={linhaVez - 4} class='c2' id='l4-c2' style={tabelaStyle[16].estilo} />
          <Letra disabled={linhaVez - 4} class='c3' id='l4-c3' style={tabelaStyle[17].estilo} />
          <Letra disabled={linhaVez - 4} class='c4' id='l4-c4' style={tabelaStyle[18].estilo} />
          <Letra disabled={linhaVez - 4} class='c5' id='l4-c5' style={tabelaStyle[19].estilo} />
        </div>

        <div id="linha4" onChange={(e) => { handleLetra(e) }}>
          <Letra disabled={linhaVez - 5} class='c1' id='l5-c1' style={tabelaStyle[20].estilo} />
          <Letra disabled={linhaVez - 5} class='c2' id='l5-c2' style={tabelaStyle[21].estilo} />
          <Letra disabled={linhaVez - 5} class='c3' id='l5-c3' style={tabelaStyle[22].estilo} />
          <Letra disabled={linhaVez - 5} class='c4' id='l5-c4' style={tabelaStyle[23].estilo} />
          <Letra disabled={linhaVez - 5} class='c5' id='l5-c5' style={tabelaStyle[24].estilo} />
        </div>
      </main>
    </>
  );
};

export default App;
