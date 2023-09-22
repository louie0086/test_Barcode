/// <reference types="dom-webcodecs" />
export declare const BARCODE_DETECTOR_FORMATS: readonly ["aztec", "code_128", "code_39", "code_93", "codabar", "data_matrix", "ean_13", "ean_8", "itf", "pdf417", "qr_code", "upc_a", "upc_e", "unknown"];
export declare function isBlob(image: ImageBitmapSourceWebCodecs): image is Blob;
export declare function getImageDataOrBlobFromImageBitmapSource(image: ImageBitmapSourceWebCodecs): Promise<ImageData | Blob | null>;
declare global {
    interface SVGImageElement {
        decode?(): Promise<void>;
    }
}
export declare function addPrefixToExceptionOrError(e: unknown, prefix: string): TypeError | DOMException;
