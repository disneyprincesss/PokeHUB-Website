import { SquareX } from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Progress } from "./ui/progress";

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
  chain: { species: { name: string }; evolves_to: any[] }[];
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
          : ""
      } to-62% w-6xl h-170 absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto flex flex-row`}
    >
      <div className="relative w-full">
        <img
          src={`/image/card-bg/${selectedPokemonType}-bg.png`}
          alt={`${selectedPokemonType} type`}
          className={`opacity-50 ${
            selectedPokemonType == "grass"
              ? "absolute bottom-20 -left-10 h-135"
              : selectedPokemonType == "fire"
              ? "absolute bottom-0 right-0 h-100"
              : ""
          }`}
        />
        <img
          src={`${pokemon?.image ? pokemon.image : ""}`}
          alt={pokemon?.name}
          className="h-100 absolute bottom-15 right-10 "
        />
      </div>
      <div className="w-full text-zinc-800">
        <h1 className="text-8xl font-pixelify uppercase">{pokemon?.name}</h1>

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
            <div className="flex items-center">
              <h3>Abilities:</h3>
              <div className="ml-2 flex items-center">
                {pokemon?.abilities.map((a) => {
                  let abilityName = a.ability.name
                    .split(" ")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ");

                  let abilityColor = "";

                  if (selectedPokemonType == "grass") {
                    abilityColor = a.is_hidden ? "bg-lime-600" : "bg-lime-400";
                  }

                  return (
                    <Tooltip>
                      <TooltipTrigger>
                        <span
                          className={`text-2xl px-2 py-1 mr-2 rounded-lg shadow-md ${abilityColor}`}
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
              <ul className="flex flex-col gap-4 text-2xl w-125">
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
              <div className="flex items-center gap-4">
                {pokemon?.chain?.map((stage, index) => (
                  <span key={index} className="mr-2">
                    {stage.species.name}
                  </span>
                ))}
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
