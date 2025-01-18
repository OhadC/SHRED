import "@abraham/reflection";
import { container } from "tsyringe";
import "./music-streaming-api/music-streaming-api-factory";
import { Api } from "./api";

export function getApi(): Api {
    return container.resolve(Api);
}
