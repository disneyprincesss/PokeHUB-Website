import { SquareX } from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Progress } from "./ui/progress";

interface EvolutionPokemon {
  id: number;
  name: string;
  image: string;
  types: { slot: number; type: { name: string } }[];
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { is_hidden: boolean; ability: { name: string } }[];
  description?: string;
  image?: string;
  evolutionChain?: EvolutionPokemon[];
}

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
          ? "from-[#111111] to-[#C9C9C9]"
          : selectedPokemonType == "fairy"
          ? "from-[#9E004C] to-[#F688B6]"
          : selectedPokemonType == "normal"
          ? "from-[#A8A878] to-[#E0E0B0]"
          : ""
      } to-62% w-6xl h-170 absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto flex flex-row`}
    >
      <div className="relative w-full">
        {selectedPokemonType != "normal" && (
          <img
            src={`/image/card-bg/${selectedPokemonType}-bg.png`}
            alt={`${selectedPokemonType} type`}
            className={`opacity-50 ${
              selectedPokemonType == "grass"
                ? "absolute bottom-20 -left-10 h-135"
                : selectedPokemonType == "fire"
                ? "absolute bottom-0 -left-15 h-160"
                : selectedPokemonType == "water"
                ? "absolute bottom-10 -left-5 h-130"
                : selectedPokemonType == "bug"
                ? "absolute bottom-15 -left-3 h-130"
                : selectedPokemonType == "electric"
                ? "absolute bottom-30 left-0 h-140"
                : selectedPokemonType == "ground"
                ? "absolute top-20 left-0 w-250 h-auto"
                : selectedPokemonType == "poison"
                ? "absolute top-0 -left-5 h-110"
                : selectedPokemonType == "fighting"
                ? "absolute top-0 left-0 h-110"
                : selectedPokemonType == "psychic"
                ? "absolute top-0 -left-5 h-115"
                : selectedPokemonType == "rock"
                ? "absolute top-10 left-0 h-120"
                : selectedPokemonType == "ghost"
                ? "absolute bottom-0 -left-10 h-160"
                : selectedPokemonType == "ice"
                ? "absolute top-10 left-0 h-110"
                : selectedPokemonType == "dragon"
                ? "absolute top-0 left-0 h-130"
                : selectedPokemonType == "flying"
                ? "absolute top-5 left-0 h-120"
                : selectedPokemonType == "dark"
                ? "absolute top-0 -left-5 h-120"
                : selectedPokemonType == "steel"
                ? "absolute -top-5 left-0 h-120"
                : selectedPokemonType == "fairy"
                ? "absolute top-15 left-0 h-100"
                : ""
            }`}
          />
        )}
        <img
          src={`${pokemon?.image ? pokemon.image : ""}`}
          alt={pokemon?.name}
          className={`h-100 absolute ${
            selectedPokemonType == "normal"
              ? "top-0 bottom-0 my-auto left-0 right-0 mx-auto"
              : "bottom-15 right-5"
          } `}
        />
      </div>
      <div
        className={`w-full pt-5 ${
          selectedPokemonType == "dark" ? "text-zinc-200" : "text-zinc-800"
        }`}
      >
        <h1 className="text-8xl font-jersey font-bold uppercase tracking-wider text-shadow-card">
          {pokemon?.name}
        </h1>

        <Tabs defaultValue="about">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="stats">Base Stats</TabsTrigger>
            <TabsTrigger value="evolution">Evolution</TabsTrigger>
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
                        className="h-10 mr-1"
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
                          className={`text-2xl px-2 py-1 mr-2 rounded-lg shadow-md text-white ${abilityColor}`}
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
          <TabsContent value="stats">
            <div className="stats">
              <h3>Stats</h3>
              <ul className="flex flex-col gap-4 text-2xl w-125 mt-3">
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
              <div className="flex items-center gap-4 flex-wrap">
                {pokemon?.evolutionChain &&
                pokemon.evolutionChain.length > 1 ? (
                  pokemon.evolutionChain.map((evolution, index) => (
                    <div key={evolution.id} className="flex items-center">
                      <div className="bg-white/20 rounded-lg p-2 flex flex-col items-center min-w-24">
                        <img
                          src={evolution.image}
                          alt={evolution.name}
                          className="w-16 h-16 object-contain"
                        />
                        <span className="text-sm capitalize font-semibold">
                          {evolution.name}
                        </span>
                        <div className="flex gap-1 mt-1">
                          {evolution.types.map((type) => (
                            <img
                              key={type.slot}
                              src={`/image/pokemon-type/${type.type.name}.png`}
                              alt={type.type.name}
                              className="w-4 h-4"
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <button
        onClick={() => {
          setIsCardOpen(false);
          setSelectedPokemon(null);
        }}
        className="absolute top-5 right-5 cursor-pointer"
      >
        <SquareX className="w-10 h-10 text-zinc-900 hover:text-red-400" />
      </button>
    </Card>
  );
}
