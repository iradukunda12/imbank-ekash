import { useState } from 'react';
import Modal from '../../../shared/components/ui/Modal';
import Button from '../../../shared/components/ui/Button';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Password"
      description="Choose a strong password you haven't used before."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
          >
            Update Password
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-600">Current password</span>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-600">New password</span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-600">Confirm new password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <span className="mt-1.5 block text-xs text-rose-500">Passwords do not match.</span>
          )}
        </label>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
