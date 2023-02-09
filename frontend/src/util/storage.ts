const tokenKey = 'authData';

/* JSON do endpoint Auth */
type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

// Função para permitir salvar o obj LoginResponse no localStorage:
export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(str) as LoginResponse;
};

// função para remover do localStorage
export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
};
