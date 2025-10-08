import { SquareX } from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import type { PokemonDetails } from "@/types/pokemon";
import { apiService } from "@/services/api";
import { useEffect, useState } from "react";

interface PokemonInfoProps {
  pokemon: PokemonDetails | null;
  setIsCardOpen: (open: boolean) => void;
  setSelectedPokemon: (pokemon: PokemonDetails | null) => void;
}

export default function PokemonInfo({
  pokemon,
  setIsCardOpen,
  setSelectedPokemon,
}: PokemonInfoProps) {
  const selectedPokemonType = pokemon?.types[0].type.name || "";
  const id = pokemon?.id;
  const [nickname, setNickname] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!id) return;
    
    let mounted = true;
    (async () => {
      try {
        const res = await apiService.getNickname(id);
        if (mounted) setNickname(res.data.nickname);
      } catch (e) {
        // ignore if endpoint not available or offline
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const startEdit = () => {
    setInput(nickname || "");
    setEditing(true);
    setError(null);
  };

  const save = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const trimmed = input.trim();
      if (trimmed.length === 0) {
        await apiService.deleteNickname(id);
        setNickname(null);
      } else {
        const res = await apiService.setNickname(id, trimmed);
        setNickname(res.data.nickname);
      }
      setEditing(false);
    } catch (e: any) {
      setError(e?.message || "Failed to save nickname");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card
      className={`bg-gradient-to-r ${
        selectedPokemonType == "grass"
          ? "from-[#009E51] to-[#88F6B0]"
          : selectedPokemonType == "fire"
          ? "from-[#CF5300] to-[#FFA46F]"
          : selectedPokemonType == "water"
          ? "from-[#0267DB] to-[#88B6F6]"
          : selectedPokemonType == "bug"
          ? "from-[#939E00] to-[#D3F688]"
          : selectedPokemonType == "electric"
          ? "from-[#DBB702] to-[#F6DC88]"
          : selectedPokemonType == "ice"
          ? "from-[#007D9E] to-[#88DFF6]"
          : selectedPokemonType == "poison"
          ? "from-[#6E009E] to-[#D588F6]"
          : selectedPokemonType == "fighting"
          ? "from-[#9E0003] to-[#F6888A]"
          : selectedPokemonType == "ground"
          ? "from-[#8E2C02] to-[#DB812D]"
          : selectedPokemonType == "psychic"
          ? "from-[#9E0064] to-[#F688E2]"
          : selectedPokemonType == "flying"
          ? "from-[#0D009E] to-[#8A88F6]"
          : selectedPokemonType == "ghost"
          ? "from-[#450167] to-[#A769FF]"
          : selectedPokemonType == "rock"
          ? "from-[#9E6600] to-[#F6C588]"
          : selectedPokemonType == "dragon"
          ? "from-[#022D69] to-[#7091FF]"
          : selectedPokemonType == "dark"
          ? "from-[#010101] to-[#4A4251]"
          : selectedPokemonType == "steel"
          ? "from-[#313030] to-[#B2B2B2]"
          : selectedPokemonType == "fairy"
          ? "from-[#9E004C] to-[#F688B6]"
          : selectedPokemonType == "normal"
          ? "from-[#A8A878] to-[#E0E0B0]"
          : ""
      } to-62% w-[95vw] max-w-6xl max-h-screen lg:h-[90vh] lg:max-h-170 absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto flex flex-col lg:flex-row`}
    >
      <div className="relative w-full">
        {selectedPokemonType != "normal" && (
          <img
            src={`/image/card-bg/${selectedPokemonType}-bg.png`}
            alt={`${selectedPokemonType} type`}
            className={`opacity-50 absolute h-50 left-0 right-20 mx-auto lg:right-0 lg:mx-0 sm:h-55 ${
              selectedPokemonType == "grass"
                ? "lg:bottom-15 lg:-left-10 lg:h-135"
                : selectedPokemonType == "fire"
                ? "lg:bottom-0 lg:-left-15 lg:h-160"
                : selectedPokemonType == "water"
                ? "lg:bottom-10 lg:-left-5 lg:h-130"
                : selectedPokemonType == "bug"
                ? "lg:bottom-15 lg:-left-3 lg:h-130"
                : selectedPokemonType == "electric"
                ? "lg:bottom-25 lg:left-0 lg:h-140"
                : selectedPokemonType == "ground"
                ? "lg:top-20 lg:left-0 lg:w-250 h-auto"
                : selectedPokemonType == "poison"
                ? "lg:top-0 lg:-left-5 lg:h-110"
                : selectedPokemonType == "fighting"
                ? "lg:top-0 lg:left-0 lg:h-110"
                : selectedPokemonType == "psychic"
                ? "lg:top-0 lg:-left-5 lg:h-115"
                : selectedPokemonType == "rock"
                ? "lg:top-10 lg:left-0 lg:h-120"
                : selectedPokemonType == "ghost"
                ? "lg:bottom-0 lg:-left-10 lg:h-160"
                : selectedPokemonType == "ice"
                ? "lg:top-10 lg:left-0 lg:h-110"
                : selectedPokemonType == "dragon"
                ? "lg:top-0 lg:left-0 lg:h-130"
                : selectedPokemonType == "flying"
                ? "lg:top-5 lg:left-0 lg:h-120"
                : selectedPokemonType == "dark"
                ? "lg:top-0 lg:-left-5 lg:h-120"
                : selectedPokemonType == "steel"
                ? "-lg:top-5 lg:left-0 lg:h-120"
                : selectedPokemonType == "fairy"
                ? "lg:top-15 lg:left-0 lg:h-100"
                : ""
            }`}
          />
        )}
        <img
          src={`${pokemon?.image ? pokemon.image : ""}`}
          alt={pokemon?.name}
          className={`z-10 mx-auto absolute right-0 h-40 sm:h-45 lg:h-100 ${
            selectedPokemonType == "normal"
              ? "lg:top-0 lg:bottom-0 lg:my-auto left-0 lg:right-0 "
              : "left-10 sm:left-25 top-12 lg:top-55 lg:left-40"
          } `}
        />
      </div>
      <div
        className={`w-full pb-5 lg:pb-0 flex flex-col justify-center items-center lg:items-start lg:justify-start px-0 absolute bottom-0 lg:static ${
          selectedPokemonType == "dark" ||
          selectedPokemonType == "ghost" ||
          selectedPokemonType == "steel"
            ? "text-zinc-200"
            : "text-zinc-800"
        } `}
      >
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-jersey font-bold uppercase tracking-wider text-shadow-[5px_5px_6px_rgba(0,0,0,0.5)] sm:text-shadow-[8px_8px_10px_rgba(0,0,0,0.5)] text-center lg:text-left z-10">
          {pokemon?.name}
        </h1>

        {/* Nickname Section */}
        <div className="mt-4 mb-6 flex flex-col items-center lg:items-start">
          {editing ? (
            <div className="flex flex-col items-center lg:items-start gap-2 w-full max-w-md">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={40}
                placeholder="Enter nickname (empty to clear)"
                className={`w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 ${
                  selectedPokemonType == "dark" ||
                  selectedPokemonType == "ghost" ||
                  selectedPokemonType == "steel"
                    ? "bg-zinc-800 border-zinc-600 text-zinc-200 focus:ring-zinc-400"
                    : "bg-white border-zinc-300 text-zinc-800 focus:ring-blue-500"
                }`}
                disabled={loading}
              />
              <div className="flex gap-2">
                <button 
                  onClick={save} 
                  disabled={loading} 
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button 
                  onClick={() => setEditing(false)} 
                  disabled={loading} 
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
              {error && <span className="text-sm text-red-500 font-medium">{error}</span>}
            </div>
          ) : (
            <div className="flex flex-col items-center lg:items-start gap-2">
              {nickname && (
                <div className={`text-2xl font-medium ${
                  selectedPokemonType == "dark" ||
                  selectedPokemonType == "ghost" ||
                  selectedPokemonType == "steel"
                    ? "text-zinc-200"
                    : "text-zinc-800"
                }`}>
                  "{nickname}"
                </div>
              )}
              <button 
                onClick={startEdit} 
                className={`text-lg font-medium underline hover:no-underline transition-all ${
                  selectedPokemonType == "dark" ||
                  selectedPokemonType == "ghost" ||
                  selectedPokemonType == "steel"
                    ? "text-zinc-300 hover:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-800"
                }`}
              >
                {nickname ? 'Edit nickname' : 'Add nickname'}
              </button>
            </div>
          )}
        </div>

        <Tabs defaultValue="about">
          <TabsList>
            <TabsTrigger
              value="about"
              className={`${
                selectedPokemonType == "dark" ||
                selectedPokemonType == "ghost" ||
                selectedPokemonType == "steel"
                  ? "text-zinc-200 border-b-zinc-200"
                  : ""
              }`}
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className={`${
                selectedPokemonType == "dark" ||
                selectedPokemonType == "ghost" ||
                selectedPokemonType == "steel"
                  ? "text-zinc-200 border-b-zinc-200"
                  : ""
              }`}
            >
              Base Stats
            </TabsTrigger>
            <TabsTrigger
              value="evolution"
              className={`${
                selectedPokemonType == "dark" ||
                selectedPokemonType == "ghost" ||
                selectedPokemonType == "steel"
                  ? "text-zinc-200 border-b-zinc-200"
                  : ""
              }`}
            >
              Evolution
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <div className="flex items-center">
              <h3>Species:</h3>
              <div className="ml-2 flex items-center">
                {pokemon?.types.map((t) => (
                  <Tooltip>
                    <TooltipTrigger>
                      <img
                        key={t.slot}
                        src={`/image/pokemon-type/${t.type.name}.png`}
                        alt={`${t.type.name} type`}
                        className="h-9 sm:h-10 mr-1"
                      />
                    </TooltipTrigger>
                    <TooltipContent>{t.type.name}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
            <div className="flex items-center flex-wrap">
              <h3>Abilities:</h3>
              <div className="ml-2 flex flex-wrap items-center">
                {pokemon?.abilities.map((a) => {
                  let abilityName = a.ability.name
                    .split(" ")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ");

                  let abilityColor = "";

                  if (selectedPokemonType == "grass") {
                    abilityColor = a.is_hidden
                      ? "bg-[#4B9A47]"
                      : "bg-[#65C85F]";
                  } else if (selectedPokemonType == "water") {
                    abilityColor = a.is_hidden
                      ? "bg-[#2671A1]"
                      : "bg-[#248BCD]";
                  } else if (selectedPokemonType == "fire") {
                    abilityColor = a.is_hidden
                      ? "bg-[#E66007]"
                      : "bg-[#FF823A]";
                  } else if (selectedPokemonType == "bug") {
                    abilityColor = a.is_hidden
                      ? "bg-[#8DA126]"
                      : "bg-[#B2C12C]";
                  } else if (selectedPokemonType == "electric") {
                    abilityColor = a.is_hidden
                      ? "bg-[#D4BD10]"
                      : "bg-[#F0CE24]";
                  } else if (selectedPokemonType == "ice") {
                    abilityColor = a.is_hidden
                      ? "bg-[#358AC1]"
                      : "bg-[#68B4E5]";
                  } else if (selectedPokemonType == "poison") {
                    abilityColor = a.is_hidden
                      ? "bg-[#7244DF]"
                      : "bg-[#A467EF]";
                  } else if (selectedPokemonType == "fighting") {
                    abilityColor = a.is_hidden
                      ? "bg-[#A12626]"
                      : "bg-[#CD2424]";
                  } else if (selectedPokemonType == "ground") {
                    abilityColor = a.is_hidden
                      ? "bg-[#BA7E3A]"
                      : "bg-[#D9985A]";
                  } else if (selectedPokemonType == "psychic") {
                    abilityColor = a.is_hidden
                      ? "bg-[#9326A1]"
                      : "bg-[#CD24CD]";
                  } else if (selectedPokemonType == "flying") {
                    abilityColor = a.is_hidden
                      ? "bg-[#2649A1]"
                      : "bg-[#2A67D7]";
                  } else if (selectedPokemonType == "rock") {
                    abilityColor = a.is_hidden
                      ? "bg-[#AA975F]"
                      : "bg-[#CDAE56]";
                  } else if (selectedPokemonType == "ghost") {
                    abilityColor = a.is_hidden
                      ? "bg-[#3126A1]"
                      : "bg-[#6A24CD]";
                  } else if (selectedPokemonType == "dragon") {
                    abilityColor = a.is_hidden
                      ? "bg-[#002AB4]"
                      : "bg-[#244ECD]";
                  } else if (selectedPokemonType == "dark") {
                    abilityColor = a.is_hidden
                      ? "bg-[#46494B]"
                      : "bg-[#7E7E7E]";
                  } else if (selectedPokemonType == "steel") {
                    abilityColor = a.is_hidden
                      ? "bg-[#6D7579]"
                      : "bg-[#9A9A9A]";
                  } else if (selectedPokemonType == "fairy") {
                    abilityColor = a.is_hidden
                      ? "bg-[#BE2D9A]"
                      : "bg-[#EC61C2]";
                  } else {
                    abilityColor = a.is_hidden
                      ? "bg-[#7E7E62]"
                      : "bg-[#A5A580]";
                  }

                  return (
                    <Tooltip>
                      <TooltipTrigger>
                        <span
                          className={` text-xl sm:text-2xl px-2 py-1 mr-2 rounded-lg shadow-md text-white ${abilityColor}`}
                        >
                          {abilityName}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {a.is_hidden ? "Hidden Ability" : "Normal Ability"}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center">
              <h3>Height:</h3>
              <span className="text-2xl ml-5">
                {pokemon?.height
                  ? (pokemon?.height / 10).toFixed(2) + " m"
                  : "Unknown"}
              </span>
            </div>
            <div className="flex items-center">
              <h3>Weight:</h3>
              <span className="text-2xl ml-4">
                {pokemon?.weight
                  ? (pokemon?.weight / 10).toFixed(2) + " kg"
                  : "Unknown"}
              </span>
            </div>
            <div>
              <h3>Description</h3>
              <p className="text-xl">{pokemon?.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="stats" className="justify-center items-center">
            <div className="stats">
              <h3>Stats</h3>
              <ul className="flex flex-col gap-4 w-100 h-78 sm:h-68 text-xl sm:text-2xl sm:w-125 mt-3">
                {pokemon?.stats.map((s) => {
                  let statName = s.stat.name
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join("-");

                  return (
                    <li
                      key={s.stat.name}
                      className="w-full flex items-center gap-4 "
                    >
                      <span className="w-2/3">{statName}</span>
                      <div className="w-full flex items-center justify-between">
                        <Progress value={s.base_stat} className="w-5/6" />
                        <span>{s.base_stat}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="evolution">
            <div>
              <h3>Evolution Chain</h3>
              <ScrollArea className="h-80 sm:h-70 lg:h-98 w-full">
                <div className="flex items-center gap-4 flex-wrap">
                  {pokemon?.evolutionChain &&
                  pokemon.evolutionChain.length > 1 ? (
                    pokemon.evolutionChain.map((evolution, index) => (
                      <div key={evolution.id} className="flex items-center">
                        <div className="bg-white/20 rounded-lg p-2 flex flex-col items-center min-w-30 h-47">
                          <img
                            src={evolution.image}
                            alt={evolution.name}
                            className="w-28 h-28 object-contain"
                          />
                          <span className="text-lg capitalize font-semibold">
                            {evolution.name}
                          </span>
                          <div className="flex gap-1">
                            {evolution.types.map((type) => (
                              <img
                                key={type.slot}
                                src={`/image/pokemon-type/${type.type.name}.png`}
                                alt={type.type.name}
                                className="w-7 h-7"
                              />
                            ))}
                          </div>
                        </div>
                        {index < (pokemon.evolutionChain?.length || 0) - 1 && (
                          <span className="mx-2 text-2xl">→</span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-lg">This Pokémon does not evolve.</p>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <button
        onClick={() => {
          setIsCardOpen(false);
          setSelectedPokemon(null);
        }}
        className="absolute top-3 right-3 lg:top-5 lg:right-5 cursor-pointer z-20"
      >
        <SquareX className="w-8 h-8 lg:w-10 lg:h-10 text-zinc-900 hover:text-red-400" />
      </button>
    </Card>
  );
}
