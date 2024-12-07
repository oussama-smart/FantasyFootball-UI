const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Pagination {
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
}

export interface PlayersResponse {
  players: Player[];
  pagination: Pagination;
};

// Fetch players with optional filters for operator, game type, slate name, and pagination
export const fetchPlayers = async (
  page = 1,
  limit = 8,
  operator: string | null = null,
  operatorGameType: string | null = null,
  slateName: string | null = null
): Promise<PlayersResponse> => {
  const query = new URLSearchParams();
  query.append('page', page.toString());
  query.append('limit', limit.toString());
  if (operator) query.append('operator', operator);
  if (operatorGameType) query.append('operatorGameType', operatorGameType);
  if (slateName) query.append('slateName', slateName);

  const response = await fetch(`${BASE_URL}/players?${query.toString()}`);
  const data = await response.json();
  return data;
};

export const fetchOperators = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/operators`);
  const data = await response.json();
  return data;
};

export const fetchOperatorGameTypes = async (
  operator: string | null = null
): Promise<string[]> => {
  const query = operator ? `?operator=${operator}` : "";
  const response = await fetch(`${BASE_URL}/operatorGameTypes${query}`);
  const data = await response.json();
  return data;
};

export const fetchSlateNames = async (
  operator: string | null = null,
  operatorGameType: string | null = null
): Promise<string[]> => {
  const query = [];
  if (operator) query.push(`operator=${operator}`);
  if (operatorGameType) query.push(`operatorGameType=${operatorGameType}`);
  const queryString = query.join("&");
  const response = await fetch(
    `${BASE_URL}/slateNames${queryString ? `?${queryString}` : ""}`
  );
  const data = await response.json();
  return data;
};
