interface BackToSignInProps {
  onClick: () => void;
}

/** Shared "leave the OTP step" link — its own component since any future
 * auth step (e.g. reset-password) that can bail back to sign-in should
 * look identical rather than each page styling its own back link. */
export const BackToSignIn = ({ onClick }: BackToSignInProps) => (
  <button
    type="button"
    onClick={onClick}
    className="block w-full text-center text-[13px] font-semibold text-brand-ink hover:underline"
  >
    ← Back to sign in
  </button>
);

export default BackToSignIn;
