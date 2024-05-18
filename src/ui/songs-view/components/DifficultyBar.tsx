import _ from "lodash";
import { cn } from "~/util/cn";
import { SongDifficulty } from "../../shread/models/models";
import { useSongsViewTranslations } from "../SongsView.translations";
import { songDifficultyToNumberMap } from "../helpers/song-difficulty-number";

export type DifficultyBarProperties = { songDifficulty: SongDifficulty; className?: string };

export function DifficultyBar({ songDifficulty, className }: DifficultyBarProperties) {
    const translations = useSongsViewTranslations();

    const difficultyAsNumber: number | undefined = songDifficulty && +songDifficultyToNumberMap[songDifficulty];
    const difficultyAsString: string = songDifficulty && translations.value.SongDifficulty[songDifficulty.toString()];

    return (
        <div title={difficultyAsString} className={cn("border-foreground-light grid grid-cols-8 gap-0.5 border p-0.5", className)}>
            {_.times(difficultyAsNumber, index => (
                <div key={index} className="bg-foreground-light w-[3px]"></div>
            ))}
        </div>
    );
}
