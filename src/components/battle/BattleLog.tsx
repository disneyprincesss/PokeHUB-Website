import { ScrollArea } from "../ui/scroll-area";

interface BattleLogProps {
  battleLog: string[];
}

export default function BattleLog({ battleLog }: BattleLogProps) {
  return (
    <div>
      <div className="font-bold text-[#2c5234] mb-1 text-sm">Log:</div>
      <ScrollArea className="bg-[#fff8dcf2] border-2 border-[#8B4513] rounded-lg p-2 h-[100px] text-xs text-[#2c5234] font-mono ">
        {battleLog.length === 0 ? (
          <div>• Battle begins!</div>
        ) : (
          battleLog.slice(0, 4).map((log, idx) => (
            <div key={idx} className="mb-1">
              • {log}
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
