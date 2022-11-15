import { Coordinates } from "./Coordinates";

export class DistanceCalculator {
  static calculate(origin: Coordinates, destination: Coordinates): number {
    if (origin.lat == destination.lat && origin.long == destination.long) return 0;
    const radlat1 = (Math.PI * origin.lat) / 180;
    const radlat2 = (Math.PI * destination.lat) / 180;
    const theta = origin.long - destination.long;
    const radtheta = (Math.PI * theta) / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; //convert miles to km
    return dist;
  } 
}