import { container } from "tsyrinx";
import "./music-streaming-api/music-streaming-api-factory";
import { Api } from "./api";

export function getApi(): Api {
    return container.resolve(Api);
}
