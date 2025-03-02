export interface ICampusLocation {
    location_id: string;
    building_name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    description: string;
    ar_marker_url: string;
  }