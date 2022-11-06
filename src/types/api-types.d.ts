export type HouseSchemaRequest = {
  type: string;
  price: number;
  square_meters: number;
  storeys: number;
  available: boolean;
  address: {
    city: string;
    zip_code: string;
    street: string;
    apartment_number: number;
  };
};
export type HouseSchemaResponse = HouseSchemaRequest & { houseID: string };

export type HouseSchemaListResponse = HouseSchemaResponse[];
