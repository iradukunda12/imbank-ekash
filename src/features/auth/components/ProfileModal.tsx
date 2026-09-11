import { useState } from 'react';
import Modal from '../../../shared/components/ui/Modal';
import Button from '../../../shared/components/ui/Button';
import { useAuth } from '../hooks/useAuth';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState('+250 788 000 000');

  const initials = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="My Profile"
      description="Update your personal account details."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="brand-gradient flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white">
            {initials}
          </span>
          <div>
            <p className="text-sm font-medium text-slate-700">Profile photo</p>
            <button type="button" className="text-xs font-semibold text-primary-600 hover:underline">
              Change photo
            </button>
          </div>
        </div>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-600">Full name</span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-600">Email address</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-600">Phone number</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </label>
      </div>
    </Modal>
  );
};

export default ProfileModal;
