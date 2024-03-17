import { inject, singleton } from "tsyringe";
import { EndpointService } from "./endpoint-service";
import { EventService } from "./event-service";

@singleton()
export class Api {
    constructor(
        @inject(EndpointService) public readonly endpointService: EndpointService,
        @inject(EventService) public readonly eventService: EventService,
    ) {
        this.endpointService.init();

        this.eventService.init();
    }
}
