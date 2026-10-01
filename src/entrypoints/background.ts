import { serveFetch } from "~/background/fetch";
import { servePopupActionAvailability } from "~/background/popup-action-availability";

export default defineBackground(() => {
    servePopupActionAvailability();
    serveFetch();
});
