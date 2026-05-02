import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

export type TObservation = {
  speciesCode: string;  
  comName: string;      
  sciName: string;     
  locName: string;      
  obsDate: string;       
  howMany: number;      
  lat: number;
  lng: number;
};

type TApiContext = {
  observations: TObservation[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const ApiContext = createContext<TApiContext>({
  observations: [],
  loading: false,
  error: null,
  refresh: () => {},
});

const EBIRD_TOKEN = "hbesbsisfl8u";
const BASE_URL = "https://api.ebird.org/v2/data/obs";

export const ApiProvider: React.FC<{
  children: ReactNode;
  regionCode?: string;
}> = ({ children, regionCode = "US-NV" }) => {
  const [observations, setObservations] = useState<TObservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchObservations = () => {
    setLoading(true);
    setError(null);
    axios
      .get<TObservation[]>(`${BASE_URL}/${regionCode}/recent`, {
        headers: { "X-eBirdApiToken": EBIRD_TOKEN },
      })
      .then((res) => setObservations(res.data))
      .catch((err) => setError(err.message ?? "Erreur réseau"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchObservations();
  }, [regionCode]);  

  return (
    <ApiContext.Provider
      value={{ observations, loading, error, refresh: fetchObservations }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): TApiContext => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("ApiProvider manquant");
  }
  return context;
};