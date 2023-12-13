import "@abraham/reflection";
import { container, inject, singleton } from "tsyringe";
import { EndpointService } from "./endpoint-service";
import { EventService } from "./event-service";
import "./music-streaming-api/music-streaming-api-factory";

@singleton()
class Api {
    constructor(
        @inject(EndpointService) private endpointService: EndpointService,
        @inject(EventService) private eventService: EventService,
    ) {
        this.endpointService.init();

        this.eventService.init();
    }
}

export const api = container.resolve(Api);
