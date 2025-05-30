import _ from "lodash";
import type { PropsWithClassName } from "~/ui/models/with-class-name";
import { cn } from "~/util/tailwind/cn";
import { SongDifficulty } from "../../models/song.models";
import { useSongsViewTranslations } from "../SongsView.translations";

export function DifficultyBar({ songDifficulty, className }: PropsWithClassName & { songDifficulty: SongDifficulty }) {
    const translations = useSongsViewTranslations();

    const difficultyAsString: string = songDifficulty && translations.SongDifficulty[SongDifficulty[songDifficulty]];

    return (
        <div title={difficultyAsString} className={cn("grid grid-cols-8 gap-0.5 border border-foreground-light p-0.5", className)}>
            {_.times(songDifficulty, index => (
                <div key={index} className="w-[3px] bg-foreground-light"></div>
            ))}
        </div>
    );
}
