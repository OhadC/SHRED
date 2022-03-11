import { EndpointService } from "./endpoint-service";
import { EventService } from "./event-service";
import { DomApi } from "./helpers/dom-api";
import { MusicStreamingApiFactory } from "./music-streaming-api/music-streaming-api-factory";

const musicStreamingApi = new MusicStreamingApiFactory(new DomApi()).getMusicStreamingApi();

if (musicStreamingApi) {
    const endpointsService = new EndpointService(musicStreamingApi);
    endpointsService.init();

    const eventService = new EventService(musicStreamingApi);
    eventService.init();
}
