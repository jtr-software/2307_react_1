import { useTranslations } from 'next-intl';
import { Popup } from './Popup';

type TermsOfServiceProps = {
  onClose: () => void;
};

export function PopupTermsOfService({ onClose }: TermsOfServiceProps) {
  const t = useTranslations('TermsOfService');

  return (
    <Popup onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
      <p className="mb-4 whitespace-pre-line">{t('content')}</p>
    </Popup>
  );
}
