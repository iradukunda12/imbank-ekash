export interface AuthUser {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

/**
 * Stand-in for a real auth hook. Swap this for your actual auth provider
 * (context / query / session) when it's wired up — everything that reads
 * `user` from here already expects this same shape.
 */
export const useAuth = () => {
  const user: AuthUser = {
    name: 'Kevin Mugisha',
    email: 'kevin.mugisha@imbank.rw',
    role: 'Account Holder',
  };

  const logout = () => {
    // eslint-disable-next-line no-console
    console.info('logout() called — wire this up to your real auth provider.');
  };

  return { user, logout };
};

export default useAuth;
