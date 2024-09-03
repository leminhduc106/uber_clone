import { LocationStore } from "@/types/type";
import { create } from "zustand";

// Create user location store
export const useLocationStore = create<LocationStore>(
  (set) =>
    ({
      userAddress: null,
      userLongtitude: null,
      userLatitude: null,
      destinationLongtitude: null,
      destinationLatitude: null,
      destinationAddress: null,

      // Setters
      setUserLocation: ({
        latitude,
        longitude,
        address,
      }: {
        latitude: number;
        longitude: number;
        address: string;
      }) => {
        set(() => ({
          userLatitude: latitude,
          userLongtitude: longitude,
          userAddress: address,
        }));
      },
      setDestinationLocation: ({
        latitude,
        longitude,
        address,
      }: {
        latitude: number;
        longitude: number;
        address: string;
      }) => {
        set(() => ({
          destinationLatitude: latitude,
          destinationLongtitude: longitude,
          destinationAddress: address,
        }));
      },
    }) as any
);
