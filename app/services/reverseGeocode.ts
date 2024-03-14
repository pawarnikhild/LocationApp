import { resultData } from "../experiment/data";
import config from "../utils/congif"
const baseURL = 'https://api.opencagedata.com/geocode/v1/json?';


export const reverseGeocode = async (payload: {
  latitude: number;
  longitude: number;
} | undefined) => {

  let result = null;
  try {
    if (payload) {
      // const response = await fetch(`${baseURL}key=${config.apiKey}&q=${payload.latitude},+${payload.longitude}`);
      // console.log('API called');
      // const JSONResponse = await response.json();
      // if (JSONResponse) {
      //   result = JSONResponse;
      // } else {
      //   console.log('Error in getting JSONResponse');
      // }
      result = { "documentation": "https://opencagedata.com/api", "licenses": [{ "name": "see attribution guide", "url": "https://opencagedata.com/credits" }], "rate": { "limit": 2500, "remaining": 2499, "reset": 1667088000 }, "results": [{ "annotations": { "DMS": { "lat": "52\u00b0 23' 16.01880'' N", "lng": "9\u00b0 44' 0.38184'' E" }, "MGRS": "32UND4991404423", "Maidenhead": "JO42uj83ab", "Mercator": { "x": 1083521.518, "y": 6836676.75 }, "OSM": { "edit_url": "https://www.openstreetmap.org/edit?node=9041448608#map=17/52.38778/9.73344", "note_url": "https://www.openstreetmap.org/note/new#map=17/52.38778/9.73344&layers=N", "url": "https://www.openstreetmap.org/?mlat=52.38778&mlon=9.73344#map=17/52.38778/9.73344" }, "UN_M49": { "regions": { "DE": "276", "EUROPE": "150", "WESTERN_EUROPE": "155", "WORLD": "001" }, "statistical_groupings": ["MEDC"] }, "callingcode": 49, "currency": { "alternate_symbols": [], "decimal_mark": ",", "html_entity": "&#x20AC;", "iso_code": "EUR", "iso_numeric": "978", "name": "Euro", "smallest_denomination": 1, "subunit": "Cent", "subunit_to_unit": 100, "symbol": "\u20ac", "symbol_first": 0, "thousands_separator": "." }, "flag": "\ud83c\udde9\ud83c\uddea", "geohash": "u1qfj2zsvwd6ntczum3r", "qibla": 131.65, "roadinfo": { "drive_on": "right", "road": "Philipsbornstra\u00dfe", "speed_in": "km/h" }, "sun": { "rise": { "apparent": 1667023920, "astronomical": 1667017020, "civil": 1667021820, "nautical": 1667019420 }, "set": { "apparent": 1667059020, "astronomical": 1667065860, "civil": 1667061120, "nautical": 1667063520 } }, "timezone": { "name": "Europe/Berlin", "now_in_dst": 1, "offset_sec": 7200, "offset_string": "+0200", "short_name": "CEST" }, "what3words": { "words": "monopoly.tables.cats" } }, "bounds": { "northeast": { "lat": 52.387833, "lng": 9.7334894 }, "southwest": { "lat": 52.387733, "lng": 9.7333894 } }, "components": { "ISO_3166-1_alpha-2": "DE", "ISO_3166-1_alpha-3": "DEU", "ISO_3166-2": ["DE-NI"], "_category": "building", "_type": "building", "city": "Hanover", "city_district": "Vahrenwald-List", "continent": "Europe", "country": "Germany", "country_code": "de", "county": "Region Hannover", "house_number": "2", "office": "Design Offices", "political_union": "European Union", "postcode": "30165", "road": "Philipsbornstra\u00dfe", "state": "Lower Saxony", "state_code": "NI", "suburb": "Vahrenwald" }, "confidence": 10, "formatted": "Design Offices, Philipsbornstra\u00dfe 2, 30165 Hanover, Germany", "geometry": { "lat": 52.387783, "lng": 9.7334394 } }], "status": { "code": 200, "message": "OK" }, "stay_informed": { "blog": "https://blog.opencagedata.com", "twitter": "https://twitter.com/OpenCage" }, "thanks": "For using an OpenCage API", "timestamp": { "created_http": "Sat, 29 Oct 2022 07:40:51 GMT", "created_unix": 1667029251 }, "total_results": 1 };
      // console.log('payload', payload);
      // console.log('response', response)
      // console.log('stringify response', JSON.stringify(response))
      // console.log('JSONResponse', JSONResponse);
      // console.log('stringify JSONResponse', JSON.stringify(JSONResponse));
      // console.log('result in service', result);
    } else {
      console.log('Error in getting payload');
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};
