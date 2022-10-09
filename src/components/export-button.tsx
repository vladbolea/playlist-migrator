import { FC } from 'react';

const ExportButton: FC<{ tracksCount: number; handleExport: () => void }> = ({
  tracksCount,
  handleExport,
}) => {
  return (
    <>
      <button
        onClick={handleExport}
        disabled={tracksCount === 0}
        className="fixed right-10 bottom-10 h-16 w-[290px] rounded-xl bg-green-500 text-lg font-bold transition-all hover:rounded-3xl hover:bg-green-400 disabled:bg-slate-600"
      >
        Export Playlists ({tracksCount} tracks)
      </button>
    </>
  );
};

export default ExportButton;
