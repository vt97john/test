import { InjectionToken } from "@angular/core";
import { RouteConfig } from "./routeConfig";

export const RouteConfigToken = new InjectionToken<RouteConfig>('RouteConfig'); //creates a token for the service