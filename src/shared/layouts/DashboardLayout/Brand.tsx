import vmBankLogo from '../../../assets/vm-bank-logo.png';

interface BrandProps {
  className?: string;
}

export const Brand = ({ className = 'h-8 w-auto' }: BrandProps) => (
  <img src={vmBankLogo} alt="V&M Bank" className={className} />
);

export default Brand;
