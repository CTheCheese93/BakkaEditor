import { DefaultElement as defaultElement } from "./DefaultElement";
import { Leaf as leaf } from "./Leaf";

import {PageLinkElement as pageLinkElement } from "./PageLinkElement";

export function DefaultElement() {
    return defaultElement;
}

export function Leaf() {
    return leaf;
}

export function PageLinkElement() {
    return pageLinkElement;
}