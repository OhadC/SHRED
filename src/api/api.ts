import { inject, singleton } from "tsyrinx";
import { EndpointService } from "./endpoint-service";
import { EventService } from "./event-service";

@singleton()
export class Api {
    public readonly endpointService = inject(EndpointService);
    public readonly eventService = inject(EventService);

    constructor() {
        this.endpointService.init();
        this.eventService.init();
    }
}
