export class DomApi {
    getCurrentUrl(): string {
        return document.URL;
    }

    querySelector<T extends Element = Element>(selector: string): T | null {
        return document.querySelector<T>(selector);
    }

    querySelectorAll(selector: string): NodeListOf<Element> {
        return document.querySelectorAll(selector);
    }
}
