import { inject, singleton } from "tsyringe";
import { EndpointService } from "./endpoint-service";
import { EventService } from "./event-service";

@singleton()
export class Api {
    constructor(
        @inject(EndpointService) private endpointService: EndpointService,
        @inject(EventService) private eventService: EventService,
    ) {
        this.endpointService.init();

        this.eventService.init();
    }
}
