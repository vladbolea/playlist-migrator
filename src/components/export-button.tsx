import { motion } from 'framer-motion';
import { FC, useState } from 'react';

const ExportButton: FC<{
  searchFocus: boolean;
  tracksCount: number;
  handleExport: () => void;
}> = ({ tracksCount, handleExport, searchFocus }) => {
  return (
    <motion.button
      layout
      animate={{ opacity: searchFocus ? 0 : 1, y: searchFocus ? 100 : 0 }}
      transition={{
        ease: 'easeInOut',
        // layout: { duration: 0.2 },
        duration: 0.2,
      }}
      onClick={handleExport}
      disabled={tracksCount === 0}
      className="fixed right-10 bottom-10 h-16 w-[290px] rounded-xl bg-green-500 text-lg font-bold transition-all hover:rounded-3xl hover:bg-green-400 disabled:bg-slate-600"
    >
      Export Playlists ({tracksCount} tracks)
    </motion.button>
  );
};

export default ExportButton;
