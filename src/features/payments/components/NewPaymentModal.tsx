import { useState } from 'react';
import Modal from '../../../shared/components/ui/Modal';
import Button from '../../../shared/components/ui/Button';
import { CardIcon, WalletIcon } from '../../../shared/icons';

interface NewPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Method = 'account' | 'card';

const NewPaymentModal = ({ isOpen, onClose }: NewPaymentModalProps) => {
  const [method, setMethod] = useState<Method>('account');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Payment"
      description="Send funds to another account or settle a rebate."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onClose} disabled={!recipient || !amount}>
            Send Payment
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMethod('account')}
            className={`flex items-center gap-2 rounded-lg border px-3.5 py-3 text-sm font-medium transition-colors ${
              method === 'account'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            <WalletIcon className="h-4.5 w-4.5" />
            Bank Account
          </button>
          <button
            type="button"
            onClick={() => setMethod('card')}
            className={`flex items-center gap-2 rounded-lg border px-3.5 py-3 text-sm font-medium transition-colors ${
              method === 'card'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            <CardIcon className="h-4.5 w-4.5" />
            Card
          </button>
        </div>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-600">
            {method === 'account' ? 'Recipient account number' : 'Card number'}
          </span>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={method === 'account' ? 'e.g. 4008 2210 5591' : '•••• •••• •••• ••••'}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-600">Amount (RWF)</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-600">Note (optional)</span>
          <input
            placeholder="What's this payment for?"
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </label>
      </div>
    </Modal>
  );
};

export default NewPaymentModal;
