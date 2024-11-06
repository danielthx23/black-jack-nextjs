interface GameControlsProps {
  onHit: () => void;
  onStand: () => void;
  onReset: () => void;
  isGameOver: boolean;
}

const GameControls = ({ onHit, onStand, onReset, isGameOver }: GameControlsProps) => (
  <div className="flex justify-center gap-4 mt-4">
    {!isGameOver ? (
      <>
        <button onClick={onHit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Pedir Carta
        </button>
        <button onClick={onStand} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Parar
        </button>
      </>
    ) : (
      <button onClick={onReset} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Reiniciar Jogo
      </button>
    )}
  </div>
);

export default GameControls;