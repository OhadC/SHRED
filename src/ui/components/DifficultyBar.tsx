import _ from "lodash";
import { cn } from "~/ui/util/tailwind/cn";
import { useAppTranslations } from "../App.translations";
import { SongDifficulty } from "../models/models";
import type { PropsWithClassName } from "../util/models/props-with-class-name.model";

export function DifficultyBar({ songDifficulty, className }: PropsWithClassName & { songDifficulty: SongDifficulty }) {
    const translations = useAppTranslations();

    const difficultyAsString: string = songDifficulty && translations.SongDifficulty[SongDifficulty[songDifficulty]];

    return (
        <div title={difficultyAsString} className={cn("grid grid-cols-8 gap-0.5 border border-foreground-light p-0.5", className)}>
            {_.times(songDifficulty, index => (
                <div key={index} className="w-[3px] bg-foreground-light"></div>
            ))}
        </div>
    );
}
