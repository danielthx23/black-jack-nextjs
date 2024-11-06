"use client";

// Importações dos componentes e funções auxiliares necessárias para o Blackjack
import GameControls from '@/components/controls/controls.component'; // Controles do jogo (botoes para ações do jogador)
import Hand from '@/components/hand/hand.component'; // Exibição das cartas e pontuação da mão (jogador ou dealer)
import Loader from '@/components/loader/loader.component'; // Componente de carregamento
import { drawCards, getDeckAndSuffle } from '@/services/deck-api.service'; // Funções de chamada da API de cartas
import { Card } from '@/types/card.type'; // Tipo que representa uma carta
import { updateScore } from '@/utils/blackjack.util'; // Função para calcular o valor de uma carta no jogo
import { useRouter } from 'next/navigation'; // Roteamento para navegação programática
import React, { useState, useEffect, useCallback } from 'react'; // Hooks do React para estados, efeitos, e callbacks

const BlackjackPage = () => {
  // Estados do jogo
  const [deckId, setDeckId] = useState<string | null>(null); // ID do baralho
  const [playerCards, setPlayerCards] = useState<Card[]>([]); // Cartas do jogador
  const [dealerCards, setDealerCards] = useState<Card[]>([]); // Cartas do dealer
  const [playerScore, setPlayerScore] = useState(0); // Pontuação do jogador
  const [dealerScore, setDealerScore] = useState(0); // Pontuação do dealer
  const [isGameOver, setIsGameOver] = useState(false); // Estado do jogo (terminado ou não)
  const [isLoading, setIsLoading] = useState(false); // Indicador de carregamento
  const [dealerTurnInProgress, setDealerTurnInProgress] = useState(false); // Turno do dealer em andamento
  const router = useRouter(); // Hook para roteamento

  // Inicializa o jogo ao embaralhar um novo baralho e resetar o estado do jogo
  const initializeGame = async () => {
    setIsLoading(true);
    const data = await getDeckAndSuffle(); // Chama API para obter e embaralhar um novo baralho
    setDeckId(data.deck_id); // Define o ID do novo baralho
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerScore(0);
    setDealerScore(0);
    setIsGameOver(false);
    setDealerTurnInProgress(false);
    setIsLoading(false);
  };

  // Função para puxar uma carta da API e retornar a primeira carta retirada
  const drawCard = useCallback(async () => {
    if (!deckId) return;
    setIsLoading(true);
    const cards = await drawCards(deckId, 1); // Puxa uma carta do baralho com o ID armazenado
    setIsLoading(false);
    return cards[0]; // Retorna a primeira carta
  }, [deckId]);

  // Jogador puxa uma carta e atualiza seu estado
  const onPlayCardDraw = async () => {
    if (!deckId || isGameOver || dealerTurnInProgress || isLoading) return;
    const card = await drawCard();
    if (card) {
      setPlayerCards([...playerCards, card]); // Adiciona carta ao array de cartas do jogador
      const score = updateScore([...playerCards, card]); // Calcula nova pontuação do jogador
      setPlayerScore(score);
      if (score > 21) { // Se a pontuação passar de 21, é a vez do dealer
        dealerTurn();
      }
    }
  };

  // Lógica do turno do dealer, puxando cartas até alcançar uma pontuação de 17 ou mais
  const dealerTurn = useCallback(async () => {
    setDealerTurnInProgress(true);
    let score = 0;
    
    while (score < 17 && !isGameOver) { // Dealer puxa cartas até ter pelo menos 17 pontos
      const card = await drawCard();
      if (!card) break;
      setDealerCards((dealerCards) => {
        const newDealerCards = [...dealerCards, card];
        score = updateScore([...dealerCards, card]);
        return newDealerCards;
      });
    }

    setDealerScore(score); // Define a pontuação final do dealer
    setDealerTurnInProgress(false);
    setIsGameOver(true); // Marca o fim do jogo
  }, [isGameOver, drawCard]);

  // Hook de efeito que verifica o token de autenticação e inicializa o jogo
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Se não houver token, redireciona para a página de login
    }
    initializeGame();
  }, [router]);

  // Função para logout, removendo o token de autenticação
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login'); // Redireciona para o login após o logout
  };

  // Renderização do componente BlackjackPage
  return (
    <div className="text-center">
      {isLoading ? ( // Exibe o Loader enquanto está carregando
        <Loader />
      ) : (
        <>
          <div className="flex justify-around mb-4 items-stretch min-h-[200px] gap-4">
            <Hand title="Jogador" cards={playerCards} score={playerScore} /> {/* Mão do jogador */}
            <Hand title="Dealer" cards={dealerCards} score={dealerScore} /> {/* Mão do dealer */}
          </div>
          <GameControls 
            onHit={() => onPlayCardDraw()} // Jogador escolhe puxar carta
            onStand={dealerTurn} // Jogador escolhe ficar
            onReset={initializeGame} // Reset do jogo
            isGameOver={isGameOver} // Estado de fim de jogo
          />
          <button onClick={() => logout()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
            Logout {/* Botão para logout */}
          </button>
        </>
      )}
    </div>
  );
};

export default BlackjackPage;
